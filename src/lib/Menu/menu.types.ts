import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { MenuVariantProps } from './menu.variants.js'

export interface MenuItemBase {
    /**
     * Text to display in the menu item.
     */
    label?: string

    /**
     * Icon to display before the label.
     */
    icon?: string

    /**
     * Whether the menu item is disabled.
     */
    disabled?: boolean

    /**
     * Whether the menu item is active/selected.
     */
    active?: boolean

    /**
     * Optional badge text to display (e.g., "New", "5").
     */
    badge?: string | number

    /**
     * Color of the badge.
     * @default 'primary'
     */
    badgeColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'surface'

    /**
     * Keyboard shortcut to display (e.g., ['meta', 'S']).
     */
    shortcut?: string[]

    /**
     * Additional CSS classes.
     */
    class?: ClassNameValue
}

export interface MenuActionItem extends MenuItemBase {
    type?: 'action' | 'item'
    /**
     * The URL to navigate to when the item is clicked.
     */
    href?: string

    /**
     * Click handler for the item.
     */
    onClick?: (event: MouseEvent) => void

    /**
     * Target attribute for link items.
     */
    target?: string
}

export interface MenuGroupItem extends MenuItemBase {
    type: 'group'

    /**
     * Child items to display when the group is expanded.
     */
    items: MenuItems

    /**
     * Whether the group is currently open/expanded.
     */
    open?: boolean
}

export type MenuItemType = MenuActionItem | MenuGroupItem
export type MenuItems = MenuItemType[]

export interface MenuProps {
    /**
     * The array of menu items to render.
     */
    items?: MenuItems

    /**
     * Style variant of the menu.
     */
    variant?: MenuVariantProps['variant']

    /**
     * Whether the menu allows multiple groups to be open at once (false)
     * or acts as an accordion, closing other groups when one opens (true).
     * @default false
     */
    accordion?: boolean

    /**
     * Auto-detect active state from current URL if using SvelteKit.
     * @default false
     */
    autoActive?: boolean

    /**
     * Additional CSS classes.
     */
    class?: ClassNameValue

    /**
     * Custom slot for completely custom rendering of items.
     */
    children?: Snippet
}
