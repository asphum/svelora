import { tv, type VariantProps } from 'tailwind-variants'

export const ratingVariants = tv({
    slots: {
        base: 'flex items-center gap-1',
        starWrapper:
            'relative cursor-pointer transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full',
        starFull: 'transition-colors duration-200',
        starEmpty: 'transition-colors duration-200'
    },
    variants: {
        variant: {
            solid: '',
            outline: ''
        },
        color: {
            primary: '',
            secondary: '',
            tertiary: '',
            success: '',
            warning: '',
            error: '',
            info: '',
            surface: ''
        },
        size: {
            sm: { starFull: 'w-4 h-4', starEmpty: 'w-4 h-4' },
            md: { starFull: 'w-5 h-5', starEmpty: 'w-5 h-5' },
            lg: { starFull: 'w-6 h-6', starEmpty: 'w-6 h-6' },
            xl: { starFull: 'w-8 h-8', starEmpty: 'w-8 h-8' }
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
    compoundVariants: [
        // ========== SOLID ==========
        {
            variant: 'solid',
            color: 'primary',
            class: { starFull: 'text-primary', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'secondary',
            class: { starFull: 'text-secondary', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'tertiary',
            class: { starFull: 'text-tertiary', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'success',
            class: { starFull: 'text-success', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'warning',
            class: { starFull: 'text-warning', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'error',
            class: { starFull: 'text-error', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'info',
            class: { starFull: 'text-info', starEmpty: 'text-outline-variant' }
        },
        {
            variant: 'solid',
            color: 'surface',
            class: { starFull: 'text-on-surface', starEmpty: 'text-outline-variant' }
        },

        // ========== OUTLINE ==========
        {
            variant: 'outline',
            color: 'primary',
            class: {
                starFull: 'text-primary stroke-primary',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'secondary',
            class: {
                starFull: 'text-secondary stroke-secondary',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'tertiary',
            class: {
                starFull: 'text-tertiary stroke-tertiary',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'success',
            class: {
                starFull: 'text-success stroke-success',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'warning',
            class: {
                starFull: 'text-warning stroke-warning',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'error',
            class: {
                starFull: 'text-error stroke-error',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'info',
            class: {
                starFull: 'text-info stroke-info',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        },
        {
            variant: 'outline',
            color: 'surface',
            class: {
                starFull: 'text-on-surface stroke-on-surface',
                starEmpty: 'fill-none text-outline-variant stroke-outline-variant'
            }
        }
    ],
    defaultVariants: {
        variant: 'solid',
        color: 'warning',
        size: 'md',
        disabled: false,
        readonly: false
    }
})

export type RatingVariantProps = VariantProps<typeof ratingVariants>
export type RatingSlots = keyof ReturnType<typeof ratingVariants>

export const ratingDefaults = {
    defaultVariants: ratingVariants.defaultVariants,
    slots: {} as Partial<Record<RatingSlots, string>>
}
