import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { MarqueeVariantProps } from './marquee.variants.js'

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Direction of the marquee animation.
     * @default 'left'
     */
    direction?: MarqueeVariantProps['direction']

    /**
     * Whether to pause the animation when hovered.
     * @default false
     */
    pauseOnHover?: boolean

    /**
     * Duration of the animation loop (e.g. '20s', '40s').
     * @default '40s'
     */
    duration?: string

    /**
     * Gap between items.
     * @default '1rem'
     */
    gap?: string

    /**
     * How many times to repeat the content. To ensure smooth looping, it should be at least 2.
     * @default 2
     */
    repeat?: number

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * The content to scroll.
     */
    children?: Snippet
}
