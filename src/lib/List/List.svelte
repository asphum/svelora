<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { setContext } from 'svelte'
    import type { ListProps } from './list.types.js'
    import { listVariants } from './list.variants.js'

    let {
        variant = 'default',
        class: className,
        children,
        ...restProps
    }: ListProps = $props()

    let styles = $derived(listVariants({ variant }))

    // Pass the variant down to children if needed, or just let them style themselves
    // Since the variant affects the parent 'base', but 'bordered' also affects 'item',
    // we should provide the list context so ListItems know the current variant.
    setContext('list-variant', () => variant)
</script>

<ul class={twMerge(styles.base(), className)} {...restProps}>
    {@render children?.()}
</ul>
