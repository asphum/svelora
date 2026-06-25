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
        orientation = 'horizontal',
        class: className,
        ui,
        children
    }: NavigationMenuProps = $props()

    let styles = $derived(navigationMenuVariants({ variant, orientation }))

    let normalizedItems = $derived.by(() => {
        if (!items || items.length === 0) return []
        if (Array.isArray(items[0])) {
            return items as NavigationMenuItemType[][]
        }
        return [items as NavigationMenuItemType[]]
    })

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
    <li class={orientation === 'vertical' ? 'w-full' : ''}>
        {#if (item.items && item.items.length > 0) || (item.children && item.children.length > 0)}
            {@const subItems = item.items || item.children || []}
            <!-- Dropdown for nested items -->
            <DropdownMenu 
                items={subItems} 
                side={orientation === 'vertical' ? 'right' : 'bottom'} 
                align="start"
                sideOffset={4}
            >
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
                        <span class="ml-auto flex items-center">
                            <Icon 
                                name={orientation === 'vertical' ? 'lucide:chevron-right' : 'lucide:chevron-down'} 
                                class={twMerge(
                                    styles.chevron(), 
                                    open && orientation === 'horizontal' ? 'rotate-180' : '',
                                    open && orientation === 'vertical' ? 'translate-x-1' : ''
                                )} 
                            />
                        </span>
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
                    <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" class="ml-auto" />
                {/if}
            </svelte:element>
        {/if}
    </li>
{/snippet}

<nav>
    <div class={twMerge(styles.base(), className)}>
        {#if children}
            {@render children()}
        {:else}
            {#each normalizedItems as group}
                <ul class={styles.group()}>
                    {#each group as item}
                        {@render renderItem(item)}
                    {/each}
                </ul>
            {/each}
        {/if}
    </div>
</nav>
