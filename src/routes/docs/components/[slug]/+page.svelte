<script lang="ts">
    import type { Component } from 'svelte'
    import { tick } from 'svelte'
    import { Link } from '$lib/index.js'
    import { allComponentItems } from '$lib/docs/navigation.js'
    import { getSectionSnippets, renderHighlightedCode } from '$lib/docs/code-block.js'

    type PageModule = {
        default: Component
    }

    const modules = import.meta.glob('../../../*/+page.svelte', {
        eager: true
    }) as Record<string, PageModule>

    const sourceModules = import.meta.glob('../../../*/+page.svelte', {
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

    const componentMeta = $derived(allComponentItems.find((item) => item.href.endsWith(`/${data.slug}`)))
    const resolvedPage = $derived(docsPages.get(data.slug))
    const pageSource = $derived(pageSources.get(data.slug) ?? '')

    const componentExamples: Record<string, string> = {
        button: `<script lang="ts">
 import { Button } from 'svelora';
<` + `/script>

<Button label="Click me" color="primary" />`,
        input: `<script lang="ts">
 import { Input } from 'svelora';
<` + `/script>

<Input placeholder="Enter text..." />`,
        select: `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
 ];
<` + `/script>

<Select {items} placeholder="Choose a fruit" />`,
        'select-menu': `<script lang="ts">
 import { SelectMenu } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
 ];
<` + `/script>

<SelectMenu {items} placeholder="Select a fruit..." />`,
        textarea: `<script lang="ts">
 import { Textarea } from 'svelora';
<` + `/script>

<Textarea rows={4} placeholder="Write something..." />`,
        checkbox: `<script lang="ts">
 import { Checkbox } from 'svelora';
<` + `/script>

<Checkbox label="Accept terms" />`,
        'radio-group': `<script lang="ts">
 import { RadioGroup } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
 ];

 let value = $state('apple');
<` + `/script>

<RadioGroup {items} bind:value />`,
        switch: `<script lang="ts">
 import { Switch } from 'svelora';
<` + `/script>

<Switch label="Enable notifications" />`,
        modal: `<script lang="ts">
 import { Button, Modal } from 'svelora';

 let open = $state(false);
<` + `/script>

<Button label="Open modal" onclick={() => (open = true)} />
<Modal bind:open title="Confirm action" />`,
        table: `<script lang="ts">
 import { Table } from 'svelora';

 const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'Editor' }
 ];
<` + `/script>

<Table {data} />`,
        toast: `<script lang="ts">
 import { Button, Toaster, toast } from 'svelora';
<` + `/script>

<Button label="Show toast" onclick={() => toast.success('Saved successfully')} />
<Toaster />`,
        'theme-mode-button': `<script lang="ts">
 import { ThemeModeButton } from 'svelora';
<` + `/script>

<ThemeModeButton />`,
        editor: `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state('<p>Hello Svelora</p>');
<` + `/script>

<Editor bind:value />`
    }

    function getDefaultComponentExample(componentName: string): string {
        return `<script lang="ts">
 import { ${componentName} } from 'svelora';
<` + `/script>

<${componentName} />`
    }

    const exampleCode = $derived.by(() => {
        const componentName = componentMeta?.title ?? 'Component'
        return componentExamples[data.slug] ?? getDefaultComponentExample(componentName)
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
                <h2 class="text-xl font-semibold">{componentMeta?.title ?? 'Component'} Usage</h2>
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
        <h1 class="text-3xl font-semibold">Component not found</h1>
        <p class="text-on-surface-variant">
            The requested component page does not exist.
        </p>
        <Link href="/docs/components" raw class="text-primary hover:underline">
            Back to all components
        </Link>
    </div>
{/if}
