import type { Action } from 'svelte/action'
import type { Component } from 'svelte'
import { setContext, type Snippet } from 'svelte'
import type { Data } from '@dnd-kit/abstract'
import { createDraggable, createDroppable } from '@dnd-kit/svelte'
import DragDropProviderScope from '../internal/DragDropProviderScope.svelte'
import {
    DRAG_DROP_CONTEXT_KEY,
    type DragDropContextValue
} from '../internal/drag-drop-context.js'

export interface DragPayload<T = unknown> {
    id: string
    data?: T
}

export interface UseDraggableOptions<T = unknown> {
    /** Unique id for the draggable element. */
    id: string

    /** Source drop zone id — used as the draggable type for cross-container matching. */
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
    /**
     * Wrap drag-and-drop markup with this provider.
     * Required — [@dnd-kit/svelte](https://clauderic-dnd-kit.mintlify.app/frameworks/svelte) needs a DragDropProvider ancestor.
     */
    readonly Provider: Component<{ children?: Snippet }>

    readonly draggingId: string | null
    readonly draggable: Action<HTMLElement, UseDraggableOptions>
    readonly droppable: Action<HTMLElement, UseDroppableOptions>
}

/**
 * Cross-container drag and drop powered by [@dnd-kit/svelte](https://clauderic-dnd-kit.mintlify.app/frameworks/svelte).
 *
 * Wrap markup in `dragDrop.Provider`, then attach `draggable` and `droppable` actions.
 */
export function useDragDrop(): UseDragDropReturn {
    let draggingId = $state<string | null>(null)
    const droppables = new Map<string, UseDroppableOptions>()

    const context: DragDropContextValue = {
        registerDroppable(id, options) {
            droppables.set(id, options as UseDroppableOptions)
        },
        unregisterDroppable(id) {
            droppables.delete(id)
        },
        setDraggingId(id) {
            draggingId = id
        },
        getDroppable(id) {
            return droppables.get(id) as UseDroppableOptions | undefined
        },
        toPayload(source) {
            return {
                id: String(source.id),
                data: source.data
            }
        }
    }

    setContext(DRAG_DROP_CONTEXT_KEY, context)

    const draggableAction: Action<HTMLElement, UseDraggableOptions> = (node, initialOptions) => {
        let currentOptions = initialOptions!

        function isDisabled(): boolean {
            return typeof currentOptions.disabled === 'function'
                ? currentOptions.disabled()
                : (currentOptions.disabled ?? false)
        }

        const drag = createDraggable({
            id: currentOptions.id,
            type: currentOptions.container,
            data: (currentOptions.data ?? {}) as Data,
            disabled: isDisabled()
        })

        const detach = drag.attach(node)
        let detachHandle: (() => void) | undefined

        function bindHandle() {
            detachHandle?.()

            const selector = currentOptions.handle
            if (!selector) {
                drag.draggable.handle = undefined
                detachHandle = undefined
                return
            }

            const handle = node.querySelector<HTMLElement>(selector)
            if (!handle) {
                drag.draggable.handle = undefined
                detachHandle = undefined
                return
            }

            detachHandle = drag.attachHandle(handle)
        }

        bindHandle()

        return {
            update(newOptions) {
                currentOptions = newOptions
                drag.draggable.id = newOptions.id
                drag.draggable.type = newOptions.container
                drag.draggable.data = (newOptions.data ?? {}) as Data
                drag.draggable.disabled = isDisabled()
                bindHandle()
            },
            destroy() {
                detach()
                detachHandle?.()
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

        context.registerDroppable(currentOptions.id, currentOptions)

        const drop = createDroppable({
            id: currentOptions.id,
            disabled: isDisabled(),
            accept(source) {
                const payload = context.toPayload({ id: source.id, data: source.data })
                if (currentOptions.accept) {
                    return currentOptions.accept(payload)
                }
                return true
            }
        })

        const detach = drop.attach(node)

        return {
            update(newOptions) {
                context.unregisterDroppable(currentOptions.id)
                currentOptions = newOptions
                context.registerDroppable(currentOptions.id, currentOptions)
                drop.droppable.id = newOptions.id
                drop.droppable.disabled = isDisabled()
            },
            destroy() {
                detach()
                context.unregisterDroppable(currentOptions.id)
                node.removeAttribute('data-droppable-active')
            }
        }
    }

    return {
        get draggingId() {
            return draggingId
        },
        Provider: DragDropProviderScope,
        draggable: draggableAction,
        droppable: droppableAction
    }
}
