import { tv, type VariantProps } from 'tailwind-variants'

export const chatVariants = tv({
    slots: {
        bubbleBase: 'flex w-full gap-3 py-2',
        bubbleAvatar: 'shrink-0 mt-1',
        bubbleContent: 'flex flex-col gap-1 min-w-0 max-w-[80%]',
        bubbleHeader: 'flex items-center gap-2 text-xs text-surface-500 dark:text-surface-400',
        bubbleName: 'font-semibold text-surface-900 dark:text-surface-50',
        bubbleTime: '',
        messageBase: 'px-4 py-2.5 rounded-2xl text-sm break-words',
        inputBase:
            'flex items-end gap-2 p-3 bg-surface-50 dark:bg-surface-900 border-t border-outline-variant',
        inputFieldWrapper:
            'flex-1 relative bg-surface-100 dark:bg-surface-800 rounded-2xl border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors',
        inputField:
            'w-full bg-transparent border-0 px-4 py-3 min-h-[44px] max-h-32 resize-none focus:ring-0 text-sm outline-none',
        inputActions: 'shrink-0 flex items-center gap-1'
    },
    variants: {
        position: {
            start: {
                bubbleBase: 'justify-start',
                bubbleContent: 'items-start',
                bubbleHeader: 'flex-row',
                messageBase: 'rounded-tl-sm'
            },
            end: {
                bubbleBase: 'justify-end flex-row-reverse',
                bubbleContent: 'items-end',
                bubbleHeader: 'flex-row-reverse',
                messageBase: 'rounded-tr-sm'
            }
        },
        variant: {
            primary: {
                messageBase: 'bg-primary text-on-primary'
            },
            surface: {
                messageBase:
                    'bg-surface-200 dark:bg-surface-800 text-surface-900 dark:text-surface-50'
            },
            outline: {
                messageBase:
                    'bg-transparent border border-outline-variant text-surface-900 dark:text-surface-50'
            }
        }
    },
    defaultVariants: {
        position: 'start',
        variant: 'surface'
    }
})

export type ChatVariantProps = VariantProps<typeof chatVariants>
