<script lang="ts">
    import type { Component } from 'svelte'
    import { mount, tick, unmount } from 'svelte'
    import { CodeBlock, Link } from '$lib/index.js'
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
        'code-block': `<script lang="ts">
 import { CodeBlock } from 'svelora';
<` + `/script>

<CodeBlock
 title="Code"
 code={\`type User = { _id: string; name: string }\n\nconst user: User = { _id: 'u_1', name: 'Jane' }\`}
/>`,
        fonts: `<script lang="ts">
 import { Fonts } from 'svelora';
<` + `/script>

<Fonts
 families={[
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] },
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
  }
 ]}
/>`,
        'google-fonts': `<script lang="ts">
 import { Fonts } from 'svelora';
<` + `/script>

<Fonts
 families={[
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] },
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
  }
 ]}
/>`,
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
                <h2 class="text-xl font-semibold">{componentMeta?.title ?? 'Component'} Usage</h2>
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
        <h1 class="text-3xl font-semibold">Component not found</h1>
        <p class="text-on-surface-variant">
            The requested component page does not exist.
        </p>
        <Link href="/docs/components" raw class="text-primary hover:underline">
            Back to all components
        </Link>
    </div>
{/if}
