import type { StandardSchemaV1 } from '@standard-schema/spec'

export type UrlSchema = StandardSchemaV1<string, string>

export function createUrlSchema(
    validateFn: (input: unknown) => { issues: readonly StandardSchemaV1.Issue[] } | { value: string }
): UrlSchema {
    return {
        '~standard': {
            version: 1,
            vendor: 'svelora',
            validate: validateFn,
        }
    }
}

export const httpUrlSchema: UrlSchema = createUrlSchema((input) => {
    if (typeof input !== 'string') {
        return { issues: [{ message: 'Expected a string' }] }
    }
    const trimmed = input.trim()
    if (!trimmed) {
        return { issues: [{ message: 'URL is required' }] }
    }
    try {
        new URL(trimmed)
    } catch {
        return { issues: [{ message: 'Please enter a valid URL' }] }
    }
    if (!/^https?:\/\//i.test(trimmed)) {
        return { issues: [{ message: 'URL must start with http:// or https://' }] }
    }
    return { value: trimmed }
})

function normalizeUrl(src: string): string {
    const s = src.replace(/[\t\n\r]/g, '')
    let start = 0
    let end = s.length
    while (start < end && s.charCodeAt(start) <= 0x20) start++
    while (end > start && s.charCodeAt(end - 1) <= 0x20) end--
    return s.slice(start, end)
}

export function isSafeImageSrc(src: string): boolean {
    const s = normalizeUrl(src)
    if (!s) return false
    const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(s)?.[1]?.toLowerCase()
    if (!scheme) return true
    if (scheme === 'http' || scheme === 'https') return true
    if (scheme === 'data') {
        return /^data:image\/(?:png|jpe?g|gif|webp|avif|bmp|x-icon|vnd\.microsoft\.icon)[;,]/i.test(
            s
        )
    }
    return false
}

export const youtubeUrlSchema: UrlSchema = createUrlSchema((input) => {
    if (typeof input !== 'string') {
        return { issues: [{ message: 'Expected a string' }] }
    }
    const trimmed = input.trim()
    if (!trimmed) {
        return { issues: [{ message: 'URL is required' }] }
    }
    try {
        new URL(trimmed)
    } catch {
        return { issues: [{ message: 'Please enter a valid URL' }] }
    }
    if (!/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)\//i.test(trimmed)) {
        return { issues: [{ message: 'Must be a YouTube URL (youtube.com or youtu.be)' }] }
    }
    return { value: trimmed }
})
