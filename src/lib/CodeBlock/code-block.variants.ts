import { tv, type VariantProps } from 'tailwind-variants'

export const codeBlockVariants = tv({
    slots: {
        root: 'mt-4 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container',
        header: 'flex items-center justify-between border-b border-outline-variant',
        title: 'text-sm font-medium text-on-surface-variant',
        button: 'rounded-md border border-outline-variant text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-highest disabled:cursor-not-allowed disabled:opacity-50',
        body: 'bg-surface-container-highest [&_.shiki]:rounded-none [&_.shiki]:overflow-x-auto [&_.shiki]:m-0'
    },
    variants: {
        variant: {
            outline: {
                root: 'border border-outline-variant bg-surface-container',
                header: 'border-outline-variant',
                button: 'border-outline-variant'
            },
            soft: {
                root: 'border border-outline-variant/60 bg-surface-container/40',
                header: 'border-outline-variant/60',
                button: 'border-outline-variant/60'
            },
            subtle: {
                root: 'border border-outline-variant/40 bg-surface-container/20',
                header: 'border-outline-variant/40',
                button: 'border-outline-variant/40'
            },
            solid: {
                root: 'border border-outline-variant/60 bg-surface-container-high',
                header: 'border-outline-variant/60',
                button: 'border-outline-variant/60'
            },
            ghost: {
                root: 'border border-transparent bg-transparent',
                header: 'border-outline-variant/30',
                button: 'border-outline-variant/30'
            },
            none: {
                root: 'border-0 bg-transparent rounded-none',
                header: 'border-0 px-0',
                button: 'border-outline-variant/40'
            }
        },
        size: {
            sm: {
                header: 'px-3 py-2',
                button: 'px-2 py-1',
                body: '[&_.shiki]:p-3 [&_.shiki]:text-xs [&_.shiki]:leading-5'
            },
            md: {
                header: 'px-4 py-3',
                button: 'px-2.5 py-1',
                body: '[&_.shiki]:p-4 [&_.shiki]:text-sm [&_.shiki]:leading-6'
            },
            lg: {
                header: 'px-5 py-4',
                button: 'px-3 py-1.5',
                body: '[&_.shiki]:p-5 [&_.shiki]:text-sm [&_.shiki]:leading-6'
            }
        }
    },
    defaultVariants: {
        variant: 'outline',
        size: 'md'
    }
})

export type CodeBlockVariantProps = VariantProps<typeof codeBlockVariants>
export type CodeBlockSlots = keyof ReturnType<typeof codeBlockVariants>

export const codeBlockDefaults = {
    defaultVariants: codeBlockVariants.defaultVariants,
    slots: {} as Partial<Record<CodeBlockSlots, string>>
}

