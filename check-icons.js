import fs from 'node:fs'
import https from 'node:https'

const content = fs.readFileSync('src/internal/docs/navigation.ts', 'utf-8')
const regex = /icon:\s*'([^']+)'/g
let match = regex.exec(content)
const icons = new Set()
while (match !== null) {
    icons.add(match[1])
    match = regex.exec(content)
}

const lucideIcons = Array.from(icons)
    .filter((i) => i.startsWith('lucide:'))
    .map((i) => i.replace('lucide:', ''))
const otherIcons = Array.from(icons).filter((i) => !i.startsWith('lucide:'))

console.log(`Checking ${lucideIcons.length} lucide icons...`)
const url = `https://api.iconify.design/lucide.json?icons=${lucideIcons.join(',')}`

https
    .get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
            const json = JSON.parse(data)
            const found = Object.keys(json.icons || {})
            const missing = lucideIcons.filter((i) => !found.includes(i) && !json.aliases?.[i])

            if (missing.length > 0) {
                console.log('Missing Lucide Icons:')
                console.log(missing)
            } else {
                console.log('All Lucide icons found!')
            }

            if (otherIcons.length > 0) {
                console.log('Other icons to verify manually:', otherIcons)
            }
        })
    })
    .on('error', (err) => {
        console.log('Error: ', err.message)
    })
