<script lang="ts">
    import { untrack } from 'svelte'
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import Badge from '../Badge/Badge.svelte'
    import Kbd from '../Kbd/Kbd.svelte'
    import type { MenuProps, MenuItemType, MenuGroupItem } from './menu.types.js'
    import { menuVariants } from './menu.variants.js'

    let {
        items = [],
        variant = 'default',
        accordion = false,
        autoActive = false,
        class: className,
        children
    }: MenuProps = $props()

    let styles = $derived(menuVariants({ variant }))

    // Track open state for groups
    let openGroupLabel = $state<string | null>(
        untrack(() => accordion
            ? (items.find((item) => item.type === 'group' && item.open && item.label)?.label ?? null)
            : null)
    )
    let openGroups = $state<string[]>(
        untrack(() => !accordion
            ? items
                  .filter((item) => item.type === 'group' && item.open && item.label)
                  .map((item) => item.label as string)
            : [])
    )

    function handleGroupToggle(groupItem: MenuGroupItem) {
        if (accordion) {
            if (openGroupLabel === groupItem.label) {
                openGroupLabel = null
            } else {
                openGroupLabel = groupItem.label || null
            }
        } else {
            toggleGroup(groupItem)
        }
    }

    function toggleGroup(groupItem: MenuGroupItem) {
        if (!groupItem.label) return
        
        if (openGroups.includes(groupItem.label)) {
            openGroups = openGroups.filter(l => l !== groupItem.label)
        } else {
            openGroups = [...openGroups, groupItem.label]
        }
    }

    function isGroupOpen(groupItem: MenuGroupItem): boolean {
        if (accordion) {
            return openGroupLabel === groupItem.label
        }
        if (!groupItem.label) return false
        return openGroups.includes(groupItem.label)
    }

    // Auto active logic
    let currentPath = $state('')
    $effect(() => {
        if (autoActive && typeof window !== 'undefined') {
            currentPath = window.location.pathname
            
            // Optionally listen to popstate for SPA navigation if not using SvelteKit stores
            const onPopState = () => { currentPath = window.location.pathname }
            window.addEventListener('popstate', onPopState)
            return () => window.removeEventListener('popstate', onPopState)
        }
    })

    function isActive(item: MenuItemType): boolean {
        if (item.active) return true
        if (autoActive && item.type !== 'group' && item.href) {
            return currentPath === item.href || currentPath.startsWith(item.href + '/')
        }
        return false
    }
</script>

{#snippet renderActionItem(item: MenuItemType)}
    <li>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <svelte:element 
            this={item.type !== 'group' && item.href ? 'a' : 'button'}
            href={item.type !== 'group' ? item.href : undefined}
            type={item.type !== 'group' && !item.href ? 'button' : undefined}
            target={item.type !== 'group' ? item.target : undefined}
            class={twMerge(styles.item(), isActive(item) ? styles.itemActive() : '', item.class)}
            disabled={item.disabled}
            onclick={item.type !== 'group' ? item.onClick : undefined}
        >
            {#if item.icon}
                <Icon name={item.icon} class={styles.icon()} />
            {/if}
            <span class="truncate">{item.label}</span>
            {#if item.badge || item.shortcut?.length}
                <span class="ml-auto flex items-center gap-2">
                    {#if item.badge !== undefined}
                        <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" />
                    {/if}
                    {#if item.shortcut?.length}
                        <span class="flex items-center gap-0.5">
                            {#each item.shortcut as key}
                                <Kbd value={key} size="sm" />
                            {/each}
                        </span>
                    {/if}
                </span>
            {/if}
        </svelte:element>
    </li>
{/snippet}

{#snippet renderGroupItem(item: MenuGroupItem)}
    <li class={styles.group()}>
        <button
            type="button"
            class={twMerge(styles.groupTrigger(), isGroupOpen(item) ? styles.groupTriggerActive() : '', item.class)}
            disabled={item.disabled}
            onclick={() => handleGroupToggle(item)}
        >
            <div class="flex flex-1 items-center truncate">
                {#if item.icon}
                    <Icon name={item.icon} class={styles.icon()} />
                {/if}
                <span class="truncate">{item.label}</span>
            </div>
            <div class="flex items-center gap-2">
                {#if item.badge !== undefined || item.shortcut?.length}
                    <span class="flex items-center gap-2">
                        {#if item.badge !== undefined}
                            <Badge label={String(item.badge)} color={item.badgeColor || 'primary'} size="sm" />
                        {/if}
                        {#if item.shortcut?.length}
                            <span class="flex items-center gap-0.5">
                                {#each item.shortcut as key}
                                    <Kbd value={key} size="sm" />
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
        </button>
        {#if isGroupOpen(item)}
            <ul class={styles.groupContent()}>
                {#each item.items as subItem}
                    {#if subItem.type === 'group'}
                        {@render renderGroupItem(subItem)}
                    {:else}
                        {@render renderActionItem(subItem)}
                    {/if}
                {/each}
            </ul>
        {/if}
    </li>
{/snippet}

<ul class={twMerge(styles.base(), className)}>
    {#if children}
        {@render children()}
    {:else}
        {#each items as item}
            {#if item.type === 'group'}
                {@render renderGroupItem(item)}
            {:else}
                {@render renderActionItem(item)}
            {/if}
        {/each}
    {/if}
</ul>
