import '@thisux/sveltednd'
import type { Action } from 'svelte/action'
import {
    draggable,
    droppable,
    dndState,
    type DragDropState
} from '@thisux/sveltednd'

export interface DragPayload<T = unknown> {
    id: string
    data?: T
}

export interface UseDraggableOptions<T = unknown> {
    /** Unique id for the draggable element. */
    id: string

    /** Source drop zone id — must match the droppable `id` of the container this item is in. */
    container: string

    data?: T
    disabled?: boolean | (() => boolean)
    handle?: string
}

export interface UseDroppableOptions<T = unknown> {
    id: string
    onDrop: (payload: DragPayload<T>) => void
    accept?: (payload: DragPayload<T>) => boolean
    disabled?: boolean | (() => boolean)
}

export interface UseDragDropReturn {
    readonly draggingId: string | null
    readonly draggable: Action<HTMLElement, UseDraggableOptions>
    readonly droppable: Action<HTMLElement, UseDroppableOptions>
}

type DragDropPayload<T> = DragPayload<T> & { __sveloraDragDrop: true }

function toPayload<T>(value: DragDropPayload<T>): DragPayload<T> {
    return { id: value.id, data: value.data }
}

function isDragDropPayload<T>(value: unknown): value is DragDropPayload<T> {
    return (
        typeof value === 'object' &&
        value !== null &&
        '__sveloraDragDrop' in value &&
        'id' in value
    )
}

/**
 * Cross-container drag and drop powered by [@thisux/sveltednd](https://github.com/thisuxhq/sveltednd).
 *
 * Attach `draggable` to sources and `droppable` to targets.
 */
export function useDragDrop(): UseDragDropReturn {
    let draggingId = $state<string | null>(null)

    const draggableAction: Action<HTMLElement, UseDraggableOptions> = (node, initialOptions) => {
        let currentOptions = initialOptions!

        function isDisabled(): boolean {
            return typeof currentOptions.disabled === 'function'
                ? currentOptions.disabled()
                : (currentOptions.disabled ?? false)
        }

        function buildOptions() {
            const payload: DragDropPayload<unknown> = {
                __sveloraDragDrop: true,
                id: currentOptions.id,
                data: currentOptions.data
            }

            return {
                container: currentOptions.container,
                dragData: payload,
                disabled: isDisabled(),
                handle: currentOptions.handle,
                attributes: {
                    draggingClass: 'dragging'
                },
                callbacks: {
                    onDragStart: () => {
                        draggingId = currentOptions.id
                        node.setAttribute('data-dragging', 'true')
                    },
                    onDragEnd: () => {
                        draggingId = null
                        node.removeAttribute('data-dragging')
                    }
                }
            } satisfies Parameters<typeof draggable<DragDropPayload<unknown>>>[1]
        }

        const api = draggable(node, buildOptions())

        return {
            update(newOptions) {
                currentOptions = newOptions
                api.update(buildOptions())
            },
            destroy() {
                api.destroy()
                node.removeAttribute('data-dragging')
                if (draggingId === currentOptions.id) {
                    draggingId = null
                }
            }
        }
    }

    const droppableAction: Action<HTMLElement, UseDroppableOptions> = (node, initialOptions) => {
        let currentOptions = initialOptions!

        function isDisabled(): boolean {
            return typeof currentOptions.disabled === 'function'
                ? currentOptions.disabled()
                : (currentOptions.disabled ?? false)
        }

        function readPayload(state: DragDropState<DragDropPayload<unknown>>): DragPayload | null {
            if (!isDragDropPayload(state.draggedItem)) return null
            return toPayload(state.draggedItem)
        }

        function buildOptions() {
            return {
                container: currentOptions.id,
                disabled: isDisabled(),
                attributes: {
                    dragOverClass: 'drag-over data-droppable-active'
                },
                callbacks: {
                    onDragOver: (state: DragDropState<DragDropPayload<unknown>>) => {
                        const payload = readPayload(state)
                        if (!payload) {
                            dndState.invalidDrop = true
                            return
                        }

                        if (currentOptions.accept && !currentOptions.accept(payload)) {
                            dndState.invalidDrop = true
                            return
                        }

                        dndState.invalidDrop = false
                    },
                    onDrop: (state: DragDropState<DragDropPayload<unknown>>) => {
                        if (dndState.invalidDrop || isDisabled()) return

                        const payload = readPayload(state)
                        if (!payload) return
                        if (currentOptions.accept && !currentOptions.accept(payload)) return

                        currentOptions.onDrop(payload)
                    }
                }
            } satisfies Parameters<typeof droppable<DragDropPayload<unknown>>>[1]
        }

        const api = droppable(node, buildOptions())

        return {
            update(newOptions) {
                currentOptions = newOptions
                api.update(buildOptions())
            },
            destroy() {
                api.destroy()
            }
        }
    }

    return {
        get draggingId() {
            return draggingId
        },
        draggable: draggableAction,
        droppable: droppableAction
    }
}
