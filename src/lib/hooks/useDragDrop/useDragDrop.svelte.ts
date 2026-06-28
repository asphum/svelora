import type { Action } from 'svelte/action'

const MIME_TYPE = 'application/x-svelora-drag'

export interface DragPayload<T = unknown> {
    id: string
    data?: T
}

export interface UseDraggableOptions<T = unknown> {
    id: string
    data?: T
    disabled?: boolean | (() => boolean)
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

function readPayload<T>(event: DragEvent): DragPayload<T> | null {
    const raw = event.dataTransfer?.getData(MIME_TYPE)
    if (!raw) return null

    try {
        return JSON.parse(raw) as DragPayload<T>
    } catch {
        return null
    }
}

/**
 * HTML5 drag-and-drop actions for moving items between containers.
 *
 * Attach `draggable` to a source element and `droppable` to target zones.
 */
export function useDragDrop(): UseDragDropReturn {
    let draggingId = $state<string | null>(null)

    const draggable: Action<HTMLElement, UseDraggableOptions> = (node, initialOptions) => {
        let currentOptions = initialOptions!

        function isDisabled(): boolean {
            return typeof currentOptions.disabled === 'function'
                ? currentOptions.disabled()
                : (currentOptions.disabled ?? false)
        }

        function handleDragStart(event: DragEvent) {
            if (isDisabled()) {
                event.preventDefault()
                return
            }

            draggingId = currentOptions.id
            event.dataTransfer?.setData(
                MIME_TYPE,
                JSON.stringify({ id: currentOptions.id, data: currentOptions.data })
            )
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move'
            }
        }

        function handleDragEnd() {
            draggingId = null
        }

        node.draggable = true
        node.addEventListener('dragstart', handleDragStart)
        node.addEventListener('dragend', handleDragEnd)

        return {
            update(newOptions) {
                currentOptions = newOptions
                node.draggable = !isDisabled()
            },
            destroy() {
                node.removeEventListener('dragstart', handleDragStart)
                node.removeEventListener('dragend', handleDragEnd)
                node.draggable = false
                if (draggingId === currentOptions.id) {
                    draggingId = null
                }
            }
        }
    }

    const droppable: Action<HTMLElement, UseDroppableOptions> = (node, initialOptions) => {
        let currentOptions = initialOptions!

        function isDisabled(): boolean {
            return typeof currentOptions.disabled === 'function'
                ? currentOptions.disabled()
                : (currentOptions.disabled ?? false)
        }

        function handleDragOver(event: DragEvent) {
            if (isDisabled()) return

            const payload = readPayload(event)
            if (!payload) return
            if (currentOptions.accept && !currentOptions.accept(payload)) return

            event.preventDefault()
            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = 'move'
            }
            node.setAttribute('data-droppable-active', 'true')
        }

        function handleDragLeave() {
            node.removeAttribute('data-droppable-active')
        }

        function handleDrop(event: DragEvent) {
            node.removeAttribute('data-droppable-active')
            if (isDisabled()) return

            event.preventDefault()
            const payload = readPayload(event)
            if (!payload) return
            if (currentOptions.accept && !currentOptions.accept(payload)) return
            if (payload.id === currentOptions.id) return

            currentOptions.onDrop(payload)
        }

        node.addEventListener('dragover', handleDragOver)
        node.addEventListener('dragleave', handleDragLeave)
        node.addEventListener('drop', handleDrop)

        return {
            update(newOptions) {
                currentOptions = newOptions
            },
            destroy() {
                node.removeEventListener('dragover', handleDragOver)
                node.removeEventListener('dragleave', handleDragLeave)
                node.removeEventListener('drop', handleDrop)
                node.removeAttribute('data-droppable-active')
            }
        }
    }

    return {
        get draggingId() {
            return draggingId
        },
        draggable,
        droppable
    }
}
