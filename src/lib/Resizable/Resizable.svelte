<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { ResizableProps } from './resizable.types.js'
    import { resizableVariants } from './resizable.variants.js'

    let {
        direction = 'both',
        class: className,
        children,
        ...restProps
    }: ResizableProps = $props()

    let styles = $derived(resizableVariants({ direction }))
</script>

<div class={twMerge(styles.base(), className)} {...restProps}>
    {@render children?.()}
</div>
