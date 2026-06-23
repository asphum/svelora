<script lang="ts">
    import type { Component } from 'svelte'
    import { tick } from 'svelte'
    import { Link } from '$lib/index.js'
    import { docsHookItems } from '$lib/docs/navigation.js'
    import { getSectionSnippets, renderHighlightedCode } from '$lib/docs/code-block.js'

    type PageModule = {
        default: Component
    }

    const modules = import.meta.glob('../../../use*/+page.svelte', {
        eager: true
    }) as Record<string, PageModule>

    const sourceModules = import.meta.glob('../../../use-*/+page.svelte', {
        eager: true,
        query: '?raw',
        import: 'default'
    }) as Record<string, string>

    const docsPages = new Map<string, Component>(
        Object.entries(modules)
            .map(([path, module]) => [path.split('/').at(-2) ?? '', module.default] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const pageSources = new Map<string, string>(
        Object.entries(sourceModules)
            .map(([path, source]) => [path.split('/').at(-2) ?? '', source] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const { data } = $props<{
        data: {
            slug: string
        }
    }>()

    const hookMeta = $derived(docsHookItems.find((item) => item.href.endsWith(`/${data.slug}`)))
    const resolvedPage = $derived(docsPages.get(data.slug))
    const pageSource = $derived(pageSources.get(data.slug) ?? '')

    const hookExamples: Record<string, string> = {
        'use-clipboard': `<script lang="ts">
 import { useClipboard } from 'svelora';

 const clipboard = useClipboard();
<` + `/script>

<button onclick={() => clipboard.copy('Hello Svelora!')}>
 {clipboard.copied ? 'Copied!' : 'Copy'}
</button>`,
        'use-debounce': `<script lang="ts">
 import { useDebounce } from 'svelora';

 let value = $state('');
 const debounced = useDebounce(() => value, 300);
<` + `/script>

<input bind:value placeholder="Type to debounce..." />
<p>{debounced()}</p>`,
        'use-form-field': `<script lang="ts">
 import { FormField, Input, useFormField } from 'svelora';
<` + `/script>

<FormField label="Email" name="email">
 <Input placeholder="you@example.com" />
</FormField>

<!-- Inside a child component -->
const formField = useFormField();`,
        'use-media-query': `<script lang="ts">
 import { useMediaQuery } from 'svelora';

 const isDesktop = useMediaQuery('(min-width: 1024px)');
<` + `/script>

<p>{isDesktop.current ? 'Desktop' : 'Mobile'}</p>`,
        'use-click-outside': `<script lang="ts">
 import { useClickOutside } from 'svelora';

 let open = $state(true);
 const container = useClickOutside(() => (open = false));
<` + `/script>

<div use:container>Click outside me</div>`,
        'use-infinite-scroll': `<script lang="ts">
 import { useInfiniteScroll } from 'svelora';

 const loadMore = () => {
  console.log('load more');
 };
<` + `/script>

<div use:useInfiniteScroll={{ onLoadMore: loadMore }}>
 Scroll to load more
</div>`,
        'use-escape-keydown': `<script lang="ts">
 import { useEscapeKeydown } from 'svelora';

 useEscapeKeydown(() => {
  console.log('escape pressed');
 });
<` + `/script>`,
    }

    function getDefaultHookExample(hookName: string): string {
        return `<script lang="ts">
 import { ${hookName} } from 'svelora';
<` + `/script>

const value = ${hookName}();`
    }

    const exampleCode = $derived.by(() => {
        const hookName = hookMeta?.title ?? 'useHook'
        return hookExamples[data.slug] ?? getDefaultHookExample(hookName)
    })

    let containerEl = $state<HTMLElement | null>(null)
    let quickExampleHtml = $state('')
    let quickExampleCopyLabel = $state('Copy')
    let isDarkMode = $state(true)

    function scheduleLabelReset(reset: () => void): void {
        window.setTimeout(() => {
            reset()
        }, 1200)
    }

    async function copyWithFeedback(
        code: string,
        setLabel: (label: string) => void,
        resetLabel = 'Copy'
    ): Promise<void> {
        try {
            await navigator.clipboard.writeText(code)
            setLabel('Copied')
        } catch {
            setLabel('Failed')
        }

        scheduleLabelReset(() => {
            setLabel(resetLabel)
        })
    }

    function clearInjectedCodeBlocks(root: HTMLElement): void {
        root.querySelectorAll('[data-doc-code]').forEach((node) => node.remove())
    }

    async function injectCodeBlocks(root: HTMLElement, source: string, darkMode: boolean): Promise<void> {
        clearInjectedCodeBlocks(root)

        const snippets = getSectionSnippets(source, data.slug)
        const sections = Array.from(root.querySelectorAll('section'))
        const highlightedSnippets = await Promise.all(
            snippets.map((entry) => renderHighlightedCode(entry.snippet, darkMode))
        )

        sections.forEach((section, index) => {
            if (section.querySelector('pre, .shiki')) return

            const code = snippets[index]?.snippet
            const highlightedHtml = highlightedSnippets[index]
            if (!code || !highlightedHtml) return

            const wrapper = document.createElement('div')
            wrapper.setAttribute('data-doc-code', 'true')
            wrapper.className =
                'mt-4 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container'

            const header = document.createElement('div')
            header.className =
                'flex items-center justify-between border-b border-outline-variant px-4 py-3'

            const label = document.createElement('p')
            label.className = 'text-sm font-medium text-on-surface-variant'
            label.textContent = 'Code'

            const button = document.createElement('button')
            button.type = 'button'
            button.className =
                'rounded-md border border-outline-variant px-2.5 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest'
            button.textContent = 'Copy'
            button.addEventListener('click', () => {
                void copyWithFeedback(code, (label) => {
                    button.textContent = label
                })
            })

            const pre = document.createElement('pre')
            pre.className = 'contents'

            header.appendChild(label)
            header.appendChild(button)
            pre.innerHTML = highlightedHtml
            wrapper.appendChild(header)
            wrapper.appendChild(pre)

            section.appendChild(wrapper)
        })
    }

    $effect(() => {
        const root = containerEl
        const source = pageSource
        const darkMode = isDarkMode

        if (!root || !source) return

        let cancelled = false

        void tick().then(() => {
            if (cancelled) return
            void injectCodeBlocks(root, source, darkMode)
        })

        return () => {
            cancelled = true
            clearInjectedCodeBlocks(root)
        }
    })

    $effect(() => {
        const code = exampleCode
        const darkMode = isDarkMode
        let cancelled = false

        void renderHighlightedCode(code, darkMode).then((html) => {
            if (cancelled) return
            quickExampleHtml = html
        })

        return () => {
            cancelled = true
        }
    })

    $effect(() => {
        if (typeof document === 'undefined') return

        const root = document.documentElement
        const updateMode = () => {
            isDarkMode = root.classList.contains('dark')
        }

        updateMode()

        const observer = new MutationObserver(() => {
            updateMode()
        })

        observer.observe(root, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => {
            observer.disconnect()
        }
    })
</script>

{#if resolvedPage}
    {@const ResolvedPage = resolvedPage}
    <div class="space-y-8">
        <section class="space-y-3 rounded-2xl border border-outline-variant bg-surface-container/40 p-5">
            <div class="space-y-1">
                <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                    Quick Example
                </p>
                <h2 class="text-xl font-semibold">{hookMeta?.title ?? 'Hook'} Usage</h2>
                <p class="text-sm text-on-surface-variant">
                    ตัวอย่าง import และการใช้งานแบบสั้นสำหรับหน้า `{data.slug}`
                </p>
            </div>
            <div
                class="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container"
            >
                <div
                    class="flex items-center justify-between border-b border-outline-variant px-4 py-3"
                >
                    <p class="text-sm font-medium text-on-surface-variant">Code</p>
                    <button
                        type="button"
                        class="rounded-md border border-outline-variant px-2.5 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                        onclick={async () => {
                            await copyWithFeedback(exampleCode, (label) => {
                                quickExampleCopyLabel = label
                            })
                        }}
                    >
                        {quickExampleCopyLabel}
                    </button>
                </div>
                <div class="bg-surface-container-highest [&_.shiki]:rounded-none">
                    {@html quickExampleHtml}
                </div>
            </div>
        </section>

        <div bind:this={containerEl}>
            <ResolvedPage />
        </div>
    </div>
{:else}
    <div class="space-y-4">
        <h1 class="text-3xl font-semibold">Hook not found</h1>
        <p class="text-on-surface-variant">
            The requested hook page does not exist.
        </p>
        <Link href="/docs/hooks" raw class="text-primary hover:underline">
            Back to all hooks
        </Link>
    </div>
{/if}
