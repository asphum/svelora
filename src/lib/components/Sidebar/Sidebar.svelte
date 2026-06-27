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

    // Provide context to children (like Menu) so they know if sidebar is collapsed or right-aligned
    setContext('sidebar-collapsed', () => collapsed)
    setContext('sidebar-position', () => position)
</script>

<aside class={twMerge(styles.base(), className)} {...restProps}>
    {#if header}
        <div class={styles.header()}>
            {@render header({ collapsed })}
        </div>
    {/if}

    <div class={styles.content()}>
        {@render children?.({ collapsed })}
    </div>

    {#if footer}
        <div class={styles.footer()}>
            {@render footer({ collapsed })}
        </div>
    {/if}
</aside>
