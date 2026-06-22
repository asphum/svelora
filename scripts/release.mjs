import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const packageJsonPath = resolve(process.cwd(), 'package.json')
const changelogPath = resolve(process.cwd(), 'CHANGELOG.md')
const packageJsonRelativePath = 'package.json'
const unreleasedBlockPattern = /## \[Unreleased\]\n[\s\S]*?(?=\n## \[)/
const templateSections = ['Added', 'Changed', 'Fixed']
const emptyMarker = '- _None yet._'
const defaultAutoWorkCommitMessage = 'chore: prepare public release'

function run(command, args) {
    execFileSync(command, args, { cwd: process.cwd(), stdio: 'inherit' })
}

function runCapture(command, args) {
    return execFileSync(command, args, {
        cwd: process.cwd(),
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe']
    }).trim()
}

function tryRunCapture(command, args) {
    try {
        return runCapture(command, args)
    } catch {
        return undefined
    }
}

function isObject(value) {
    return typeof value === 'object' && value !== null
}

function readPackageJson() {
    const raw = readFileSync(packageJsonPath, 'utf8')
    const parsed = JSON.parse(raw)

    if (
        !isObject(parsed) ||
        typeof parsed.name !== 'string' ||
        typeof parsed.version !== 'string'
    ) {
        throw new Error('Invalid package.json: expected string name and version')
    }

    return {
        name: parsed.name,
        version: parsed.version
    }
}

function updatePackageVersion(version) {
    const raw = readFileSync(packageJsonPath, 'utf8')
    const parsed = JSON.parse(raw)

    if (!isObject(parsed)) {
        throw new Error('Invalid package.json: expected object')
    }

    parsed.version = version
    writeFileSync(packageJsonPath, `${JSON.stringify(parsed, null, 4)}\n`)
}

function bumpVersion(version, releaseType) {
    const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version)

    if (!match) {
        throw new Error(`Unsupported version format: ${version}`)
    }

    const major = Number.parseInt(match[1], 10)
    const minor = Number.parseInt(match[2], 10)
    const patch = Number.parseInt(match[3], 10)

    if (releaseType === 'major') {
        return `${major + 1}.0.0`
    }

    if (releaseType === 'minor') {
        return `${major}.${minor + 1}.0`
    }

    return `${major}.${minor}.${patch + 1}`
}

function versionExists(packageName, version) {
    try {
        const publishedVersion = runCapture('npm', ['view', `${packageName}@${version}`, 'version'])
        return publishedVersion === version
    } catch {
        return false
    }
}

function getCurrentBranch() {
    const branch = runCapture('git', ['branch', '--show-current'])

    if (branch.length === 0) {
        throw new Error('Release must run from a git branch')
    }

    return branch
}

function getGitStatusLines() {
    const status = runCapture('git', ['status', '--porcelain'])

    if (status.length === 0) {
        return []
    }

    return status.split('\n').filter((line) => line.trim().length > 0)
}

