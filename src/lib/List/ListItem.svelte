<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { getContext } from 'svelte'
    import type { ListItemProps } from './list.types.js'
    import { listVariants, type ListVariantProps } from './list.variants.js'

    let {
        title,
        description,
        interactive = false,
        disabled = false,
        href,
        target,
        class: className,
        leading,
        trailing,
        children,
        ...restProps
    }: ListItemProps = $props()

    // Get the parent list variant, default to 'default' if used outside a List
    const getListVariant = getContext<() => ListVariantProps['variant']>('list-variant')
    let parentVariant = $derived(getListVariant ? getListVariant() : 'default')

    // Determine if it should be interactive automatically if it's a link
    let isInteractive = $derived(interactive || !!href)

    let styles = $derived(listVariants({ 
        variant: parentVariant, 
        interactive: isInteractive,
        disabled 
    }))
    
    // Using svelte:element with conditional tags and spreading restProps causes TS errors.
    // We use a snippet to keep the markup DRY while using explicit if/else tags.
</script>

{#snippet contentWrapper()}
    {#if leading}
        <div class={styles.leading()}>
            {@render leading()}
        </div>
    {/if}

    <div class={styles.itemContent()}>
        {#if children}
            {@render children()}
        {:else}
            {#if title}
                <div class={styles.itemTitle()}>{title}</div>
            {/if}
            {#if description}
                <div class={styles.itemDescription()}>{description}</div>
            {/if}
        {/if}
    </div>

    {#if trailing}
        <div class={styles.trailing()}>
            {@render trailing()}
        </div>
    {/if}
{/snippet}

<li>
    {#if href}
        <a 
            {href}
            {target}
            class={twMerge(styles.item(), className)}
            {...restProps as any}
        >
            {@render contentWrapper()}
        </a>
    {:else}
        <div 
            class={twMerge(styles.item(), className)}
            {...restProps as any}
        >
            {@render contentWrapper()}
        </div>
    {/if}
</li>
