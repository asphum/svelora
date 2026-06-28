<script lang="ts" module>
    export type { SortableListProps } from './sortable-list.types.js'
</script>

<script lang="ts" generics="T">
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import { useSortable } from '../../hooks/useSortable/index.js'
    import type { SortableListProps } from './sortable-list.types.js'

    let {
        items = $bindable(),
        getKey,
        onReorder,
        axis = 'vertical',
        handle = true,
        disabled = false,
        class: className,
        itemClass,
        children
    }: SortableListProps<T> = $props()

    const sortable = useSortable({
        getItems: () => items,
        getId: (item) => getKey(item),
        axis: () => axis,
        handle: () => (handle ? '[data-sortable-handle]' : undefined),
        disabled: () => disabled,
        onReorder(nextItems) {
            items = nextItems
            onReorder?.(nextItems)
        }
    })

    const listClass = $derived(
        twMerge(
            'flex gap-2',
            axis === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
        )
    )

    const itemClasses = $derived(
        twMerge(
            'relative flex items-center gap-3 rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 transition-shadow select-none',
            'dragging:z-10 dragging:shadow-md dragging:opacity-95',
            itemClass
        )
    )
</script>

<div use:sortable.container class={listClass} role="list">
    {#each items as item, index (getKey(item))}
        {@const id = getKey(item)}
        {@const dragging = sortable.draggingId === String(id)}
        <div
            use:sortable.item={{ index, item }}
            role="listitem"
            class={itemClasses}
            aria-grabbed={dragging}
        >
            {#if handle}
                <button
                    type="button"
                    data-sortable-handle
                    class="inline-flex shrink-0 cursor-grab rounded-md p-1 text-on-surface-variant hover:bg-surface-container-high active:cursor-grabbing"
                    aria-label="Drag to reorder"
                >
                    <Icon name="lucide:grip-vertical" size="16" />
                </button>
            {/if}
            {@render children({ item, index, dragging })}
        </div>
    {/each}
</div>

<style>
    :global([data-sortable-active='true']) {
        user-select: none;
    }

    :global(.drop-before::before),
    :global(.drop-after::after),
    :global(.drop-left::before),
    :global(.drop-right::after) {
        background-color: var(--color-primary);
    }
</style>
