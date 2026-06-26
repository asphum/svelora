<script lang="ts">
    import { untrack, getContext } from 'svelte'
    import { twMerge } from 'tailwind-merge'
    import { Icon } from '../Icon/index.js'
    import Badge from '../Badge/Badge.svelte'
    import Kbd from '../Kbd/Kbd.svelte'
    import { DropdownMenu } from '../DropdownMenu/index.js'
    import { Tooltip } from '../Tooltip/index.js'
    import type { NavigationMenuProps, NavigationMenuItemType } from './navigation-menu.types.js'
    import { navigationMenuVariants } from './navigation-menu.variants.js'

    let {
        items = [],
        variant = 'default',
        orientation = 'horizontal',
        accordion = false,
        class: className,
        ui,
        children
    }: NavigationMenuProps = $props()

    const sidebarCollapsedFn = getContext<() => boolean>('sidebar-collapsed')
    let isCollapsed = $derived(sidebarCollapsedFn ? sidebarCollapsedFn() : false)

    const sidebarPositionFn = getContext<() => 'left' | 'right'>('sidebar-position')
    let sidebarPosition = $derived(sidebarPositionFn ? sidebarPositionFn() : 'left')

    let styles = $derived(
        navigationMenuVariants({
            variant,
            orientation,
            collapsed: isCollapsed
        })
    )

    let normalizedItems = $derived.by(() => {
        if (!items || items.length === 0) return []
        if (Array.isArray(items[0])) {
            return items as NavigationMenuItemType[][]
        }
        return [items as NavigationMenuItemType[]]
    })

    // --- Accordion State (for vertical) ---
    function getInitialOpenGroups() {
        const opened: string[] = []
        for (const group of normalizedItems) {
            for (const item of group) {
                if (item.defaultOpen && item.label) opened.push(item.label)
            }
        }
        return opened
    }

    let openGroupLabel = $state<string | null>(
        untrack(() => accordion ? (getInitialOpenGroups()[0] ?? null) : null)
    )
    let openGroups = $state<string[]>(
        untrack(() => !accordion ? getInitialOpenGroups() : [])
    )

    function handleGroupToggle(item: NavigationMenuItemType) {
        if (!item.label) return
        if (accordion) {
            openGroupLabel = openGroupLabel === item.label ? null : item.label
        } else {
            if (openGroups.includes(item.label)) {
                openGroups = openGroups.filter((l) => l !== item.label)
            } else {
                openGroups = [...openGroups, item.label]
            }
        }
    }

    function isGroupOpen(item: NavigationMenuItemType): boolean {
        if (accordion) return openGroupLabel === item.label
        if (!item.label) return false
        return openGroups.includes(item.label)
    }

    // --- Auto Active State ---
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

    // Helper for keyboard shortcuts
    function getKbds(item: NavigationMenuItemType) {
        return item.kbds || item.shortcut || []
    }
</script>

