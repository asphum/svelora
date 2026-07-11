<script lang="ts">
    import { DragDropProvider, DragOverlay } from '@dnd-kit/svelte'
    import { setContext, type Snippet } from 'svelte'
    import { SORTABLE_GROUP_CONTEXT_KEY, type SortableGroupContextValue } from '../../hooks/internal/sortable-context.js'
    import type { DragStartEvent, DragEndEvent, DragDropManagerInput } from '@dnd-kit/dom'
    import type { DragDropEventHandlers } from '@dnd-kit/abstract'
    import type { Draggable, Droppable, DragDropManager } from '@dnd-kit/dom'

    type Events = DragDropEventHandlers<Draggable, Droppable, DragDropManager>

    interface Props extends DragDropManagerInput {
        children?: Snippet
        onBeforeDragStart?: Events['beforedragstart']
        onDragStart?: Events['dragstart']
        onDragMove?: Events['dragmove']
        onDragOver?: Events['dragover']
        onDragEnd?: Events['dragend']
        onCollision?: Events['collision']
    }

    let { children, onDragStart, onDragEnd, ...rest }: Props = $props()

    let draggingId = $state<string | number | null>(null)

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
        }
    }

    setContext(SORTABLE_GROUP_CONTEXT_KEY, ctx)

    function handleDragStart(event: DragStartEvent) {
        draggingId = event.operation.source?.id ?? null
        onDragStart?.(event)
    }

    function handleDragEnd(event: DragEndEvent) {
        const sourceId = event.operation.source?.id
        setTimeout(() => {
            if (draggingId === sourceId) {
                draggingId = null
            }
        }, 250)
        onDragEnd?.(event)
    }
</script>

<DragDropProvider {...rest} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {@render children?.()}
    <DragOverlay>
        {#snippet children(draggable)}
            {@const snippet = ctx.getOverlay(String(draggable.group ?? ''))}
            {#if snippet}
                {@render snippet({ item: draggable.data })}
            {/if}
        {/snippet}
    </DragOverlay>
</DragDropProvider>
