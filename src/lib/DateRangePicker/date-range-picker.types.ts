import type { HTMLAttributes } from 'svelte/elements'
import type { DateValue } from '@internationalized/date'

export interface DateRange {
    start: DateValue | undefined
    end: DateValue | undefined
}

export interface DateRangePickerProps
    extends Omit<HTMLAttributes<HTMLButtonElement>, 'value' | 'onchange'> {
    /**
     * The selected date range.
     */
    value?: DateRange

    /**
     * Placeholder text when no dates are selected.
     * @default 'Select date range'
     */
    placeholder?: string

    /**
     * Number of months to display side-by-side.
     * @default 2
     */
    numberOfMonths?: number

    /**
     * Whether the picker is disabled.
     */
    disabled?: boolean

    /**
     * Additional CSS classes for the trigger button.
     */
    class?: string

    /**
     * Event fired when the date range changes.
     */
    onchange?: (value: DateRange) => void
}
