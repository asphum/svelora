import fs from 'node:fs/promises'
import path from 'node:path'

const srcDir = path.resolve(process.cwd(), 'src/routes')

async function main() {
    console.log('Searching for +page.svelte files in', srcDir)

    const glob = new Bun.Glob('**/+page.svelte')
    const files = Array.from(glob.scanSync({ cwd: srcDir, absolute: true }))

    console.log(`Found ${files.length} files.`)

    let totalModifications = 0

    for (const file of files) {
        let content = await fs.readFile(file, 'utf-8')
        let modified = false

        const h2Regex = /<h2([^>]*)>(.*?)<\/h2>/gs

        content = content.replace(h2Regex, (match, attributes, innerText) => {
            // Extract the real text if it's already an anchor
            let cleanText = innerText
            if (cleanText.includes('<a href=')) {
                const spanMatch = cleanText.match(/([\s\S]*?)<span/)
                if (spanMatch) {
                    cleanText = spanMatch[1].replace(/<[^>]+>/g, '').trim()
                } else {
                    cleanText = cleanText.replace(/<[^>]+>/g, '').trim()
                }

                // if the text was grabbed after the span (because # was on left),
                // the regex might have missed it. Better yet, just strip HTML and remove the lone `#`
                // Actually, let's just use a safer regex for existing format:
                cleanText = innerText
                    .replace(/<[^>]+>/g, '')
                    .trim()
                    .replace(/^#\s*/, '')
                    .replace(/\s*#$/, '')
                    .trim()
            }

            // Extract ID
            const idMatch = attributes.match(/id="([^"]+)"/)
            let generatedId = ''
            let newAttributes = attributes

            if (idMatch) {
                generatedId = idMatch[1]
            } else {
                generatedId = cleanText.replace(/\s+/g, '-').replace(/[^\w-]/g, '')
                if (generatedId) {
                    newAttributes = ` id="${generatedId}"${attributes}`
                }
            }

            if (generatedId) {
                modified = true
                totalModifications++

                const newInner = `
                    <a href="#${generatedId}" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        ${cleanText}
                    </a>
                `.trim()

                return `<h2${newAttributes}>\n${newInner}\n</h2>`
            }
            return match
        })

        if (modified) {
            await fs.writeFile(file, content, 'utf-8')
            console.log(`Modified: ${path.relative(srcDir, file)}`)
        }
    }

    console.log(`\nFinished! Added ${totalModifications} anchor IDs.`)
}

main().catch(console.error)
