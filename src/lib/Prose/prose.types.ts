import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ProseVariantProps } from './prose.variants.js'

export interface ProseProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Size of the typography text.
     * @default 'base'
     */
    size?: ProseVariantProps['size']

    /**
     * Html string to render. Usually coming from a markdown parser.
     */
    html?: string

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Content inside the prose container.
     */
    children?: Snippet
}
