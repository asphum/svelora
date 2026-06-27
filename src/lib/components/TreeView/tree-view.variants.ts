import { tv, type VariantProps } from 'tailwind-variants'

export const treeViewVariants = tv({
    slots: {
        root: 'flex flex-col text-sm',
        item: 'flex flex-col',
        itemRow:
            'flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer select-none transition-colors text-surface-900 dark:text-surface-50',
        itemRowActive:
            'bg-primary-50 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100',
        itemRowDisabled:
            'opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent',
        chevronWrapper:
            'flex items-center justify-center w-5 h-5 shrink-0 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors',
        chevron: 'w-4 h-4 transition-transform duration-200',
        icon: 'w-4 h-4 shrink-0 text-surface-500 dark:text-surface-400',
        label: 'truncate flex-1',
        childrenWrapper: 'flex flex-col pl-4 ml-2.5 border-l border-outline-variant/50 mt-1'
    },
    variants: {
        size: {
            sm: {
                itemRow: 'py-1 text-xs',
                chevron: 'w-3 h-3',
                icon: 'w-3 h-3'
            },
            md: {
                itemRow: 'py-1.5 text-sm'
            }
        }
    },
    defaultVariants: {
        size: 'md'
    }
})

export type TreeViewVariantProps = VariantProps<typeof treeViewVariants>
