import type { HTMLAttributes } from 'svelte/elements'
import type { TreeViewVariantProps } from './tree-view.variants.js'
import type { Snippet } from 'svelte'

export interface TreeItem {
    /**
     * Unique identifier for the item.
     */
    id: string | number

    /**
     * Text label to display.
     */
    label: string

    /**
     * Optional icon name.
     */
    icon?: string

    /**
     * Whether the item is disabled.
     */
    disabled?: boolean

    /**
     * Child items (for nested trees).
     */
    children?: TreeItem[]

    /**
     * Any other custom data you want to attach.
     */
    [key: string]: any
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Array of tree items to display.
     */
    items: TreeItem[]

    /**
     * Currently selected item IDs.
     */
    selectedIds?: (string | number)[]

    /**
     * Currently expanded item IDs.
     */
    expandedIds?: (string | number)[]

    /**
     * Component size.
     */
    size?: TreeViewVariantProps['size']

    /**
     * Whether clicking the row expands the item, or only clicking the chevron expands it.
     * @default true
     */
    expandOnRowClick?: boolean

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Event fired when an item is clicked.
     */
    onItemClick?: (item: TreeItem) => void

    /**
     * Event fired when an item's expanded state changes.
     */
    onItemExpand?: (item: TreeItem, isExpanded: boolean) => void

    /**
     * Custom snippet for rendering the label part of the item.
     */
    labelSnippet?: Snippet<[TreeItem]>
}
