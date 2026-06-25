import type { Snippet } from 'svelte'
import type { HTMLAttributes, HTMLLiAttributes } from 'svelte/elements'
import type { ListVariantProps } from './list.variants.js'

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    /**
     * The variant of the list.
     * @default 'default'
     */
    variant?: ListVariantProps['variant']

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Content of the list.
     */
    children?: Snippet
}

export interface ListItemProps extends HTMLLiAttributes {
    /**
     * Title of the list item.
     */
    title?: string

    /**
     * Description below the title.
     */
    description?: string

    /**
     * Whether the item is interactive (hover/active states).
     * @default false
     */
    interactive?: boolean

    /**
     * Whether the item is disabled.
     * @default false
     */
    disabled?: boolean

    /**
     * Optional href. If provided, the item renders as an anchor tag `<a>`.
     */
    href?: string

    /**
     * Target attribute for the anchor tag if `href` is provided.
     */
    target?: string

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Snippet for the leading section (e.g., Avatar, Icon).
     */
    leading?: Snippet

    /**
     * Snippet for the trailing section (e.g., Badge, Chevron, Switch).
     */
    trailing?: Snippet

    /**
     * Snippet to replace the default title/description content completely.
     */
    children?: Snippet
}
