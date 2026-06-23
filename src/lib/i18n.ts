import { localizeHref, locales, type Locale } from '$lib/paraglide/runtime.js'
import type { LocaleButtonLocale } from '$lib/LocaleButton/index.js'

const localeMeta: Record<Locale, Pick<LocaleButtonLocale, 'label' | 'shortLabel'>> = {
    en: {
        label: 'English',
        shortLabel: 'EN'
    },
    th: {
        label: 'Thai',
        shortLabel: 'TH'
    }
}

export function buildLocaleOptions(href: string): LocaleButtonLocale[] {
    const normalizedHref = href || '/'

    return locales.map((locale) => ({
        code: locale,
        label: localeMeta[locale].label,
        shortLabel: localeMeta[locale].shortLabel,
        href: localizeHref(normalizedHref, { locale }),
        hreflang: locale
    }))
}
