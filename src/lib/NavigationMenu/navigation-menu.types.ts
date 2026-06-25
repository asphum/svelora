import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { DropdownMenuItem } from '../DropdownMenu/dropdown-menu.types.js'
import type { BadgeProps } from '../Badge/badge.types.js'
import type { NavigationMenuVariantProps, NavigationMenuSlots } from './navigation-menu.variants.js'

export type NavigationMenuItemType = {
    /**
     * Text label for the item.
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
     * Sub-items for this menu item (Svelora standard).
     * If provided, the item renders as a dropdown trigger.
     */
    items?: DropdownMenuItem[]

    /**
     * Alias for sub-items (Nuxt UI style compatibility).
     */
    children?: DropdownMenuItem[]

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
