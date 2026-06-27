import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ScrollAreaVariantProps } from './scroll-area.variants.js'

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Orientation of the scrolling area.
     * @default 'vertical'
     */
    orientation?: ScrollAreaVariantProps['orientation']

    /**
     * Whether to hide the scrollbar track/thumb completely while still allowing scrolling.
     * @default false
     */
    hideScrollbar?: boolean

    /**
     * Additional CSS classes for the root container.
     */
    class?: string

    /**
     * Additional CSS classes for the viewport (the scrollable area).
     */
    viewportClass?: string

    /**
     * Content to be scrolled.
     */
    children?: Snippet
}
