import { tv, type VariantProps } from 'tailwind-variants'
import type { InputVariantProps } from '../Input/input.variants.js'

export const passwordInputVariants = tv({
    slots: {
        root: 'flex flex-col gap-2 w-full',
        inputWrapper: 'relative flex items-center w-full',
        toggleBtn: [
            'absolute end-0 inset-y-0 flex items-center justify-center',
            'text-on-surface-variant/75 hover:text-on-surface',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm',
            'transition-colors select-none'
        ],
        toggleIcon: 'shrink-0',
        meterWrapper: 'flex gap-1 h-1.5 w-full mt-1',
        meterSegment: 'flex-1 rounded-full transition-colors duration-300',
        strengthText: 'text-xs text-on-surface-variant mt-1 text-right'
    },
    variants: {
        size: {
            xs: {
                toggleBtn: 'w-7',
                toggleIcon: 'size-3.5'
            },
            sm: {
                toggleBtn: 'w-8',
                toggleIcon: 'size-4'
            },
            md: {
                toggleBtn: 'w-9',
                toggleIcon: 'size-5'
            },
            lg: {
                toggleBtn: 'w-10',
                toggleIcon: 'size-5'
            },
            xl: {
                toggleBtn: 'w-12',
                toggleIcon: 'size-6'
            }
        }
    },
    defaultVariants: {
        size: 'md'
    }
})

export type PasswordInputVariantProps = VariantProps<typeof passwordInputVariants>
export type PasswordInputSlots = keyof ReturnType<typeof passwordInputVariants>

export const passwordInputDefaults = {
    defaultVariants: {
        ...passwordInputVariants.defaultVariants,
        variant: 'outline' as NonNullable<InputVariantProps['variant']>,
        color: 'primary' as NonNullable<InputVariantProps['color']>
    },
    slots: {} as Partial<Record<PasswordInputSlots, string>>
}
