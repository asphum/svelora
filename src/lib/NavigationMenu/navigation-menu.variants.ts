import { tv, type VariantProps } from 'tailwind-variants'

export const navigationMenuVariants = tv({
    slots: {
        base: 'flex items-center gap-1',
        item: [
            'group relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50'
        ],
        icon: 'text-lg shrink-0 transition-colors',
        chevron: 'text-base opacity-50 shrink-0 transition-transform group-data-[state=open]:rotate-180'
    },
    variants: {
        variant: {
            default: {
                item: [
                    'text-on-surface-variant hover:bg-surface-container hover:text-on-surface',
                    'data-[state=open]:bg-surface-container data-[state=open]:text-on-surface'
                ],
                icon: 'text-on-surface-variant group-hover:text-on-surface group-data-[state=open]:text-on-surface'
            },
            ghost: {
                item: [
                    'text-on-surface hover:bg-primary/10 hover:text-primary',
                    'data-[state=open]:bg-primary/10 data-[state=open]:text-primary'
                ],
                icon: 'text-on-surface-variant group-hover:text-primary group-data-[state=open]:text-primary'
            }
        },
        active: {
            true: {
                item: 'bg-primary/10 text-primary font-semibold',
                icon: 'text-primary'
            },
            false: {}
        }
    },
    defaultVariants: {
        variant: 'default',
        active: false
    }
})

export type NavigationMenuVariantProps = VariantProps<typeof navigationMenuVariants>
export type NavigationMenuSlots = keyof ReturnType<typeof navigationMenuVariants>
