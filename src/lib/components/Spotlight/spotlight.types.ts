import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the spotlight in pixels.
     * @default 400
     */
    size?: number

    /**
     * Color of the spotlight in rgba, hex, or CSS variable.
     * @default 'rgba(255, 255, 255, 0.1)'
     */
    color?: string

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Content to render inside the spotlight container.
     */
    children?: Snippet
}
