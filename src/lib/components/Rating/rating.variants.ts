import { tv, type VariantProps } from 'tailwind-variants'

export const ratingVariants = tv({
    slots: {
        base: 'flex items-center gap-1',
        starWrapper:
            'relative cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full',
        star: 'transition-colors duration-200'
    },
    variants: {
        size: {
            sm: { star: 'w-4 h-4' },
            md: { star: 'w-5 h-5' },
            lg: { star: 'w-6 h-6' },
            xl: { star: 'w-8 h-8' }
        },
        disabled: {
            true: {
                base: 'opacity-50 cursor-not-allowed',
                starWrapper: 'cursor-not-allowed hover:scale-100'
            }
        },
        readonly: {
            true: {
                starWrapper: 'cursor-default hover:scale-100'
            }
        }
    },
    defaultVariants: {
        size: 'md',
        disabled: false,
        readonly: false
    }
})

export type RatingVariantProps = VariantProps<typeof ratingVariants>
