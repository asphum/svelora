import { tv, type VariantProps } from 'tailwind-variants'

export const menuVariants = tv({
    slots: {
        base: 'flex flex-col gap-1 w-full',
        group: 'flex flex-col w-full',
        groupTrigger: [
            'flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md',
            'transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-outline',
            'text-on-surface hover:bg-surface-container-highest',
            'disabled:opacity-50 disabled:cursor-not-allowed'
        ],
        groupTriggerActive: 'bg-primary-container text-on-primary-container',
        groupContent: 'flex flex-col gap-1 pl-4 mt-1',
        item: [
            'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md',
            'transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-outline',
            'text-on-surface hover:bg-surface-container-highest',
            'disabled:opacity-50 disabled:cursor-not-allowed'
        ],
        itemActive: 'bg-primary-container text-on-primary-container hover:bg-primary-container/90',
        icon: 'size-5 mr-3 shrink-0',
        chevron: 'size-4 shrink-0 transition-transform duration-200'
    },
    variants: {
        variant: {
            default: {}
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export type MenuVariantProps = VariantProps<typeof menuVariants>
export type MenuSlots = keyof typeof menuVariants.slots
