import type { HTMLAttributes } from 'svelte/elements'
import type { RatingVariantProps } from './rating.variants.js'

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
    /**
     * The current rating value.
     */
    value?: number

    /**
     * The maximum rating value (number of stars).
     * @default 5
     */
    max?: number

    /**
     * Size of the stars.
     * @default 'md'
     */
    size?: RatingVariantProps['size']

    /**
     * Whether the rating allows half-star selection.
     * @default false
     */
    allowHalf?: boolean

    /**
     * Whether the rating is disabled.
     */
    disabled?: boolean

    /**
     * Whether the rating is read-only (cannot be changed by user).
     */
    readonly?: boolean

    /**
     * Icon to use for the full star.
     * @default 'lucide:star'
     */
    iconFull?: string

    /**
     * Icon to use for the empty star.
     * @default 'lucide:star'
     */
    iconEmpty?: string

    /**
     * Color class for the active/filled stars.
     * @default 'text-warning-500 fill-warning-500'
     */
    activeColor?: string

    /**
     * Color class for the inactive/empty stars.
     * @default 'text-surface-300 dark:text-surface-600'
     */
    inactiveColor?: string

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Event fired when the rating changes.
     */
    onchange?: (value: number) => void
}
