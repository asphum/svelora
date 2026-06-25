import type { HTMLAttributes } from 'svelte/elements'

export interface NumberTickerProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * The target number to animate to.
     */
    value: number

    /**
     * Duration of the animation in milliseconds.
     * @default 2000
     */
    duration?: number

    /**
     * Whether to show decimal places.
     * @default 0
     */
    decimals?: number

    /**
     * Start delay in milliseconds.
     * @default 0
     */
    delay?: number

    /**
     * Additional CSS classes.
     */
    class?: string
}
