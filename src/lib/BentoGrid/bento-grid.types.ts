import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * The cards to render inside the grid.
     */
    children?: Snippet
}

export interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Title of the card.
     */
    name: string

    /**
     * Description text.
     */
    description?: string

    /**
     * Icon name.
     */
    icon?: string

    /**
     * The href to navigate to when the call-to-action is clicked.
     */
    href?: string

    /**
     * Text for the call-to-action button.
     * @default 'Learn more'
     */
    cta?: string

    /**
     * Additional CSS classes. Useful for setting grid column/row spans (e.g. `col-span-2`).
     */
    class?: string

    /**
     * Snippet for background visual elements (e.g. gradients, images).
     */
    background?: Snippet

    /**
     * Snippet for overriding or extending the action area.
     */
    actionSnippet?: Snippet
}
