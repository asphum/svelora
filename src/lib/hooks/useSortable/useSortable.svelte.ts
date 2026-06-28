import type { Action } from 'svelte/action'
import { getReorderIndex, measureSortableRects, moveArrayItem } from './sortable-utils.js'

export interface UseSortableOptions<T> {
    /** Reactive getter for the current item array. */
    getItems: () => T[]

    /** Stable id for each item — used for keys and reorder tracking. */
    getId: (item: T) => string | number

    /** Called with the reordered array after a successful drop. */
    onReorder: (items: T[]) => void

    /**
     * Drag axis.
     * @default 'vertical'
     */
    axis?: 'vertical' | 'horizontal' | (() => 'vertical' | 'horizontal')

    /**
     * CSS selector for the drag handle, relative to each item.
     * When omitted, the whole item is draggable.
     * @example '[data-sortable-handle]'
     */
    handle?: string | (() => string | undefined)

    /**
     * Disable sorting.
     * @default false
     */
    disabled?: boolean | (() => boolean)
}

export interface UseSortableReturn {
    /** Attach to the list container element. */
    readonly container: Action<HTMLElement>

    /** Id of the item currently being dragged, or null. */
    readonly draggingId: string | number | null
}

/**
 * Pointer-based sortable list hook.
 *
 * Mark each row with `data-sortable-item` and `data-sortable-id`.
 * Optionally add `data-sortable-handle` on a handle button.
 */
export function useSortable<T>(options: UseSortableOptions<T>): UseSortableReturn {
    const { getItems, getId, onReorder } = options

    let draggingId = $state<string | number | null>(null)

    function getAxis(): 'vertical' | 'horizontal' {
        const axis = options.axis
        return typeof axis === 'function' ? axis() : (axis ?? 'vertical')
    }

    function getHandle(): string | undefined {
        const handle = options.handle
        return typeof handle === 'function' ? handle() : handle
    }

    function isDisabled(): boolean {
        return typeof options.disabled === 'function'
            ? options.disabled()
            : (options.disabled ?? false)
    }

    function resolveDragTarget(item: HTMLElement, target: EventTarget | null): boolean {
        if (!(target instanceof Element)) return !getHandle()

        const handle = getHandle()
        if (handle) {
            return Boolean(target.closest(handle) && item.contains(target))
        }

        return item.contains(target)
    }

    const container: Action<HTMLElement> = (node) => {
        let activePointerId: number | null = null
        let activeItem: HTMLElement | null = null
        let activeId: string | number | null = null
        let startIndex = -1
        let currentIndex = -1
        let offset = 0

        function resetDrag() {
            if (activeItem) {
                activeItem.style.transform = ''
                activeItem.style.zIndex = ''
                activeItem.style.position = ''
                activeItem.removeAttribute('data-sortable-dragging')
            }

            activePointerId = null
            activeItem = null
            activeId = null
            startIndex = -1
            currentIndex = -1
            offset = 0
            draggingId = null
        }

        function applyPreviewTransform(pointer: number) {
            if (!activeItem) return

            const delta =
                getAxis() === 'horizontal'
                    ? pointer - (activeItem.getBoundingClientRect().left + offset)
                    : pointer - (activeItem.getBoundingClientRect().top + offset)

            activeItem.style.transform =
                getAxis() === 'horizontal' ? `translateX(${delta}px)` : `translateY(${delta}px)`
        }

        function handlePointerDown(event: PointerEvent) {
            if (isDisabled() || event.button !== 0) return

            const item = (event.target as Element | null)?.closest<HTMLElement>(
                '[data-sortable-item][data-sortable-id]'
            )

            if (!item || !node.contains(item)) return
            if (!resolveDragTarget(item, event.target)) return

            const id = item.dataset.sortableId
            if (!id) return

            const items = getItems()
            const fromIndex = items.findIndex((entry) => String(getId(entry)) === id)
            if (fromIndex === -1) return

            event.preventDefault()

            const rect = item.getBoundingClientRect()
            offset =
                getAxis() === 'horizontal' ? event.clientX - rect.left : event.clientY - rect.top

            activePointerId = event.pointerId
            activeItem = item
            activeId = id
            startIndex = fromIndex
            currentIndex = fromIndex
            draggingId = getId(items[fromIndex])

            item.setPointerCapture(event.pointerId)
            item.style.position = 'relative'
            item.style.zIndex = '10'
            item.setAttribute('data-sortable-dragging', 'true')
        }

        function handlePointerMove(event: PointerEvent) {
            if (activePointerId !== event.pointerId || activeId == null) return

            const pointer = getAxis() === 'horizontal' ? event.clientX : event.clientY
            const rects = measureSortableRects(node, getAxis())
            const nextIndex = getReorderIndex(pointer, rects, activeId, getAxis())

            if (nextIndex !== -1 && nextIndex !== currentIndex) {
                currentIndex = nextIndex
            }

            applyPreviewTransform(pointer)
        }

        function handlePointerUp(event: PointerEvent) {
            if (activePointerId !== event.pointerId || activeId == null) return

            if (startIndex !== -1 && currentIndex !== -1 && startIndex !== currentIndex) {
                onReorder(moveArrayItem(getItems(), startIndex, currentIndex))
            }

            if (activeItem?.hasPointerCapture(event.pointerId)) {
                activeItem.releasePointerCapture(event.pointerId)
            }

            resetDrag()
        }

        node.addEventListener('pointerdown', handlePointerDown)
        node.addEventListener('pointermove', handlePointerMove)
        node.addEventListener('pointerup', handlePointerUp)
        node.addEventListener('pointercancel', handlePointerUp)

        return {
            destroy() {
                node.removeEventListener('pointerdown', handlePointerDown)
                node.removeEventListener('pointermove', handlePointerMove)
                node.removeEventListener('pointerup', handlePointerUp)
                node.removeEventListener('pointercancel', handlePointerUp)
                resetDrag()
            }
        }
    }

    return {
        container,
        get draggingId() {
            return draggingId
        }
    }
}
