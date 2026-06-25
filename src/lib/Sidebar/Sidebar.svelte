<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { setContext } from 'svelte'
    import type { SidebarProps } from './sidebar.types.js'
    import { sidebarVariants } from './sidebar.variants.js'

    let {
        collapsed = false,
        position = 'left',
        class: className,
        header,
        footer,
        children,
        ...restProps
    }: SidebarProps = $props()

    let styles = $derived(sidebarVariants({ collapsed, position }))

    // Provide context to children (like Menu) so they know if sidebar is collapsed
    // Useful if we want the Menu to hide labels when collapsed
    setContext('sidebar-collapsed', () => collapsed)
</script>

<aside class={twMerge(styles.base(), className)} {...restProps}>
    {#if header}
        <div class={styles.header()}>
            {@render header()}
        </div>
    {/if}

    <div class={styles.content()}>
        {@render children?.()}
    </div>

    {#if footer}
        <div class={styles.footer()}>
            {@render footer()}
        </div>
    {/if}
</aside>
