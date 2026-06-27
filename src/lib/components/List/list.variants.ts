import { tv, type VariantProps } from 'tailwind-variants'

export const listVariants = tv({
    slots: {
        base: 'flex flex-col w-full text-surface-900 dark:text-surface-50',
        item: 'flex items-center justify-between w-full px-4 py-3',
        itemContent: 'flex flex-col flex-1 min-w-0',
        itemTitle: 'text-sm font-medium truncate',
        itemDescription: 'text-xs text-surface-500 dark:text-surface-400 truncate mt-0.5',
        leading: 'mr-3 shrink-0 flex items-center justify-center',
        trailing:
            'ml-3 shrink-0 flex items-center justify-center text-surface-500 dark:text-surface-400'
    },
    variants: {
        variant: {
            default: {
                base: ''
            },
            bordered: {
                base: 'border border-outline-variant rounded-lg overflow-hidden',
                item: 'border-b border-outline-variant last:border-b-0'
            },
            separated: {
                base: 'gap-2',
                item: 'rounded-lg border border-outline-variant'
            }
        },
        interactive: {
            true: {
                item: 'transition-colors hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer active:bg-surface-200 dark:active:bg-surface-700'
            }
        },
        disabled: {
            true: {
                item: 'opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent active:bg-transparent dark:active:bg-transparent'
            }
        }
    },
    defaultVariants: {
        variant: 'default',
        interactive: false,
        disabled: false
    }
})

export type ListVariantProps = VariantProps<typeof listVariants>
