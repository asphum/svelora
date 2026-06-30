import type { HTMLInputAttributes } from 'svelte/elements'
import type { ClassNameValue } from 'tailwind-merge'
import type { InputNumberSlots, InputNumberVariantProps } from './inputNumber.variants.js'

export type InputNumberProps = Omit<HTMLInputAttributes, 'type' | 'size' | 'class'> & {
    /**
     * Bindable reference to the root DOM element.
     */
    ref?: HTMLDivElement | null

    /**
     * Current numeric value (two-way bindable).
     * @default 0
     */
    value?: number

    /**
     * Minimum allowed value.
     */
    min?: number

    /**
     * Maximum allowed value.
     */
    max?: number

    /**
     * Step size for increment/decrement buttons.
     * @default 1
     */
    step?: number

    /**
     * Color variant controlling the focus ring.
     * @default 'primary'
     */
    color?: NonNullable<InputNumberVariantProps['color']>

    /**
     * Size variant controlling padding and font size.
     * @default 'md'
     */
    size?: NonNullable<InputNumberVariantProps['size']>

    /**
     * Whether the input is disabled.
     * @default false
     */
    disabled?: boolean

    /**
     * Placeholder text for the input.
     */
    placeholder?: string

    /**
     * Highlight the input with a colored ring (e.g. for error states).
     * @default false
     */
    highlight?: boolean

    /**
     * Additional CSS class for the root element.
     */
    class?: ClassNameValue

    /**
     * Override styles for specific slots.
     */
    ui?: Partial<Record<InputNumberSlots, ClassNameValue>>
}
