import { tv, type VariantProps } from 'tailwind-variants'

export const dateRangePickerVariants = tv({
    slots: {
        trigger:
            'flex w-full items-center justify-between gap-2 px-3 py-2 text-sm text-left border border-outline-variant bg-surface-50 dark:bg-surface-900 rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
        triggerText: 'truncate flex-1',
        icon: 'w-4 h-4 shrink-0 text-surface-500',
        popoverContent:
            'w-auto p-3 bg-surface-50 dark:bg-surface-900 border border-outline-variant rounded-md shadow-md',
        calendarWrapper: 'flex flex-col sm:flex-row gap-4'
    },
    variants: {
        disabled: {
            true: {
                trigger: 'opacity-50 cursor-not-allowed pointer-events-none'
            }
        }
    },
    defaultVariants: {
        disabled: false
    }
})

export type DateRangePickerVariantProps = VariantProps<typeof dateRangePickerVariants>
