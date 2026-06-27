import { tv, type VariantProps } from 'tailwind-variants'

export const navigationMenuVariants = tv({
    slots: {
        base: 'flex',
        group: 'flex',
        item: [
            'group relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50'
        ],
        icon: 'text-lg shrink-0 transition-colors',
        chevron:
            'text-base opacity-50 shrink-0 transition-transform group-data-[state=open]:rotate-180',
        accordionGroupContent: 'flex flex-col gap-1 pl-4 mt-1',
        accordionTrigger: [
            'flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md',
            'transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-outline',
            'text-on-surface hover:bg-surface-container-highest',
            'disabled:opacity-50 disabled:cursor-not-allowed'
        ]
    },
    variants: {
        orientation: {
            horizontal: {
                base: 'flex-row items-center justify-between w-full gap-4',
                group: 'flex-row items-center gap-1',
                item: ''
            },
            vertical: {
                base: 'flex-col w-full gap-4',
                group: 'flex-col gap-1 w-full',
                item: 'w-full justify-start'
            }
        },
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
                icon: 'text-primary',
                accordionTrigger: 'bg-primary-container text-on-primary-container'
            },
            false: {}
        },
        collapsed: {
            true: {
                item: 'w-10 h-10 justify-center p-0 aspect-square shrink-0',
                icon: 'text-[1.25rem] m-0'
            }
        },
        tree: {
            true: {
                accordionGroupContent: 'pl-2 ml-6 border-l border-outline-variant/50 relative'
            },
            false: {}
        }
    },
    compoundVariants: [
        {
            active: true,
            tree: true,
            class: {
                item: 'border-primary',
                accordionTrigger: 'border-primary bg-primary/10 text-primary'
            }
        }
    ],
    defaultVariants: {
        variant: 'default',
        active: false,
        orientation: 'horizontal',
        tree: false
    }
})

export type NavigationMenuVariantProps = VariantProps<typeof navigationMenuVariants>
export type NavigationMenuSlots = keyof ReturnType<typeof navigationMenuVariants>
