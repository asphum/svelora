<script lang="ts">
    import type { Component } from 'svelte'
    import { mount, tick, unmount } from 'svelte'
    import { CodeBlock, Link } from '$lib/index.js'
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
    let isDarkMode = $state(true)

    const mountedCodeBlocks = new Map<Element, ReturnType<typeof mount>>()

    function clearInjectedCodeBlocks(root: HTMLElement): void {
        root.querySelectorAll('[data-doc-code]').forEach((node) => {
            const instance = mountedCodeBlocks.get(node)
            if (instance) {
                unmount(instance)
                mountedCodeBlocks.delete(node)
            }
            node.remove()
        })
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

            const host = document.createElement('div')
            host.setAttribute('data-doc-code', 'true')
            section.appendChild(host)

            const instance = mount(CodeBlock, {
                target: host,
                props: {
                    title: 'Code',
                    code,
                    copyText: code,
                    html: highlightedHtml
                }
            })
            mountedCodeBlocks.set(host, instance)
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
            <CodeBlock code={exampleCode} html={quickExampleHtml} />
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
