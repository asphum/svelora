import { tv, type VariantProps } from 'tailwind-variants'

export const cardVariants = tv({
    slots: {
        root: 'rounded-lg overflow-hidden',
        header: 'p-3 sm:px-5',
        body: 'p-3 sm:p-5',
        footer: 'p-3 sm:px-5'
    },
    variants: {
        variant: {
            solid: {
                root: 'bg-inverse-surface text-inverse-on-surface'
            },
            outline: {
                root: 'bg-surface ring ring-outline-variant divide-y divide-outline-variant'
            },
            soft: {
                root: 'bg-surface-container divide-y divide-outline-variant'
            },
            subtle: {
                root: 'bg-surface-container ring ring-outline-variant divide-y divide-outline-variant'
            }
        }
    },
    defaultVariants: {
        variant: 'outline'
    }
})

export type CardVariantProps = VariantProps<typeof cardVariants>
export type CardSlots = keyof ReturnType<typeof cardVariants>

export const cardDefaults = {
    defaultVariants: cardVariants.defaultVariants,
    slots: {} as Partial<Record<CardSlots, string>>
}
