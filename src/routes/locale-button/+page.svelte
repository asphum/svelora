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
    const integrationStrategies = [
        {
            title: 'Callback Strategy',
            badge: 'Recommended',
            description:
                'Use onLocaleChange when your app controls locale changes in code. This works well with Paraglide cookie-based setups and custom i18n stores.',
            bullets: [
                'Keeps the current pathname unchanged',
                'Works with setLocale(..., { reload: false })',
                'Best default for consumer apps'
            ]
        },
        {
            title: 'Href Strategy',
            badge: 'Optional',
            description:
                'Use getLocaleHref when your app intentionally exposes locale-specific URLs such as /th/docs or /en/docs.',
            bullets: [
                'Generates per-locale links',
                'Useful for URL-prefix routing',
                'Navigation happens through hrefs instead of imperative state'
            ]
        },
        {
            title: 'Custom I18n',
            badge: 'Flexible',
            description:
                'You can use LocaleButton without Paraglide at all. Pass your own locale state, persistence, and translation runtime.',
            bullets: [
                'No hard dependency on Paraglide',
                'Works with stores, cookies, or API-backed preferences',
                'Good for non-SvelteKit or mixed stacks'
            ]
        }
    ] as const

    const localeItemFields = [
        {
            field: 'code',
            required: 'Yes',
            description: 'The locale identifier used by your i18n layer, such as en or th.'
        },
        {
            field: 'label',
            required: 'Yes',
            description: 'The full label rendered in the dropdown menu.'
        },
        {
            field: 'shortLabel',
            required: 'No',
            description: 'Compact text for the trigger or badge, such as EN or TH.'
        },
        {
            field: 'description',
            required: 'No',
            description: 'Secondary helper text shown inside the menu.'
        },
        {
            field: 'href',
            required: 'No',
            description: 'A precomputed locale-specific link if your app uses href navigation.'
        },
        {
            field: 'hreflang',
            required: 'No',
            description: 'Optional hreflang value forwarded to anchor items.'
        },
        {
            field: 'disabled',
            required: 'No',
            description: 'Disables a specific locale item.'
        }
    ] as const

    const integrationChecklist = [
        'Use onLocaleChange when you do not want locale prefixes in the URL.',
        'Use getLocaleHref only when your routing strategy intentionally includes locale-specific paths.',
        'Pass locale from your own source of truth so the trigger always reflects the current language.',
        'Provide shortLabel values when you want compact trigger text such as EN, TH, or JA.',
        'Use the children snippet when your product needs a fully custom trigger design.'
    ] as const

    let locale = $state('en')
    let customLocale = $state('th')

    const paraglideSetLocaleExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'svelora'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<` +
        `/script>

<LocaleButton
 {locale}
 {locales}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target)
  }
 }}
/>`

    const paraglideCookieExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'svelora'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<` +
        `/script>

<LocaleButton
 {locale}
 {locales}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target, { reload: false })
  }
 }}
/>`

    const consumerAppExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'svelora'
 import { setLocale, toLocale } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
<` +
        `/script>

<LocaleButton
 {locales}
 {locale}
 onLocaleChange={(nextLocale) => {
  locale = nextLocale
  const target = toLocale(nextLocale)
  if (target) {
   return setLocale(target, { reload: false })
  }
 }}
/>`

    const hrefStrategyExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'svelora'
 import { localizeHref } from '$lib/paraglide/runtime'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
 const pathname = '/docs/components/locale-button'
<` +
        `/script>

<LocaleButton
 {locales}
 {locale}
 getLocaleHref={(nextLocale) => localizeHref(pathname, { locale: nextLocale })}
/>`

    const customI18nExample =
        `<script lang="ts">
 import { LocaleButton, type LocaleButtonLocale } from 'svelora'
 
 const locales: LocaleButtonLocale[] = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
 
 let locale = 'en'
 
 function applyLocale(nextLocale: string) {
   locale = nextLocale
   localStorage.setItem('preferred-locale', nextLocale)
 }
<` +
        `/script>

<LocaleButton
 {locales}
 {locale}
 onLocaleChange={(nextLocale) => {
  applyLocale(nextLocale)
 }}
/>`

    const localeShapeExample = `import type { LocaleButtonLocale } from 'svelora'

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
    description: 'Thai translation',
    href: '/th/docs',
    hreflang: 'th'
  }
]`
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

    <section class="space-y-4">
        <h2 class="text-lg font-semibold">Choose Your Strategy</h2>
        <p class="text-sm text-on-surface-variant">
            <code class="rounded bg-surface-container-highest px-1">LocaleButton</code> is only
            the UI layer. Your app decides how locale changes are applied.
        </p>
        <div class="grid gap-4 lg:grid-cols-3">
            {#each integrationStrategies as strategy (strategy.title)}
                <div class="space-y-3 rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
                    <div class="flex items-center justify-between gap-3">
                        <h3 class="text-base font-semibold">{strategy.title}</h3>
                        <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            {strategy.badge}
                        </span>
                    </div>
                    <p class="text-sm text-on-surface-variant">{strategy.description}</p>
                    <ul class="space-y-2 text-sm text-on-surface-variant">
                        {#each strategy.bullets as bullet (bullet)}
                            <li>{bullet}</li>
                        {/each}
                    </ul>
                </div>
            {/each}
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
        <h2 class="text-lg font-semibold">Use Locale Prefix URLs</h2>
        <p class="text-sm text-on-surface-variant">
            If your product intentionally uses locale-prefixed routes such as
            <code class="rounded bg-surface-container-highest px-1">/th/docs</code>, provide
            <code class="rounded bg-surface-container-highest px-1">getLocaleHref</code>. This
            keeps navigation declarative and lets the button render locale-specific links.
        </p>
        <CodeBlock title="Href strategy with localizeHref()" code={hrefStrategyExample} />
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Use Without Paraglide</h2>
        <p class="text-sm text-on-surface-variant">
            The component works with any locale source of truth. You can connect it to a Svelte
            store, cookies, localStorage, an API-backed user preference, or another i18n runtime.
        </p>
        <CodeBlock title="Custom i18n integration" code={customI18nExample} />
    </section>

    <section class="space-y-4">
        <h2 class="text-lg font-semibold">Locale Item Shape</h2>
        <p class="text-sm text-on-surface-variant">
            Each locale entry is just data. Start with
            <code class="rounded bg-surface-container-highest px-1">code</code> and
            <code class="rounded bg-surface-container-highest px-1">label</code>, then add
            optional fields only when your app needs them.
        </p>
        <CodeBlock title="LocaleButtonLocale[]" code={localeShapeExample} />
        <div class="overflow-hidden rounded-2xl border border-outline-variant">
            <table class="w-full text-left text-sm">
                <thead class="bg-surface-container">
                    <tr>
                        <th class="px-4 py-3 font-semibold">Field</th>
                        <th class="px-4 py-3 font-semibold">Required</th>
                        <th class="px-4 py-3 font-semibold">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    {#each localeItemFields as field (field.field)}
                        <tr class="border-t border-outline-variant/70">
                            <td class="px-4 py-3 font-mono text-xs">{field.field}</td>
                            <td class="px-4 py-3 text-on-surface-variant">{field.required}</td>
                            <td class="px-4 py-3 text-on-surface-variant">{field.description}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-lg font-semibold">Integration Checklist</h2>
        <div class="rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
            <ul class="space-y-3 text-sm text-on-surface-variant">
                {#each integrationChecklist as item (item)}
                    <li>{item}</li>
                {/each}
            </ul>
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
