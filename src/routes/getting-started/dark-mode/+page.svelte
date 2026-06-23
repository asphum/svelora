<script lang="ts">
    import { Card, Link, ThemeModeButton } from '$lib/index.js'

    const layoutCode = `<script lang="ts">
 import './layout.css';
 import { ModeWatcher } from 'svelora';

 let { children } = $props();
<` + `/script>

<ModeWatcher />
{@render children()}`

    const layoutCssCode = `@import 'tailwindcss';
@import 'svelora/theme.css';

/* Required for Tailwind CSS 4 dark mode classes */
@custom-variant dark (&:where(.dark, .dark *));`

    const toggleCode = `<script lang="ts">
 import { ThemeModeButton } from 'svelora';
<` + `/script>

<ThemeModeButton />
<ThemeModeButton size="sm" variant="outline" />
<ThemeModeButton size="lg" variant="soft" color="primary" />
<ThemeModeButton lightIcon="lucide:sun-medium" darkIcon="lucide:moon-star" />`

    const programmaticCode = `<script lang="ts">
 import { mode, setMode, toggleMode } from 'svelora';
<` + `/script>

<p>Current: {mode.current}</p>

<button onclick={() => setMode('dark')}>Dark</button>
<button onclick={() => setMode('light')}>Light</button>
<button onclick={toggleMode}>Toggle</button>`

    const stylingCode = `<!-- Tailwind dark: variant -->
<div class="bg-white dark:bg-gray-900">
 <p class="text-gray-900 dark:text-white">
  This text adapts to the theme.
 </p>
</div>

<!-- Svelora semantic colors -->
<div class="bg-surface text-on-surface">
 <p class="text-on-surface/60">
  Semantic colors handle dark mode for you.
 </p>
</div>`
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li><Link href="/docs" raw class="hover:text-primary">Getting Started</Link></li>
                <li>/</li>
                <li>Dark Mode</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Getting Started
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Dark Mode</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                Svelora includes built-in dark mode support. All components automatically adapt to the current theme.
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Setup</h2>
        <p class="text-on-surface-variant">
            Two things are needed: the `ModeWatcher` component in your layout, and the `@custom-variant` CSS rule.
        </p>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/+layout.svelte`</p>
            <pre class="overflow-x-auto text-sm"><code>{layoutCode}</code></pre>
        </Card>
        <Card class="border border-outline-variant/70">
            <p class="mb-3 text-sm text-on-surface-variant">`src/routes/layout.css`</p>
            <pre class="overflow-x-auto text-sm"><code>{layoutCssCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Toggle Button</h2>
        <p class="text-on-surface-variant">
            Use `ThemeModeButton` for a ready-to-use theme switcher with animated icons.
        </p>
        <div class="flex flex-wrap items-center gap-3">
            <ThemeModeButton />
            <ThemeModeButton size="sm" variant="outline" />
            <ThemeModeButton size="lg" variant="soft" color="primary" />
            <ThemeModeButton lightIcon="lucide:sun-medium" darkIcon="lucide:moon-star" />
        </div>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{toggleCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Programmatic Control</h2>
        <p class="text-on-surface-variant">
            Use `mode`, `setMode`, and `toggleMode` to control the theme manually.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{programmaticCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Styling with Dark Mode</h2>
        <p class="text-on-surface-variant">
            You can use Tailwind's `dark:` variant, but Svelora semantic colors usually remove the need for it.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{stylingCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Why Semantic Colors?</h2>
        <div class="overflow-hidden rounded-2xl border border-outline-variant">
            <table class="w-full text-left text-sm">
                <thead class="bg-surface-container text-on-surface">
                    <tr>
                        <th class="px-4 py-3 font-medium">Approach</th>
                        <th class="px-4 py-3 font-medium">Code</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant">
                    <tr>
                        <td class="px-4 py-3">Manual (verbose)</td>
                        <td class="px-4 py-3 font-mono text-xs">bg-white dark:bg-gray-900 text-gray-900 dark:text-white</td>
                    </tr>
                    <tr>
                        <td class="px-4 py-3">Semantic (automatic)</td>
                        <td class="px-4 py-3 font-mono text-xs">bg-surface text-on-surface</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</div>
