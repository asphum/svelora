<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import Badge from '../Badge/Badge.svelte'
    import DropdownMenu from '../DropdownMenu/DropdownMenu.svelte'
    import type { NavigationMenuProps, NavigationMenuItemType } from './navigation-menu.types.js'
    import { navigationMenuVariants } from './navigation-menu.variants.js'

    let {
        items = [],
        variant = 'default',
        class: className,
        ui,
        children
    }: NavigationMenuProps = $props()

    let styles = $derived(navigationMenuVariants({ variant }))

    // Auto active logic based on current path
    let currentPath = $state('')
    $effect(() => {
        if (typeof window !== 'undefined') {
            currentPath = window.location.pathname
            const onPopState = () => { currentPath = window.location.pathname }
            window.addEventListener('popstate', onPopState)
            return () => window.removeEventListener('popstate', onPopState)
        }
    })

    function isActive(item: NavigationMenuItemType): boolean {
        if (item.active) return true
        if (item.href) {
            return currentPath === item.href || currentPath.startsWith(item.href + '/')
        }
        return false
    }
</script>

{#snippet renderItem(item: NavigationMenuItemType)}
    <li>
        {#if item.items && item.items.length > 0}
            <!-- Dropdown for nested items -->
            <DropdownMenu items={item.items}>
                {#snippet children({ props, open })}
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <button
                        type="button"
                        {...props}
                        class={twMerge(styles.item({ active: isActive(item) }), item.class)}
                        disabled={item.disabled}
                    >
                        {#if item.icon}
                            <Icon name={item.icon} class={styles.icon({ active: isActive(item) })} />
                        {/if}
                        <span>{item.label}</span>
                        {#if item.badge !== undefined}
                            <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" class="ml-1" />
                        {/if}
                        <Icon 
                            name="lucide:chevron-down" 
                            class={twMerge(styles.chevron(), open ? 'rotate-180' : '')} 
                        />
                    </button>
                {/snippet}
            </DropdownMenu>
        {:else}
            <!-- Standard link or button -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <svelte:element 
                this={item.href ? 'a' : 'button'}
                href={item.href}
                target={item.target}
                type={!item.href ? 'button' : undefined}
                class={twMerge(styles.item({ active: isActive(item) }), item.class)}
                disabled={item.disabled}
                onclick={item.onClick}
            >
                {#if item.icon}
                    <Icon name={item.icon} class={styles.icon({ active: isActive(item) })} />
                {/if}
                {#if item.label}
                    <span>{item.label}</span>
                {/if}
                {#if item.badge !== undefined}
                    <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" class="ml-1" />
                {/if}
            </svelte:element>
        {/if}
    </li>
{/snippet}

<nav>
    <ul class={twMerge(styles.base(), className)}>
        {#if children}
            {@render children()}
        {:else}
            {#each items as item}
                {@render renderItem(item)}
            {/each}
        {/if}
    </ul>
</nav>
