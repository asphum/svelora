import '@thisux/sveltednd'
import type { Action } from 'svelte/action'
import { draggable, droppable, type DragDropState } from '@thisux/sveltednd'
import { moveArrayItem, resolveSortableDropIndex } from './sortable-utils.js'

export interface UseSortableItemParams<T> {
    index: number
    item: T
}

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

export interface UseSortableReturn<T> {
    /** Attach to the list container element (optional wrapper). */
    readonly container: Action<HTMLElement>

    /** Attach to each sortable row with the current index and item. */
    readonly item: Action<HTMLElement, UseSortableItemParams<T>>

    /** Id of the item currently being dragged, or null. */
    readonly draggingId: string | number | null
}

/**
 * Sortable list hook powered by [@thisux/sveltednd](https://github.com/thisuxhq/sveltednd).
 *
 * Attach `use:sortable.item={{ index, item }}` to each row.
 * Optionally wrap the list with `use:sortable.container`.
 */
export function useSortable<T>(options: UseSortableOptions<T>): UseSortableReturn<T> {
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

    function ownsItem(item: T): boolean {
        const id = getId(item)
        return getItems().some((entry) => getId(entry) === id)
    }

    function handleDrop(state: DragDropState<T>) {
        if (isDisabled()) return

        const items = getItems()
        const dragIndex = items.findIndex((entry) => getId(entry) === getId(state.draggedItem))
        if (dragIndex === -1) return

        const toIndex = resolveSortableDropIndex(
            dragIndex,
            state.targetContainer,
            state.dropPosition
        )
        if (toIndex === null || dragIndex === toIndex) return

        onReorder(moveArrayItem(items, dragIndex, toIndex))
    }

    let listNode = $state<HTMLElement | null>(null)

    $effect(() => {
        const node = listNode
        if (!node) return

        if (draggingId != null) {
            node.setAttribute('data-sortable-active', 'true')
        } else {
            node.removeAttribute('data-sortable-active')
        }
    })

    function buildDraggableOptions(index: number, item: T) {
        return {
            container: String(index),
            dragData: item,
            disabled: isDisabled(),
            handle: getHandle(),
            attributes: {
                draggingClass: 'dragging'
            },
            callbacks: {
                onDragStart: (state: DragDropState<T>) => {
                    if (!ownsItem(state.draggedItem)) return
                    draggingId = getId(state.draggedItem)
                },
                onDragEnd: () => {
                    draggingId = null
                }
            }
        } satisfies Parameters<typeof draggable<T>>[1]
    }

    function buildDroppableOptions(index: number) {
        return {
            container: String(index),
            direction: getAxis(),
            disabled: isDisabled(),
            callbacks: {
                onDrop: handleDrop
            }
        } satisfies Parameters<typeof droppable<T>>[1]
    }

    const container: Action<HTMLElement> = (node) => {
        listNode = node

        return {
            destroy() {
                if (listNode === node) {
                    listNode = null
                }
                node.removeAttribute('data-sortable-active')
            }
        }
    }

    const item: Action<HTMLElement, UseSortableItemParams<T>> = (node, params) => {
        let current = params!
        let dragApi = draggable(node, buildDraggableOptions(current.index, current.item))
        let dropApi = droppable(node, buildDroppableOptions(current.index))

        node.setAttribute('data-sortable-item', '')
        node.dataset.sortableId = String(getId(current.item))

        return {
            update(nextParams) {
                current = nextParams
                dragApi.update(buildDraggableOptions(current.index, current.item))
                dropApi.update(buildDroppableOptions(current.index))
                node.dataset.sortableId = String(getId(current.item))
            },
            destroy() {
                dragApi.destroy()
                dropApi.destroy()
                node.removeAttribute('data-sortable-item')
                delete node.dataset.sortableId
            }
        }
    }

    return {
        container,
        item,
        get draggingId() {
            return draggingId
        }
    }
}
