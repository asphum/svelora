<script lang="ts" module>
    import type { CodeBlockProps } from './code-block.types.js'

    export type Props = CodeBlockProps
</script>

<script lang="ts">
    import { getComponentConfig } from '../../config.js'
    import { codeBlockDefaults, codeBlockVariants } from './code-block.variants.js'

    const config = getComponentConfig('codeBlock', codeBlockDefaults)

    let {
        title = 'Code',
        code = '',
        copyText,
        copyable = true,
        html,
        variant = config.defaultVariants.variant,
        size = config.defaultVariants.size,
        class: className,
        ui,
        children
    }: Props = $props()

    let copyLabel = $state('Copy')

    const resolvedCopyText = $derived((copyText ?? code).trim())
    const canCopy = $derived(copyable && resolvedCopyText.length > 0)

    const classes = $derived.by(() => {
        const slots = codeBlockVariants({ variant, size })
        return {
            root: slots.root({ class: [config.slots.root, className, ui?.root] }),
            header: slots.header({ class: [config.slots.header, ui?.header] }),
            title: slots.title({ class: [config.slots.title, ui?.title] }),
            button: slots.button({ class: [config.slots.button, ui?.button] }),
            body: slots.body({ class: [config.slots.body, ui?.body] })
        }
    })

    function scheduleLabelReset(resetLabel: string): void {
        window.setTimeout(() => {
            copyLabel = resetLabel
        }, 1200)
    }

    async function handleCopy(): Promise<void> {
        if (!canCopy) return
        if (typeof navigator === 'undefined' || !navigator.clipboard) return

        const resetLabel = copyLabel
        try {
            await navigator.clipboard.writeText(resolvedCopyText)
            copyLabel = 'Copied'
        } catch {
            copyLabel = 'Failed'
        }

        scheduleLabelReset(resetLabel)
    }
</script>

<div class={classes.root}>
    <div class={classes.header}>
        <p class={classes.title}>{title}</p>
        <button type="button" class={classes.button} disabled={!canCopy} onclick={handleCopy}>
            {copyLabel}
        </button>
    </div>

    <div class={classes.body}>
        {#if html}
            {@html html}
        {:else if children}
            {@render children()}
        {:else}
            <pre class="shiki">
                <code>{code}</code>
            </pre>
        {/if}
    </div>
</div>
