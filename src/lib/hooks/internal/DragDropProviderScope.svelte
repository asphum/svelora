<script lang="ts">
    import { DragDropProvider } from '@dnd-kit/svelte'
    import type { DragEndEvent, DragStartEvent } from '@dnd-kit/dom'
    import { getContext, type Snippet } from 'svelte'
    import { DRAG_DROP_CONTEXT_KEY, type DragDropContextValue } from './drag-drop-context.js'

    interface Props {
        children?: Snippet
    }

    let { children }: Props = $props()

    const ctx = getContext<DragDropContextValue>(DRAG_DROP_CONTEXT_KEY)

    function handleDragStart(event: DragStartEvent) {
        const source = event.operation.source
        if (!source) return
        ctx.setDraggingId(String(source.id))
    }

    function handleDragEnd(event: DragEndEvent) {
        const source = event.operation.source
        const target = event.operation.target

        ctx.setDraggingId(null)

        if (!source || !target) return

        const zone = ctx.getDroppable(String(target.id))
        if (!zone) return

        const payload = ctx.toPayload({ id: source.id, data: source.data })
        if (zone.accept && !zone.accept(payload)) return

        zone.onDrop(payload)
    }
</script>

<DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {@render children?.()}
</DragDropProvider>