function getTodayDate() {
    return new Date().toISOString().slice(0, 10)
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getRepositoryCompareBase() {
    const { repository } = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

    if (!isObject(repository) || typeof repository.url !== 'string') {
        throw new Error('package.json repository.url is required for changelog link generation')
    }

    return repository.url.replace(/^git\+/, '').replace(/\.git$/, '')
}

function readChangelog() {
    return readFileSync(changelogPath, 'utf8')
}

function buildSectionMarkdown(name, content) {
    const resolvedContent = content && content.length > 0 ? content : emptyMarker
    return `### ${name}\n\n${resolvedContent}`
}

function buildUnreleasedTemplate(existingSections = []) {
    const sectionMap = new Map(existingSections.map((section) => [section.name, section.content]))
    const orderedSections = templateSections.map((name) => ({
        content: sectionMap.get(name) ?? '',
        name
    }))

    for (const section of existingSections) {
        if (!templateSections.includes(section.name)) {
            orderedSections.push(section)
        }
    }

    return `## [Unreleased]\n\n${orderedSections.map((section) => buildSectionMarkdown(section.name, section.content)).join('\n\n')}`
}

function getLatestReleasedVersion(changelog) {
    const match = changelog.match(/^## \[(\d+\.\d+\.\d+)\] - /m)

    if (!match) {
        throw new Error('Could not determine the latest released version from CHANGELOG.md')
    }

    return match[1]
}

function buildReleaseSection(version, sections) {
    return `## [${version}] - ${getTodayDate()}\n\n${sections.map((section) => buildSectionMarkdown(section.name, section.content)).join('\n\n')}`
}

function ensureUnreleasedSectionExists(changelog) {
    if (!changelog.includes('## [Unreleased]')) {
        throw new Error('CHANGELOG.md must contain an [Unreleased] section')
    }
}

function getTagRef(version) {
    return tryRunCapture('git', ['rev-parse', '--verify', `refs/tags/v${version}`])
}

function getChangelogReleaseCommit(version) {
    return tryRunCapture('git', [
        'log',
        '--format=%H',
        '-n',
        '1',
        '-S',
        `## [${version}] - `,
        '--',
        'CHANGELOG.md'
    ])
}

function getPackageVersionCommit(version) {
    return tryRunCapture('git', [
        'log',
        '--format=%H',
        '-n',
        '1',
        '-S',
        `"version": "${version}"`,
        '--',
        packageJsonRelativePath
    ])
}

function getPublishedVersionTimestamp(packageName, version) {
    const rawTimeMetadata = tryRunCapture('npm', ['view', packageName, 'time', '--json'])

    if (!rawTimeMetadata) {
        return undefined
    }

    const parsed = JSON.parse(rawTimeMetadata)

    if (!isObject(parsed)) {
        return undefined
    }

    const publishedAt = parsed[version]

    return typeof publishedAt === 'string' ? publishedAt : undefined
}

function resolveReleaseBase(currentVersion, packageName) {
    const tagRef = getTagRef(currentVersion)

    if (tagRef) {
        return {
            description: `v${currentVersion} tag`,
            kind: 'ref',
            value: tagRef
        }
    }

    const publishedAt = getPublishedVersionTimestamp(packageName, currentVersion)

    if (publishedAt) {
        return {
            description: `${publishedAt} (npm publish time for ${currentVersion})`,
            kind: 'since',
            value: publishedAt
        }
    }

    const changelogCommit = getChangelogReleaseCommit(currentVersion)

    if (changelogCommit) {
        return {
            description: `${changelogCommit.slice(0, 7)} (CHANGELOG release commit)`,
            kind: 'ref',
            value: changelogCommit
        }
    }

    const packageVersionCommit = getPackageVersionCommit(currentVersion)

    if (packageVersionCommit) {
        return {
            description: `${packageVersionCommit.slice(0, 7)} (package.json version commit)`,
            kind: 'ref',
            value: packageVersionCommit
        }
    }

    return undefined
}

function normalizeCommitSummary(summary) {
    return summary.replace(/\s+/g, ' ').trim()
}

function parseCommitMessage(commitMessage) {
    const conventionalCommitMatch =
        /^(?<type>[a-z]+)(?:\((?<scope>[^)]+)\))?(?<breaking>!)?:\s*(?<description>.+)$/i.exec(
            commitMessage
        )

    if (!conventionalCommitMatch?.groups) {
        return {
            description: normalizeCommitSummary(commitMessage),
            isBreaking: false,
            scope: undefined,
            type: undefined
        }
    }

    return {
        description: normalizeCommitSummary(conventionalCommitMatch.groups.description),
        isBreaking: conventionalCommitMatch.groups.breaking === '!',
        scope: conventionalCommitMatch.groups.scope,
        type: conventionalCommitMatch.groups.type.toLowerCase()
    }
}

function getSectionNameFromCommit(commit) {
    const lowerCaseBody = commit.body.toLowerCase()
    const type = commit.parsed.type
    const hasFixKeyword =
        type === 'fix' ||
        /(^|\b)(fix|bug|hotfix|patch|repair|resolve|correct)(\b|$)/i.test(commit.summary) ||
        /(แก้|แก้ไข|ซ่อม)/.test(commit.summary)
    const hasAddKeyword =
        type === 'feat' ||
        /(^|\b)(add|added|introduce|new|support|create)(\b|$)/i.test(commit.summary) ||
        /(เพิ่ม|รองรับ|สร้าง)/.test(commit.summary)
    const hasBreakingChange = commit.parsed.isBreaking || lowerCaseBody.includes('breaking change')

    if (hasBreakingChange) {
        return 'Changed'
    }

    if (hasFixKeyword) {
        return 'Fixed'
    }

    if (hasAddKeyword) {
        return 'Added'
    }

    return 'Changed'
}

function formatCommitAsBullet(commit) {
    const scopePrefix = commit.parsed.scope ? `**${commit.parsed.scope}** — ` : ''
    const breakingPrefix =
        commit.parsed.isBreaking || commit.body.toLowerCase().includes('breaking change')
            ? '**BREAKING** '
            : ''
    return `- ${scopePrefix}${breakingPrefix}${commit.parsed.description}`
}

function createPendingCommit(commitMessage) {
    const normalizedSummary = normalizeCommitSummary(commitMessage)

    return {
        body: '',
        hash: 'WORKTREE',
        parsed: parseCommitMessage(normalizedSummary),
        summary: normalizedSummary
    }
}

function getUnreleasedCommits(packageName, currentVersion, pendingCommitMessage) {
    const releaseBase = resolveReleaseBase(currentVersion, packageName)
    const gitLogArgs = ['log', '--reverse', '--format=%H%x1f%s%x1f%b%x1e']

    if (releaseBase?.kind === 'ref') {
        gitLogArgs.push(`${releaseBase.value}..HEAD`)
    }

    if (releaseBase?.kind === 'since') {
        gitLogArgs.push(`--since=${releaseBase.value}`)
    }

    const rawLog = runCapture('git', gitLogArgs)
    const commits = rawLog
        .split('\x1e')
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0)
        .map((entry) => {
            const [hash = '', summary = '', body = ''] = entry.split('\x1f')
            const normalizedSummary = normalizeCommitSummary(summary)

            return {
                body: body.trim(),
                hash,
                parsed: parseCommitMessage(normalizedSummary),
                summary: normalizedSummary
            }
        })
        .filter((commit) => commit.summary.length > 0)
        .filter((commit) => !/^chore\(release\): publish v/i.test(commit.summary))

    if (pendingCommitMessage) {
        commits.push(createPendingCommit(pendingCommitMessage))
    }

    if (commits.length === 0) {
        throw new Error('No unreleased commits found to generate CHANGELOG.md entries')
    }

    return commits
}

