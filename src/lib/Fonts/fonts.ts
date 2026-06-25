import type {
    FontDefinition,
    GoogleFontDefinition,
    GoogleFontDisplay,
    GoogleFontStyle,
    LocalFontDefinition,
    LocalFontSource,
    FontsConfig,
    FontsOptions
} from './fonts.types.js'

const defaultSansFallback =
    "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const defaultMonoFallback =
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace"

export const defaultFontFamilies: FontDefinition[] = [
    {
        name: 'Inter',
        variable: '--font-sans-family',
        weights: [400, 500, 600, 700]
    },
    {
        name: 'Inter',
        variable: '--font-heading-family',
        weights: [400, 500, 600, 700]
    },
    {
        name: 'JetBrains Mono',
        variable: '--font-mono-family',
        weights: [400, 500, 700]
    }
]

export const fontsDefaults = {
    families: defaultFontFamilies,
    display: 'swap' as GoogleFontDisplay,
    preconnect: true
}

function isLocalFont(font: FontDefinition): font is LocalFontDefinition {
    return font.provider === 'local'
}

function normalizeFontName(name: string): string {
    return name.trim().replace(/\s+/g, ' ')
}

function getFontWeights(weights?: number[]): number[] {
    const normalized = (weights ?? [400]).filter(
        (weight, index, source) =>
            Number.isInteger(weight) &&
            weight >= 100 &&
            weight <= 900 &&
            source.indexOf(weight) === index
    )

    return normalized.length > 0 ? [...normalized].sort((a, b) => a - b) : [400]
}

function getFontStyles(styles?: GoogleFontStyle[]): GoogleFontStyle[] {
    const normalized = (styles ?? ['normal']).filter(
        (style, index, source) =>
            (style === 'normal' || style === 'italic') && source.indexOf(style) === index
    )

    if (normalized.length === 0) return ['normal']
    if (normalized.includes('normal') && normalized.includes('italic')) {
        return ['normal', 'italic']
    }

    return normalized[0] === 'italic' ? ['italic'] : ['normal']
}

function encodeFamilyName(name: string): string {
    return normalizeFontName(name).replaceAll(' ', '+')
}

function escapeFontName(name: string): string {
    return name.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
}

function getDefaultFallback(variable?: `--${string}`): string {
    return variable?.includes('mono') ? defaultMonoFallback : defaultSansFallback
}

function buildFamilyQuery(font: GoogleFontDefinition): string {
    const name = encodeFamilyName(font.name)
    const weights = getFontWeights(font.weights)
    const styles = getFontStyles(font.styles)

    if (styles.length === 1 && styles[0] === 'normal') {
        return `${name}:wght@${weights.join(';')}`
    }

    const pairs = styles.flatMap((style) =>
        weights.map((weight) => `${style === 'italic' ? 1 : 0},${weight}`)
    )

    return `${name}:ital,wght@${pairs.join(';')}`
}

export function buildGoogleFontsUrl(
    fonts: FontDefinition[],
    display: GoogleFontDisplay = 'swap'
): string {
    const families = fonts
        .filter((font): font is GoogleFontDefinition => !isLocalFont(font))
        .map((font) => buildFamilyQuery(font))
        .filter((family, index, source) => family.length > 0 && source.indexOf(family) === index)

    if (families.length === 0) return ''

    const familyParams = families
        .map((f) => `family=${encodeURIComponent(f).replaceAll('%2B', '+')}`)
        .join('&')
    return `https://fonts.googleapis.com/css2?${familyParams}&display=${display}`
}

export function buildFontFamily(font: FontDefinition): string {
    const family = `'${escapeFontName(normalizeFontName(font.name))}'`
    return `${family}, ${font.fallback ?? getDefaultFallback(font.variable)}`
}

function buildLocalFontSourceReference(source: LocalFontSource): string {
    const url = `url('${source.src.replaceAll("'", "\\'")}')`
    return source.format ? `${url} format('${source.format}')` : url
}

export function buildLocalFontFaceCss(
    fonts: FontDefinition[],
    defaultDisplay: GoogleFontDisplay = 'swap'
): string {
    const declarations = fonts.filter(isLocalFont).flatMap((font) =>
        font.sources.map((source) => {
            const lines = [
                '@font-face {',
                `    font-family: '${escapeFontName(normalizeFontName(font.name))}';`,
                `    src: ${buildLocalFontSourceReference(source)};`,
                `    font-display: ${font.display ?? defaultDisplay};`,
                `    font-style: ${source.style ?? 'normal'};`,
                `    font-weight: ${source.weight ?? 400};`
            ]

            if (source.unicodeRange) {
                lines.push(`    unicode-range: ${source.unicodeRange};`)
            }

            lines.push('}')
            return lines.join('\n')
        })
    )

    return declarations.join('\n\n')
}

export function buildFontVariablesCss(fonts: FontDefinition[]): string {
    const declarations = fonts
        .filter((font) => typeof font.variable === 'string' && font.variable.length > 2)
        .map((font) => `    ${font.variable}: ${buildFontFamily(font)};`)

    if (declarations.length === 0) return ''

    return `:root {\n${declarations.join('\n')}\n}`
}

export function resolveFontsOptions(config?: FontsConfig): FontsOptions | false {
    if (config === false) return false

    if (config === true) {
        return fontsDefaults
    }

    if (config && typeof config === 'object') {
        return {
            families: config.families ?? fontsDefaults.families,
            display: config.display ?? fontsDefaults.display,
            preconnect: config.preconnect ?? fontsDefaults.preconnect
        }
    }

    return fontsDefaults
}
