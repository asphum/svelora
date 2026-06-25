import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { DropdownMenuItem } from '../DropdownMenu/dropdown-menu.types.js'
import type { BadgeProps } from '../Badge/badge.types.js'
import type { KbdProps } from '../Kbd/kbd.types.js'
import type { NavigationMenuVariantProps, NavigationMenuSlots } from './navigation-menu.variants.js'

export type NavigationMenuItemType = {
    /**
     * Item type for compatibility with DropdownMenu.
     */
    type?: 'item' | 'label' | 'separator' | 'sub'

    /**
     * The visible text displayed in the menu item.
     */
    label?: string

    /**
     * Optional icon to display before the label.
     */
    icon?: string

    /**
     * Optional badge text/number to display after the label.
     */
    badge?: string | number

    /**
     * Badge color (e.g. 'primary', 'error', 'success').
     */
    badgeColor?: BadgeProps['color']

    /**
     * URL to navigate to when clicked.
     */
    href?: string

    /**
     * Target attribute for the link (e.g., '_blank').
     */
    target?: string

    /**
     * Force the active state styling.
     */
    active?: boolean

    /**
     * Disable interaction for this item.
     */
    disabled?: boolean

    /**
     * Whether this group should be open by default (when orientation="vertical").
     */
    defaultOpen?: boolean

    /**
     * Keyboard shortcuts to display.
     */
    shortcut?: string[]
    kbds?: (string | Pick<KbdProps, 'value' | 'size' | 'variant' | 'color'>)[]

    /**
     * Sub-items for this menu item (Svelora standard).
     * If provided, the item renders as a dropdown trigger or accordion.
     */
    items?: NavigationMenuItemType[]

    /**
     * Alias for sub-items (Nuxt UI style compatibility).
     */
    children?: NavigationMenuItemType[]

    /**
     * Custom click handler for standard items.
     */
    onClick?: () => void

    /**
     * Custom class for this specific item.
     */
    class?: ClassNameValue
}

export type NavigationMenuProps = {
    /**
     * Array of navigation items. Supports 1D or 2D arrays for grouping.
     */
    items?: NavigationMenuItemType[] | NavigationMenuItemType[][]

    /**
     * Visual variant of the navigation menu.
     * @default 'default'
     */
    variant?: NonNullable<NavigationMenuVariantProps['variant']>

    /**
     * Orientation of the navigation menu.
     * @default 'horizontal'
     */
    orientation?: NonNullable<NavigationMenuVariantProps['orientation']>

    /**
     * Enable accordion mode (only affects orientation="vertical").
     * If true, only one group can be open at a time.
     * @default false
     */
    accordion?: boolean

    /**
     * Additional CSS classes.
     */
    class?: ClassNameValue

    /**
     * Override specific slot classes.
     */
    ui?: Partial<Record<NavigationMenuSlots, ClassNameValue>>

    /**
     * Custom snippet for rendering the entire list.
     * Overrides `items` if provided.
     */
    children?: Snippet
}
