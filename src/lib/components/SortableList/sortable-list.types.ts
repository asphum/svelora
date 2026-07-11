import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'

export interface SortableListProps<T> {
    items: T[]
    getKey: (item: T) => string | number
    onReorder?: (items: T[]) => void
    axis?: 'vertical' | 'horizontal' | 'grid'
    handle?: boolean
    disabled?: boolean
    class?: ClassNameValue
    itemClass?: ClassNameValue
    children: Snippet<[{ item: T; index: number; dragging: boolean }]>
    overlay?: Snippet<[{ item: T }]>
    group?: string
}