{#snippet renderItem(item: NavigationMenuItemType)}
    <li class={orientation === 'vertical' ? 'w-full' : ''}>
        {#if item.type === 'separator'}
            <!-- SEPARATOR -->
            <div class={orientation === 'horizontal' ? 'w-px h-6 bg-outline-variant mx-1' : 'h-px w-full bg-outline-variant my-1'}></div>
        {:else if (item.items && item.items.length > 0) || (item.children && item.children.length > 0)}
            {@const subItems = item.items || item.children || []}
            
            {#if orientation === 'horizontal'}
                <!-- HORIZONTAL: Dropdown -->
                <DropdownMenu 
                    items={subItems as any} 
                    side="bottom" 
                    align="start"
                    sideOffset={4}
                >
                    {#snippet children({ props, open })}
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        {#snippet buttonContent()}
                            <button
                                type="button"
                                {...props}
                                class={twMerge(styles.item({ active: isActive(item), collapsed: isCollapsed }), item.class)}
                                disabled={item.disabled}
                            >
                                {#if item.icon}
                                    <Icon name={item.icon} class={styles.icon({ active: isActive(item), collapsed: isCollapsed })} />
                                {/if}
                                {#if !isCollapsed}
                                    <span>{item.label}</span>
                                    {#if item.badge !== undefined}
                                        <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" class="ml-1" />
                                    {/if}
                                    <span class="ml-auto flex items-center">
                                        <Icon 
                                            name="lucide:chevron-down" 
                                            class={twMerge(styles.chevron(), open ? 'rotate-180' : '')} 
                                        />
                                    </span>
                                {/if}
                            </button>
                        {/snippet}
                        
                        {#if isCollapsed}
                            <Tooltip text={item.label} side={sidebarPosition === 'right' ? 'left' : 'right'}>
                                {@render buttonContent()}
                            </Tooltip>
                        {:else}
                            {@render buttonContent()}
                        {/if}
                    {/snippet}
                </DropdownMenu>
            {:else}
                <!-- VERTICAL: Accordion -->
                {#snippet accordionButton()}
                    <button
                        type="button"
                        class={twMerge(
                            styles.accordionTrigger(), 
                            isGroupOpen(item) ? styles.item({ active: true, collapsed: isCollapsed }) : '', 
                            isCollapsed ? styles.item({ collapsed: true }) : '',
                            item.class
                        )}
                        disabled={item.disabled}
                        onclick={() => handleGroupToggle(item)}
                    >
                        <div class="flex flex-1 items-center truncate">
                            {#if item.icon}
                                <Icon name={item.icon} class={styles.icon({ active: isActive(item), collapsed: isCollapsed })} />
                            {/if}
                            {#if !isCollapsed}
                                <span class="truncate ml-1.5">{item.label}</span>
                            {/if}
                        </div>
                        {#if !isCollapsed}
                            <div class="flex items-center gap-2">
                                {#if item.badge !== undefined || getKbds(item).length > 0}
                                    <span class="flex items-center gap-2">
                                        {#if item.badge !== undefined}
                                            <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" />
                                        {/if}
                                        {#if getKbds(item).length > 0}
                                            <span class="flex items-center gap-0.5">
                                                {#each getKbds(item) as key}
                                                    <Kbd value={typeof key === 'string' ? key : key.value} size="sm" />
                                                {/each}
                                            </span>
                                        {/if}
                                    </span>
                                {/if}
                                <Icon 
                                    name="lucide:chevron-down" 
                                    class={twMerge(styles.chevron(), isGroupOpen(item) ? 'rotate-180' : '')} 
                                />
                            </div>
                        {/if}
                    </button>
                {/snippet}

                {#if isCollapsed}
                    <Tooltip text={item.label} side={sidebarPosition === 'right' ? 'left' : 'right'}>
                        {@render accordionButton()}
                    </Tooltip>
                {:else}
                    {@render accordionButton()}
                {/if}
                {#if isGroupOpen(item)}
                    <ul class={styles.accordionGroupContent()}>
                        {#each subItems as subItem}
                            {@render renderItem(subItem)}
                        {/each}
                    </ul>
                {/if}
            {/if}
        {:else}
            <!-- STANDARD LINK -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            {#snippet linkContent()}
                <svelte:element 
                    this={item.href ? 'a' : 'button'}
                    href={item.href}
                    target={item.target}
                    type={!item.href ? 'button' : undefined}
                    class={twMerge(styles.item({ active: isActive(item), collapsed: isCollapsed }), item.class)}
                    disabled={item.disabled}
                    onclick={item.onClick}
                >
                    <div class="flex flex-1 items-center truncate gap-1.5">
                        {#if item.icon}
                            <Icon name={item.icon} class={styles.icon({ active: isActive(item), collapsed: isCollapsed })} />
                        {/if}
                        {#if !isCollapsed && item.label}
                            <span class="truncate">{item.label}</span>
                        {/if}
                    </div>
                    {#if !isCollapsed && (item.badge !== undefined || getKbds(item).length > 0)}
                        <span class="ml-auto flex items-center gap-2">
                            {#if item.badge !== undefined}
                                <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" />
                            {/if}
                            {#if getKbds(item).length > 0}
                                <span class="flex items-center gap-0.5">
                                    {#each getKbds(item) as key}
                                        <Kbd value={typeof key === 'string' ? key : key.value} size="sm" />
                                    {/each}
                                </span>
                            {/if}
                        </span>
                    {/if}
                </svelte:element>
            {/snippet}

            {#if isCollapsed}
                <Tooltip text={item.label} side={sidebarPosition === 'right' ? 'left' : 'right'}>
                    {@render linkContent()}
                </Tooltip>
            {:else}
                {@render linkContent()}
            {/if}
        {/if}
    </li>
{/snippet}

<nav class={twMerge(styles.base(), className)}>
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
</nav>
