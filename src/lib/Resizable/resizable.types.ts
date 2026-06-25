import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ResizableVariantProps } from './resizable.variants.js'

export interface ResizableProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The direction in which the element can be resized.
     * @default 'both'
     */
    direction?: ResizableVariantProps['direction']

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Content inside the resizable container.
     */
    children?: Snippet
}
