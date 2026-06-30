import { tv, type VariantProps } from 'tailwind-variants'

export const inputNumberVariants = tv({
    slots: {
        root: 'inline-flex items-center gap-1',
        input: [
            'w-full rounded-md border-0 bg-surface text-on-surface text-center',
            'disabled:cursor-not-allowed disabled:opacity-75',
            'transition-colors',
            'focus:outline-none',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        ],
        button: [
            'shrink-0 inline-flex items-center justify-center rounded-md',
            'bg-surface-container text-on-surface',
            'hover:bg-surface-container-highest',
            'disabled:cursor-not-allowed disabled:opacity-75',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            'transition-colors select-none'
        ]
    },
    variants: {
        color: {
            primary: {
                input: 'ring ring-inset ring-outline-variant focus:ring-2 focus:ring-primary'
            },
            secondary: {
                input: 'ring ring-inset ring-outline-variant focus:ring-2 focus:ring-secondary'
            },
            tertiary: {
                input: 'ring ring-inset ring-outline-variant focus:ring-2 focus:ring-tertiary'
            },
            success: {
                input: 'ring ring-inset ring-outline-variant focus:ring-2 focus:ring-success'
            },
            warning: {
                input: 'ring ring-inset ring-outline-variant focus:ring-2 focus:ring-warning'
            },
            error: {
                input: 'ring ring-inset ring-outline-variant focus:ring-2 focus:ring-error'
            }
        },
        size: {
            xs: {
                input: 'px-2 py-1 text-xs rounded',
                button: 'size-6 text-xs rounded'
            },
            sm: {
                input: 'px-2.5 py-1.5 text-xs rounded-md',
                button: 'size-7 text-xs rounded-md'
            },
            md: {
                input: 'px-3 py-2 text-sm rounded-md',
                button: 'size-8 text-sm rounded-md'
            },
            lg: {
                input: 'px-4 py-2.5 text-sm rounded-md',
                button: 'size-9 text-sm rounded-md'
            },
            xl: {
                input: 'px-5 py-3 text-base rounded-lg',
                button: 'size-10 text-base rounded-lg'
            }
        },
        highlight: {
            true: {}
        }
    },
    compoundVariants: [
        { highlight: true, color: 'primary', class: { input: 'ring-2 ring-inset ring-primary' } },
        {
            highlight: true,
            color: 'secondary',
            class: { input: 'ring-2 ring-inset ring-secondary' }
        },
        { highlight: true, color: 'tertiary', class: { input: 'ring-2 ring-inset ring-tertiary' } },
        { highlight: true, color: 'success', class: { input: 'ring-2 ring-inset ring-success' } },
        { highlight: true, color: 'warning', class: { input: 'ring-2 ring-inset ring-warning' } },
        { highlight: true, color: 'error', class: { input: 'ring-2 ring-inset ring-error' } }
    ],
    defaultVariants: {
        color: 'primary',
        size: 'md'
    }
})

export type InputNumberVariantProps = VariantProps<typeof inputNumberVariants>
export type InputNumberSlots = keyof ReturnType<typeof inputNumberVariants>

export const inputNumberDefaults = {
    defaultVariants: inputNumberVariants.defaultVariants,
    slots: {} as Partial<Record<InputNumberSlots, string>>
}