function getGeneratedReleaseSections(packageName, currentVersion, pendingCommitMessage) {
    const sections = new Map(templateSections.map((sectionName) => [sectionName, []]))

    for (const commit of getUnreleasedCommits(packageName, currentVersion, pendingCommitMessage)) {
        const sectionName = getSectionNameFromCommit(commit)
        const entries = sections.get(sectionName)

        if (!entries) {
            continue
        }

        entries.push(formatCommitAsBullet(commit))
    }

    const filledSections = Array.from(sections.entries())
        .filter(([, entries]) => entries.length > 0)
        .map(([name, entries]) => ({
            content: entries.join('\n'),
            name
        }))

    if (filledSections.length === 0) {
        throw new Error('No releasable changelog entries could be generated from git commits')
    }

    return filledSections
}

function updateChangelogForRelease(currentVersion, nextVersion, releaseSections) {
    const changelog = readChangelog()
    ensureUnreleasedSectionExists(changelog)

    const nextChangelog = changelog.replace(
        unreleasedBlockPattern,
        `${buildUnreleasedTemplate()}\n\n${buildReleaseSection(nextVersion, releaseSections)}\n`
    )
    const compareBase = getRepositoryCompareBase()
    const withUpdatedUnreleasedLink = nextChangelog.replace(
        /^\[Unreleased\]: .*$/m,
        `[Unreleased]: ${compareBase}/compare/v${nextVersion}...HEAD`
    )
    const currentVersionLinkMatch = withUpdatedUnreleasedLink.match(
        new RegExp(`^\\[${escapeRegExp(currentVersion)}\\]: .*$`, 'm')
    )

    if (!currentVersionLinkMatch) {
        throw new Error(`Could not find changelog link entry for version ${currentVersion}`)
    }

    const nextVersionLink = `[${nextVersion}]: ${compareBase}/compare/v${currentVersion}...v${nextVersion}`

    writeFileSync(
        changelogPath,
        withUpdatedUnreleasedLink.replace(
            currentVersionLinkMatch[0],
            `${nextVersionLink}\n${currentVersionLinkMatch[0]}`
        )
    )
}

function parseArgs(argv) {
    const [firstArg, ...restArgs] = argv
    const publicMode = firstArg === 'public'
    const publicReleaseType = publicMode && ['patch', 'minor', 'major'].includes(restArgs[0] ?? '')
        ? restArgs[0]
        : 'patch'
    const releaseType = ['patch', 'minor', 'major'].includes(firstArg)
        ? firstArg
        : publicReleaseType
    const remainingArgs =
        publicMode
            ? publicReleaseType === 'patch'
                ? restArgs
                : restArgs.slice(1)
            : firstArg === releaseType
              ? restArgs
              : argv

    let dryRun = false
    let verifyScript = 'release:verify'
    const commitMessageParts = []

    for (const arg of remainingArgs) {
        if (arg === '--dry-run') {
            dryRun = true
            continue
        }

        if (arg === '--full') {
            verifyScript = 'release:verify:full'
            continue
        }

        commitMessageParts.push(arg)
    }

    const workCommitMessage = commitMessageParts.join(' ').trim()

    return {
        dryRun,
        publicMode,
        releaseType,
        workCommitMessage: workCommitMessage.length > 0 ? workCommitMessage : undefined,
        verifyScript
    }
}

