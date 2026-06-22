import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const changelogPath = resolve(process.cwd(), 'CHANGELOG.md')
const unreleasedBlockPattern = /## \[Unreleased\]\n[\s\S]*?(?=\n## \[)/
const templateSections = ['Added', 'Changed', 'Fixed']
const emptyMarker = '- _None yet._'

function stripTemplateMarkers(content) {
    return content
        .split('\n')
        .filter((line) => line.trim() !== emptyMarker)
        .join('\n')
        .trim()
}

function getUnreleasedBody(changelog) {
    if (!changelog.includes('## [Unreleased]')) {
        throw new Error('CHANGELOG.md must contain an [Unreleased] section')
    }

    const match = changelog.match(/## \[Unreleased\]\n([\s\S]*?)(?=\n## \[)/)

    if (!match) {
        throw new Error('Could not parse the [Unreleased] section in CHANGELOG.md')
    }

    return match[1].trim()
}

function parseSections(unreleasedBody) {
    const lines = unreleasedBody.split('\n')
    const sections = []
    let currentName = null
    let currentLines = []

    function pushSection() {
        if (!currentName) {
            return
        }

        sections.push({
            content: stripTemplateMarkers(currentLines.join('\n')),
            name: currentName
        })
    }

    for (const line of lines) {
        if (line.startsWith('### ')) {
            pushSection()
            currentName = line.slice(4).trim()
            currentLines = []
            continue
        }

        if (currentName) {
            currentLines.push(line)
        }
    }

    pushSection()
    return sections
}

function buildSection(name, content) {
    const resolvedContent = content && content.length > 0 ? content : emptyMarker
    return `### ${name}\n\n${resolvedContent}`
}

function buildTemplate(existingSections) {
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

    return `## [Unreleased]\n\n${orderedSections.map((section) => buildSection(section.name, section.content)).join('\n\n')}`
}

function main() {
    const changelog = readFileSync(changelogPath, 'utf8')
    const unreleasedBody = getUnreleasedBody(changelog)
    const sections = parseSections(unreleasedBody)
    const nextChangelog = changelog.replace(unreleasedBlockPattern, buildTemplate(sections))

    writeFileSync(changelogPath, nextChangelog)
    console.log('Updated CHANGELOG.md unreleased template')
}

main()
