import { tv, type VariantProps } from 'tailwind-variants'

export const sidebarVariants = tv({
    slots: {
        base: 'flex flex-col h-full bg-surface-50 dark:bg-surface-900 border-outline-variant text-surface-900 dark:text-surface-50 transition-all duration-300',
        header: 'flex items-center px-4 h-16 shrink-0 border-b border-outline-variant',
        content: 'flex-1 overflow-y-auto px-3 py-4',
        footer: 'p-4 mt-auto border-t border-outline-variant shrink-0'
    },
    variants: {
        position: {
            left: { base: 'border-r' },
            right: { base: 'border-l' }
        },
        collapsed: {
            true: { base: 'w-16' },
            false: { base: 'w-64' }
        }
    },
    defaultVariants: {
        position: 'left',
        collapsed: false
    }
})

export type SidebarVariantProps = VariantProps<typeof sidebarVariants>
