<script lang="ts">
    import { DragDropProvider, DragOverlay } from '@dnd-kit/svelte'
    import { setContext, type Snippet } from 'svelte'
    import { SORTABLE_GROUP_CONTEXT_KEY, type SortableGroupContextValue } from '../../hooks/internal/sortable-context.js'
    import type { DragStartEvent, DragEndEvent, DragOverEvent, DragMoveEvent, DragDropManagerInput } from '@dnd-kit/dom'
    import type { DragDropManager } from '@dnd-kit/dom'

    interface Props extends DragDropManagerInput {
        children?: Snippet
        onDragStart?: (event: DragStartEvent, manager: DragDropManager) => void
        onDragMove?: (event: DragMoveEvent, manager: DragDropManager) => void
        onDragOver?: (event: DragOverEvent, manager: DragDropManager) => void
        onDragEnd?: (event: DragEndEvent, manager: DragDropManager) => void
    }

    let { children, onDragStart, onDragMove, onDragOver, onDragEnd, ...rest }: Props = $props()

    let draggingId = $state<string | number | null>(null)
    let draggingGroupId = $state<string | null>(null)

    // Map of groupId -> overlay snippet registered by each SortableList
    const overlayRegistry = new Map<string, Snippet<[{ item: unknown }]>>()

    const ctx: SortableGroupContextValue = {
        get draggingId() { return draggingId },
        registerOverlay(groupId, snippet) {
            overlayRegistry.set(groupId, snippet)
        },
        unregisterOverlay(groupId) {
            overlayRegistry.delete(groupId)
        },
        getOverlay(groupId) {
            return overlayRegistry.get(groupId)
        },
        setDraggingGroupId(groupId) {
            draggingGroupId = groupId
        }
    }

    setContext(SORTABLE_GROUP_CONTEXT_KEY, ctx)

    function handleDragStart(event: DragStartEvent, manager: DragDropManager) {
        draggingId = event.operation.source?.id ?? null
        onDragStart?.(event, manager)
    }

    function handleDragEnd(event: DragEndEvent, manager: DragDropManager) {
        const sourceId = event.operation.source?.id
        setTimeout(() => {
            if (draggingId === sourceId) {
                draggingId = null
                draggingGroupId = null
            }
        }, 250)
        onDragEnd?.(event, manager)
    }
</script>

<DragDropProvider {...rest} onDragStart={handleDragStart} onDragEnd={handleDragEnd} {onDragMove} {onDragOver}>
    {@render children?.()}
    <DragOverlay>
        {#snippet children(draggable)}
            {@const snippet = ctx.getOverlay(draggingGroupId ?? '')}
            {#if snippet}
                {@render snippet({ item: draggable.data })}
            {/if}
        {/snippet}
    </DragOverlay>
</DragDropProvider>
