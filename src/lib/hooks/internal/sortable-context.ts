import type { UseSortableOptions } from '../useSortable/useSortable.svelte.js'

export const SORTABLE_CONTEXT_KEY = Symbol('svelora-sortable')

export interface SortableContextValue<T> {
    groupId: string
    getItems: UseSortableOptions<T>['getItems']
    getId: UseSortableOptions<T>['getId']
    onReorder: UseSortableOptions<T>['onReorder']
    isDisabled: () => boolean
    getAxis: () => 'vertical' | 'horizontal'
    getHandle: () => string | undefined
    setDraggingId: (id: string | number | null) => void
}
