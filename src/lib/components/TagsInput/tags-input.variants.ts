import { tv, type VariantProps } from 'tailwind-variants'

export const tagsInputVariants = tv({
    slots: {
        base: 'flex flex-wrap items-center gap-2 p-2 w-full rounded-md border border-outline-variant bg-surface-50 dark:bg-surface-900 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-colors cursor-text',
        tag: 'flex items-center gap-1 px-2.5 py-1 text-sm rounded-full bg-surface-200 dark:bg-surface-800 text-surface-900 dark:text-surface-50',
        tagText: 'truncate max-w-[150px]',
        removeButton:
            'flex items-center justify-center w-4 h-4 rounded-full hover:bg-surface-300 dark:hover:bg-surface-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
        input: 'flex-1 min-w-[120px] bg-transparent border-0 outline-none focus:ring-0 text-sm text-surface-900 dark:text-surface-50 placeholder:text-surface-500 dark:placeholder:text-surface-400 p-1'
    },
    variants: {
        disabled: {
            true: {
                base: 'opacity-50 cursor-not-allowed',
                input: 'cursor-not-allowed',
                removeButton: 'pointer-events-none'
            }
        }
    },
    defaultVariants: {
        disabled: false
    }
})

export type TagsInputVariantProps = VariantProps<typeof tagsInputVariants>
