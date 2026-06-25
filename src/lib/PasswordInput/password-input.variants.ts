import { tv, type VariantProps } from 'tailwind-variants'

export const passwordInputVariants = tv({
    slots: {
        wrapper: 'relative flex flex-col gap-2 w-full',
        inputWrapper: 'relative flex items-center w-full',
        toggleBtn:
            'absolute right-3 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm transition-colors',
        meterWrapper: 'flex gap-1 h-1.5 w-full mt-1',
        meterSegment: 'flex-1 rounded-full transition-colors duration-300',
        strengthText: 'text-xs text-surface-500 dark:text-surface-400 mt-1 text-right'
    }
})

export type PasswordInputVariantProps = VariantProps<typeof passwordInputVariants>
