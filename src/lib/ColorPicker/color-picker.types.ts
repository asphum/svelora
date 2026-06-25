import type { HTMLAttributes } from 'svelte/elements'

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
    /**
     * The bound color value (Hex format).
     * @default '#000000'
     */
    value?: string

    /**
     * Placeholder text when no color is selected.
     * @default 'Select color'
     */
    placeholder?: string

    /**
     * Array of predefined color swatches.
     */
    swatches?: string[]

    /**
     * Whether the color picker is disabled.
     * @default false
     */
    disabled?: boolean

    /**
     * Additional CSS classes.
     */
    class?: string
}
