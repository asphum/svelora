<script lang="ts">
    import { CodeBlock, LocaleButton } from '$lib/index.js'
    import type { LocaleButtonLocale } from '$lib/index.js'

    const locales: LocaleButtonLocale[] = [
        {
            code: 'en',
            label: 'English',
            shortLabel: 'EN',
            description: 'Default content language'
        },
        {
            code: 'th',
            label: 'Thai',
            shortLabel: 'TH',
            description: 'Thai translation'
        },
        {
            code: 'ja',
            label: 'Japanese',
            shortLabel: 'JA',
            description: 'Japanese translation'
        }
    ]

    const variants = ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    let locale = $state('en')
    let customLocale = $state('th')

    const paraglideSetLocaleExample = `<script lang="ts">
 import { LocaleButton } from 'svelora'
 import { setLocale } from '$lib/paraglide/runtime'
 
 const locales = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
<\/script>

<LocaleButton
 locale="en"
 {locales}
 onLocaleChange={(nextLocale) => setLocale(nextLocale)}
/>`

    const paraglideCookieExample = `<script lang="ts">
 import { LocaleButton } from 'svelora'
 import { setLocale } from '$lib/paraglide/runtime'
 
 const locales = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
<\/script>

<LocaleButton
 locale="en"
 {locales}
 onLocaleChange={(nextLocale) => setLocale(nextLocale, { reload: false })}
/>`

    const consumerAppExample = `<script lang="ts">
 import { LocaleButton } from 'svelora'
 import { setLocale } from '$lib/paraglide/runtime'
 
 const locales = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<\/script>

<LocaleButton
 {locales}
 {locale}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  return setLocale(nextLocale, { reload: false })
 }}
/>`
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">LocaleButton</h1>
        <p class="text-on-surface-variant">
            A language switcher button designed to work nicely with Paraglide. Use
            <code class="rounded bg-surface-container-highest px-1">onLocaleChange</code> for
            <code class="rounded bg-surface-container-highest px-1">setLocale()</code> flows
            while keeping the current path unchanged.
        </p>
    </div>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Basic Usage</h2>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
            <span class="text-sm text-on-surface-variant">Current locale: {locale}</span>
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Paraglide with setLocale</h2>
        <p class="text-sm text-on-surface-variant">
            Use the selection callback when your app already manages locale changes in code.
        </p>
        <CodeBlock title="Paraglide setLocale()" code={paraglideSetLocaleExample} />
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Use In Consumer Apps</h2>
        <p class="text-sm text-on-surface-variant">
            <code class="rounded bg-surface-container-highest px-1">LocaleButton</code> is
            exported from the
            <code class="rounded bg-surface-container-highest px-1">svelora</code> package and can
            be used in any app that installs this library.
        </p>
        <p class="text-sm text-on-surface-variant">
            The component does not depend on Paraglide internally. Your app provides
            <code class="rounded bg-surface-container-highest px-1">locale</code>,
            <code class="rounded bg-surface-container-highest px-1">locales</code>, and the
            locale-change logic through
            <code class="rounded bg-surface-container-highest px-1">onLocaleChange</code> or
            <code class="rounded bg-surface-container-highest px-1">getLocaleHref</code>.
        </p>
        <CodeBlock title="Consumer app example" code={consumerAppExample} />
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Keep The Same Path</h2>
        <p class="text-sm text-on-surface-variant">
            With cookie-based Paraglide strategy, you can switch locale without adding
            <code class="rounded bg-surface-container-highest px-1">/th</code> or other locale
            prefixes to the URL.
        </p>
        <CodeBlock title="Paraglide without locale prefix" code={paraglideCookieExample} />
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                {locale}
                disableCurrentLocale={false}
                onLocaleChange={(nextLocale) => {
                    locale = nextLocale
                }}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Variants</h2>
        <div class="flex flex-wrap items-center gap-3 rounded-lg bg-surface-container-high p-4">
            {#each variants as variant (variant)}
                <LocaleButton
                    {locales}
                    {locale}
                    {variant}
                    size="sm"
                    onLocaleChange={(nextLocale) => {
                        locale = nextLocale
                    }}
                />
            {/each}
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Sizes</h2>
        <div class="flex flex-wrap items-end gap-3 rounded-lg bg-surface-container-high p-4">
            {#each sizes as size (size)}
                <LocaleButton
                    {locales}
                    {locale}
                    {size}
                    onLocaleChange={(nextLocale) => {
                        locale = nextLocale
                    }}
                />
            {/each}
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Custom Trigger</h2>
        <p class="text-sm text-on-surface-variant">
            Use the
            <code class="rounded bg-surface-container-highest px-1">children</code> snippet to
            fully control the trigger content while keeping the dropdown behavior.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <LocaleButton
                {locales}
                locale={customLocale}
                square={false}
                variant="soft"
                color="primary"
                onLocaleChange={(nextLocale) => {
                    customLocale = nextLocale
                }}
            >
                {#snippet children({ currentLocale, open })}
                    <span class="flex items-center gap-2">
                        <span>{currentLocale?.label ?? 'Language'}</span>
                        <span class="text-xs text-on-surface-variant">
                            {open ? 'Open' : currentLocale?.code.toUpperCase()}
                        </span>
                    </span>
                {/snippet}
            </LocaleButton>
        </div>
    </section>
</div>
