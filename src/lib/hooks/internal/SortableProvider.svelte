<script lang="ts" generics="T">
    import { DragDropProvider, DragOverlay } from '@dnd-kit/svelte'
    import {
        RestrictToHorizontalAxis,
        RestrictToVerticalAxis
    } from '@dnd-kit/abstract/modifiers'
    import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/dom'
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

    function handleDragOver(event: DragOverEvent) {
        // During drag, reorder items optimistically so Svelte re-renders them
        // in the new order — dnd-kit then animates the transition via WAAPI.
        // Without this, items only reorder on drop and there is no push animation.
        if (ctx.isDisabled() || !isSortableOperation(event.operation)) return

        const { source, target } = event.operation
        if (!source || !target || source.index === target.index) return

        // Only handle items that belong to this list
        const items = ctx.getItems()
        const sourceInList = items.some((entry) => String(ctx.getId(entry)) === String(source.id))
        if (!sourceInList) return

        ctx.onReorder(moveArrayItem(items, source.index, target.index))
    }

    function handleDragEnd(event: DragEndEvent) {
        const { source } = event.operation

        // Let the drop animation play (250ms default) before clearing draggingId
        // Items are already in correct order from handleDragOver — nothing to reorder here.
        setTimeout(() => {
            if (ctx.getDraggingId() === source?.id) {
                ctx.setDraggingId(null)
            }
        }, 250)
    }
</script>

{#if isGrouped}
    {@render children?.()}
{:else}
    <DragDropProvider {modifiers} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
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
