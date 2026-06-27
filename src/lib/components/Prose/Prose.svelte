<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { ProseProps } from './prose.types.js'
    import { proseVariants } from './prose.variants.js'

    let {
        size = 'base',
        html,
        class: className,
        children,
        ...restProps
    }: ProseProps = $props()

    let styles = $derived(proseVariants({ size }))
</script>

<div class={twMerge(styles.base() as string, className)} {...restProps}>
    {#if html}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html html}
    {/if}
    {@render children?.()}
</div>
