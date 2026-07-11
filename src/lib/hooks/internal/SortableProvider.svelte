<script lang="ts" generics="T">
    import { DragDropProvider, DragOverlay } from '@dnd-kit/svelte'
    import {
        RestrictToHorizontalAxis,
        RestrictToVerticalAxis
    } from '@dnd-kit/abstract/modifiers'
    import type { DragEndEvent, DragStartEvent } from '@dnd-kit/dom'
    import { isSortableOperation } from '@dnd-kit/dom/sortable'
    import { getContext, type Snippet } from 'svelte'
    import { moveArrayItem } from '../useSortable/sortable-utils.js'
    import {
        SORTABLE_CONTEXT_KEY,
        SORTABLE_GROUP_CONTEXT_KEY,
        type SortableContextValue,
        type SortableGroupContextValue
    } from './sortable-context.js'

    interface Props {
        children?: Snippet
        overlay?: Snippet<[{ item: T }]>
    }

    let { children, overlay }: Props = $props()

    const ctx = getContext<SortableContextValue<unknown>>(SORTABLE_CONTEXT_KEY)
    const groupCtx = getContext<SortableGroupContextValue | undefined>(SORTABLE_GROUP_CONTEXT_KEY)
    const isGrouped = !!groupCtx

    // Register/unregister overlay snippet with the parent SortableGroup
    $effect(() => {
        if (groupCtx && overlay) {
            groupCtx.registerOverlay(ctx.groupId, overlay as Snippet<[{ item: unknown }]>)
            return () => {
                groupCtx.unregisterOverlay(ctx.groupId)
            }
        }
    })

    const modifiers = $derived(
        ctx.getAxis() === 'horizontal'
            ? [RestrictToHorizontalAxis]
            : ctx.getAxis() === 'vertical'
              ? [RestrictToVerticalAxis]
              : []
    )

    function handleDragStart(event: DragStartEvent) {
        const source = event.operation.source
        if (!source) return

        const items = ctx.getItems()
        const ownsItem = items.some((entry) => String(ctx.getId(entry)) === String(source.id))
        if (!ownsItem) return

        ctx.setDraggingId(source.id)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { source, target } = event.operation
        
        // Let the drop animation play (250ms default) before clearing draggingId
        // This prevents the original item from flashing before the overlay lands.
        setTimeout(() => {
            // Only clear if the user hasn't started a new drag operation
            if (ctx.getDraggingId() === source?.id) {
                ctx.setDraggingId(null)
            }
        }, 250)

        if (ctx.isDisabled() || !isSortableOperation(event.operation)) return

        if (!source || !target || source.index === target.index) return

        const items = ctx.getItems()
        ctx.onReorder(moveArrayItem(items, source.index, target.index))
    }
</script>

{#if isGrouped}
    {@render children?.()}
{:else}
    <DragDropProvider {modifiers} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {@render children?.()}
        {#if overlay}
            <DragOverlay>
                {#snippet children(draggable)}
                    {@render overlay({ item: draggable.data as T })}
                {/snippet}
            </DragOverlay>
        {/if}
    </DragDropProvider>
{/if}
