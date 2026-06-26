import { tv, type VariantProps } from 'tailwind-variants'

export const sidebarVariants = tv({
    slots: {
        base: 'flex flex-col h-full bg-surface-container-low border-outline-variant/60 text-on-surface transition-[width] duration-300 ease-in-out',
        header: 'flex items-center shrink-0 border-b border-outline-variant/60 transition-[padding] duration-300 h-16',
        content: 'flex-1 overflow-y-auto py-4 transition-[padding] duration-300',
        footer: 'mt-auto border-t border-outline-variant/60 shrink-0 transition-[padding] duration-300'
    },
    variants: {
        position: {
            left: { base: 'border-r' },
            right: { base: 'border-l' }
        },
        collapsed: {
            true: { 
                base: 'w-[64px]',
                header: 'px-3 justify-center',
                content: 'px-3 flex flex-col items-center',
                footer: 'p-3 flex flex-col items-center justify-center gap-4'
            },
            false: { 
                base: 'w-64',
                header: 'px-4',
                content: 'px-3',
                footer: 'p-4'
            }
        }
    },
    defaultVariants: {
        position: 'left',
        collapsed: false
    }
})

export type SidebarVariantProps = VariantProps<typeof sidebarVariants>
