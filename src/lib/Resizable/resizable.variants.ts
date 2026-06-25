import { tv, type VariantProps } from 'tailwind-variants'

export const resizableVariants = tv({
    slots: {
        base: 'relative overflow-auto border border-outline-variant bg-surface-50 dark:bg-surface-900',
        handle: 'absolute right-0 bottom-0 w-4 h-4 cursor-se-resize flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'
    },
    variants: {
        direction: {
            horizontal: { base: 'resize-x' },
            vertical: { base: 'resize-y' },
            both: { base: 'resize' }
        }
    },
    defaultVariants: {
        direction: 'both'
    }
})

export type ResizableVariantProps = VariantProps<typeof resizableVariants>
