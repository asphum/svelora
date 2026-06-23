import { describe, expect, it, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import LocaleButton from './LocaleButton.svelte'
import type { LocaleButtonLocale } from './locale-button.types.js'

const locales: LocaleButtonLocale[] = [
    { code: 'en', label: 'English', shortLabel: 'EN' },
    { code: 'th', label: 'Thai', shortLabel: 'TH' },
    { code: 'ja', label: 'Japanese', shortLabel: 'JA' }
]

describe('LocaleButton', () => {
    describe('rendering', () => {
        it('should render the current locale on the trigger', async () => {
            render(LocaleButton, {
                locales,
                locale: 'th',
                portal: false
            })

            await expect.element(page.getByRole('button', { name: 'Change language' })).toBeVisible()
            await expect.element(page.getByText('TH')).toBeInTheDocument()
        })

        it('should use placeholder when current locale is missing', async () => {
            render(LocaleButton, {
                locales,
                locale: 'vi',
                placeholder: 'Pick locale',
                portal: false
            })

            await expect.element(page.getByText('EN')).toBeInTheDocument()
        })
    })

    describe('menu', () => {
        it('should open and render all locales', async () => {
            render(LocaleButton, {
                locales,
                locale: 'en',
                portal: false
            })

            await page.getByRole('button', { name: 'Change language' }).click()

            await vi.waitFor(() => {
                const items = document.querySelectorAll('[role="menuitemradio"]')
                expect(items.length).toBe(3)
            })
        })

        it('should disable the current locale by default', async () => {
            render(LocaleButton, {
                locales,
                locale: 'en',
                open: true,
                portal: false
            })

            await expect
                .element(page.getByRole('menuitemradio', { name: /English/i }))
                .toBeDisabled()
        })

        it('should call onLocaleChange when selecting a locale item', async () => {
            const onLocaleChange = vi.fn()

            render(LocaleButton, {
                locales,
                locale: 'en',
                onLocaleChange,
                open: true,
                portal: false
            })

            await page.getByRole('menuitemradio', { name: /Japanese/i }).click()

            expect(onLocaleChange).toHaveBeenCalledOnce()
            expect(onLocaleChange).toHaveBeenCalledWith('ja', locales[2])
        })

        it('should resolve href and hreflang for locale links', async () => {
            render(LocaleButton, {
                locales,
                locale: 'en',
                open: true,
                portal: false,
                disableCurrentLocale: false,
                getLocaleHref: (locale) => `/docs?lang=${locale}`
            })

            await vi.waitFor(() => {
                const thaiLink = document.querySelector(
                    'a[href="/docs?lang=th"]'
                ) as HTMLAnchorElement | null

                expect(thaiLink).not.toBeNull()
                expect(thaiLink?.getAttribute('hreflang')).toBe('th')
            })
        })
    })
})
