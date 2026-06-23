import { describe, expect, it } from 'vitest'
import {
    buildFontFamily,
    buildFontVariablesCss,
    buildGoogleFontsUrl,
    buildLocalFontFaceCss,
    defaultFontFamilies,
    fontsDefaults,
    resolveFontsOptions
} from './fonts.js'
import type { FontDefinition, GoogleFontDefinition } from './fonts.types.js'

describe('fonts provider', () => {
    it('should build a Google Fonts URL for normal weights', () => {
        const fonts: GoogleFontDefinition[] = [
            {
                name: 'Inter',
                weights: [700, 400, 500],
                variable: '--font-sans-family'
            }
        ]

        expect(buildGoogleFontsUrl(fonts)).toBe(
            'https://fonts.googleapis.com/css2?family=Inter%3Awght%40400%3B500%3B700&display=swap'
        )
    })

    it('should build a Google Fonts URL with italic pairs', () => {
        const fonts: GoogleFontDefinition[] = [
            {
                name: 'Inter',
                weights: [400, 700],
                styles: ['normal', 'italic']
            }
        ]

        expect(buildGoogleFontsUrl(fonts)).toBe(
            'https://fonts.googleapis.com/css2?family=Inter%3Aital%2Cwght%400%2C400%3B0%2C700%3B1%2C400%3B1%2C700&display=swap'
        )
    })

    it('should build font family with sensible fallback', () => {
        expect(
            buildFontFamily({
                name: 'JetBrains Mono',
                variable: '--font-mono-family'
            })
        ).toContain('ui-monospace')
    })

    it('should build CSS variables only for fonts that define a variable', () => {
        const fonts: GoogleFontDefinition[] = [
            {
                name: 'Inter',
                variable: '--font-sans-family',
                weights: [400, 500, 600, 700]
            },
            {
                name: 'Poppins',
                variable: '--font-heading-family',
                weights: [600, 700]
            },
            {
                name: 'Merriweather'
            }
        ]

        expect(buildFontVariablesCss(fonts)).toBe(`:root {
    --font-sans-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-heading-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}`)
    })

    it('should support custom project variable names such as sarabun', () => {
        const fonts: GoogleFontDefinition[] = [
            {
                name: 'Sarabun',
                variable: '--font-sarabun-family',
                weights: [400, 500, 700]
            }
        ]

        expect(buildFontVariablesCss(fonts)).toBe(`:root {
    --font-sarabun-family: 'Sarabun', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}`)
    })

    it('should build local @font-face rules', () => {
        const fonts: FontDefinition[] = [
            {
                provider: 'local',
                name: 'Sarabun',
                variable: '--font-sarabun-family',
                sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
            }
        ]

        expect(buildLocalFontFaceCss(fonts)).toBe(`@font-face {
    font-family: 'Sarabun';
    src: url('/fonts/Sarabun-Regular.woff2') format('woff2');
    font-display: swap;
    font-style: normal;
    font-weight: 400;
}`)
    })

    it('should resolve top-level fonts config and keep defaults when enabled', () => {
        expect(resolveFontsOptions(true)).toEqual(fontsDefaults)
        const resolved = resolveFontsOptions(undefined)
        expect(resolved === false ? [] : resolved.families).toEqual(defaultFontFamilies)
    })

    it('should allow disabling global defaults with fonts=false', () => {
        expect(resolveFontsOptions(false)).toBe(false)
    })

    it('should support the new top-level fonts config shape', () => {
        const resolved = resolveFontsOptions({
            families: [{ name: 'Sarabun', variable: '--font-sarabun-family', weights: [400, 700] }],
            preconnect: false
        })

        expect(resolved).toEqual({
            families: [{ name: 'Sarabun', variable: '--font-sarabun-family', weights: [400, 700] }],
            display: 'swap',
            preconnect: false
        })
    })
})
