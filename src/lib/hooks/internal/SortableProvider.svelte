<script lang="ts">
    import { DragDropProvider } from '@dnd-kit/svelte'
    import {
        RestrictToHorizontalAxis,
        RestrictToVerticalAxis
    } from '@dnd-kit/abstract/modifiers'
    import type { DragEndEvent, DragStartEvent } from '@dnd-kit/dom'
    import { isSortableOperation } from '@dnd-kit/dom/sortable'
    import { getContext, type Snippet } from 'svelte'
    import { moveArrayItem } from '../useSortable/sortable-utils.js'
    import { SORTABLE_CONTEXT_KEY, type SortableContextValue } from './sortable-context.js'

    interface Props {
        children?: Snippet
    }

    let { children }: Props = $props()

    const ctx = getContext<SortableContextValue<unknown>>(SORTABLE_CONTEXT_KEY)

    const modifiers = $derived(
        ctx.getAxis() === 'horizontal' ? [RestrictToHorizontalAxis] : [RestrictToVerticalAxis]
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
        ctx.setDraggingId(null)

        if (ctx.isDisabled() || !isSortableOperation(event.operation)) return

        const { source, target } = event.operation
        if (!source || !target || source.index === target.index) return

        const items = ctx.getItems()
        ctx.onReorder(moveArrayItem(items, source.index, target.index))
    }
</script>

<DragDropProvider {modifiers} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    {@render children?.()}
</DragDropProvider>
