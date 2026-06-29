import type { HTMLAttributes } from 'svelte/elements'
import type { ClassNameValue } from 'tailwind-merge'
import type { RatingSlots, RatingVariantProps } from './rating.variants.js'

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
     * Visual style of the stars.
     * @default 'solid'
     */
    variant?: NonNullable<RatingVariantProps['variant']>

    /**
     * Color scheme for active stars.
     * @default 'warning'
     */
    color?: NonNullable<RatingVariantProps['color']>

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
     * Icon for active/full stars. Defaults based on `variant`.
     */
    iconFull?: string

    /**
     * Icon for inactive/empty stars. Defaults based on `variant`.
     */
    iconEmpty?: string

    /**
     * Override styles for specific rating slots.
     */
    ui?: Partial<Record<RatingSlots, ClassNameValue>>

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Event fired when the rating changes.
     */
    onchange?: (value: number) => void
}