function main() {
    const options = parseArgs(process.argv.slice(2))
    const { name, version: currentVersion } = readPackageJson()
    const nextVersion = bumpVersion(currentVersion, options.releaseType)
    const branch = getCurrentBranch()
    const latestReleasedVersion = getLatestReleasedVersion(readChangelog())
    const releaseBase = resolveReleaseBase(currentVersion, name)
    const hasUncommittedChanges = getGitStatusLines().length > 0

    if (branch !== 'main') {
        throw new Error(`Release must run on main branch, current branch is ${branch}`)
    }

    if (latestReleasedVersion !== currentVersion) {
        throw new Error(
            `package.json version (${currentVersion}) must match the latest released CHANGELOG.md version (${latestReleasedVersion}) before release`
        )
    }

    if (versionExists(name, nextVersion)) {
        throw new Error(`Version ${nextVersion} is already published on npm`)
    }

    const resolvedWorkCommitMessage =
        hasUncommittedChanges
            ? (options.workCommitMessage ??
              (options.publicMode ? defaultAutoWorkCommitMessage : undefined))
            : undefined

    if (hasUncommittedChanges && !resolvedWorkCommitMessage) {
        throw new Error(
            'Uncommitted changes detected. Provide a work commit message, for example: bun run release:patch -- "feat: add new component"'
        )
    }

    const previewSections = getGeneratedReleaseSections(
        name,
        currentVersion,
        resolvedWorkCommitMessage
    )

    if (options.dryRun) {
        const releaseCommitMessage = `chore(release): publish v${nextVersion}`

        console.log(`Dry run release for ${name}`)
        console.log(`Current version: ${currentVersion}`)
        console.log(`Next version: ${nextVersion}`)
        console.log(`Verify script: bun run ${options.verifyScript}`)
        console.log(`Worktree changes: ${hasUncommittedChanges ? 'yes' : 'no'}`)
        if (hasUncommittedChanges && resolvedWorkCommitMessage) {
            console.log(`Work commit message: ${resolvedWorkCommitMessage}`)
        }
        console.log(`Release commit message: ${releaseCommitMessage}`)
        console.log(
            `CHANGELOG.md sections: ${previewSections.map((section) => section.name).join(', ')}`
        )
        console.log(`Commit source: ${releaseBase?.description ?? 'repository start..HEAD'}`)
        console.log(
            `CHANGELOG.md release section: will create ## [${nextVersion}] - ${getTodayDate()}`
        )
        console.log('Commands:')
        console.log(`- bun run ${options.verifyScript}`)
        if (hasUncommittedChanges && resolvedWorkCommitMessage) {
            console.log('- git add -A')
            console.log(`- git commit -m "${resolvedWorkCommitMessage}"`)
        }
        console.log('- git add -A')
        console.log(`- git commit -m "${releaseCommitMessage}"`)
        console.log('- npm publish --access public')
        console.log(`- git tag -a v${nextVersion} -m "v${nextVersion}"`)
        console.log(`- git push origin ${branch}`)
        console.log(`- git push origin v${nextVersion}`)
        return
    }

    run('npm', ['whoami'])
    run('bun', ['run', options.verifyScript])

    if (hasUncommittedChanges && resolvedWorkCommitMessage) {
        run('git', ['add', '-A'])
        run('git', ['commit', '-m', resolvedWorkCommitMessage])
    }

    const releaseSections = getGeneratedReleaseSections(name, currentVersion)
    updatePackageVersion(nextVersion)
    updateChangelogForRelease(currentVersion, nextVersion, releaseSections)
    run('git', ['add', '-A'])

    const releaseCommitMessage = `chore(release): publish v${nextVersion}`

    run('git', ['commit', '-m', releaseCommitMessage])
    run('npm', ['publish', '--access', 'public'])
    run('git', ['tag', '-a', `v${nextVersion}`, '-m', `v${nextVersion}`])
    run('git', ['push', 'origin', branch])
    run('git', ['push', 'origin', `v${nextVersion}`])

    console.log(`Published ${name}@${nextVersion}`)
}

main()
