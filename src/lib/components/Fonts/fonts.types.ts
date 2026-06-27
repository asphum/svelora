export type GoogleFontStyle = 'normal' | 'italic'

export type GoogleFontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional'

export type FontProvider = 'google' | 'local'

export type GoogleFontDefinition = {
    provider?: 'google'
    name: string
    weights?: number[]
    styles?: GoogleFontStyle[]
    variable?: `--${string}`
    fallback?: string
}

export type LocalFontSourceFormat =
    | 'woff2'
    | 'woff'
    | 'truetype'
    | 'opentype'
    | 'embedded-opentype'
    | 'svg'

export type LocalFontSource = {
    src: string
    format?: LocalFontSourceFormat
    weight?: number | `${number} ${number}`
    style?: GoogleFontStyle
    unicodeRange?: string
}

export type LocalFontDefinition = {
    provider: 'local'
    name: string
    sources: LocalFontSource[]
    variable?: `--${string}`
    fallback?: string
    display?: GoogleFontDisplay
}

export type FontDefinition = GoogleFontDefinition | LocalFontDefinition

export type FontsOptions = {
    families?: FontDefinition[]
    display?: GoogleFontDisplay
    preconnect?: boolean
}

export type FontsConfig = boolean | FontsOptions

export type FontsProps = {
    fonts?: FontDefinition[]
    families?: FontDefinition[]
    display?: GoogleFontDisplay
    preconnect?: boolean
}
