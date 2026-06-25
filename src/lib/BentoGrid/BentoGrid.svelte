<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { BentoGridProps } from './bento-grid.types.js'
    import { bentoGridVariants } from './bento-grid.variants.js'

    let {
        class: className,
        children,
        ...restProps
    }: BentoGridProps = $props()

    let styles = $derived(bentoGridVariants())
</script>

<div class={twMerge(styles.gridBase(), className)} {...restProps}>
    {@render children?.()}
</div>
