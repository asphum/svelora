import { tv, type VariantProps } from 'tailwind-variants'

export const passwordInputVariants = tv({
    slots: {
        root: 'flex flex-col gap-2 w-full',
        inputWrapper: 'relative flex items-center w-full',
        toggleBtn: [
            'absolute end-0 inset-y-0 flex items-center justify-center',
            'text-on-surface-variant/75 hover:text-on-surface',
            'focus:outline-none focus-visible:ring-2 rounded-sm',
            'transition-colors select-none'
        ],
        toggleIcon: 'shrink-0',
        meterWrapper: 'flex items-center gap-1 w-full mt-1',
        meterSegment: 'flex-1 rounded-full transition-colors duration-300',
        meterIcon: 'shrink-0 transition-colors duration-300',
        strengthText: 'text-xs text-on-surface-variant mt-1 text-right',
        // maskOverlay covers the transparent input text with icon rows.
        // ps-* aligns with the input's own horizontal padding;
        // end-* stops before the toggle button.
        maskOverlay: [
            'absolute inset-y-0 start-0 flex items-center',
            'gap-0.5 overflow-hidden pointer-events-none select-none'
        ],
        maskIconItem: 'shrink-0 text-on-surface/80'
    },
    variants: {
        // ==================== SIZE ====================
        size: {
            xs: {
                toggleBtn: 'w-7',
                toggleIcon: 'size-3.5',
                meterSegment: 'h-1',
                meterIcon: 'size-3',
                maskOverlay: 'ps-2 end-7',
                maskIconItem: 'size-2'
            },
            sm: {
                toggleBtn: 'w-8',
                toggleIcon: 'size-4',
                meterSegment: 'h-1.5',
                meterIcon: 'size-3.5',
                maskOverlay: 'ps-2.5 end-8',
                maskIconItem: 'size-2.5'
            },
            md: {
                toggleBtn: 'w-9',
                toggleIcon: 'size-5',
                meterSegment: 'h-1.5',
                meterIcon: 'size-4',
                maskOverlay: 'ps-3 end-9',
                maskIconItem: 'size-3'
            },
            lg: {
                toggleBtn: 'w-10',
                toggleIcon: 'size-5',
                meterSegment: 'h-2',
                meterIcon: 'size-5',
                maskOverlay: 'ps-4 end-10',
                maskIconItem: 'size-3.5'
            },
            xl: {
                toggleBtn: 'w-12',
                toggleIcon: 'size-6',
                meterSegment: 'h-2',
                meterIcon: 'size-6',
                maskOverlay: 'ps-5 end-12',
                maskIconItem: 'size-4'
            }
        },

        // ==================== COLOR ====================
        // Controls the toggle button's focus ring color to match the input's color.
        color: {
            primary: { toggleBtn: 'focus-visible:ring-primary' },
            secondary: { toggleBtn: 'focus-visible:ring-secondary' },
            tertiary: { toggleBtn: 'focus-visible:ring-tertiary' },
            success: { toggleBtn: 'focus-visible:ring-success' },
            warning: { toggleBtn: 'focus-visible:ring-warning' },
            error: { toggleBtn: 'focus-visible:ring-error' },
            info: { toggleBtn: 'focus-visible:ring-info' },
            surface: { toggleBtn: 'focus-visible:ring-surface-foreground' }
        },

        // ==================== VARIANT ====================
        // Kept for API symmetry with <Input>; visual differences are handled by
        // the inner <Input> component. PasswordInput-level slots have no
        // variant-specific styling by default.
        variant: {
            outline: {},
            soft: {},
            subtle: {},
            ghost: {},
            none: {}
        }
    },
    defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
    }
})

export type PasswordInputVariantProps = VariantProps<typeof passwordInputVariants>
export type PasswordInputSlots = keyof ReturnType<typeof passwordInputVariants>

export const passwordInputDefaults = {
    defaultVariants: {
        ...passwordInputVariants.defaultVariants
    },
    slots: {} as Partial<Record<PasswordInputSlots, string>>
}
