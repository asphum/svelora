import { tv, type VariantProps } from 'tailwind-variants'
import type { ButtonVariantProps } from '../Button/button.variants.js'

export const localeButtonVariants = tv({
    slots: {
        base: '',
        triggerLabel: 'truncate',
        triggerIcon: 'shrink-0',
        triggerChevron: 'shrink-0 opacity-70',
        menu: 'space-y-1 rounded-xl p-1',
        menuLabel:
            'px-3 pt-2 pb-1 text-xs font-semibold tracking-[0.14em] text-on-surface-variant uppercase',
        item: [
            'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
            'focus-visible:ring-primary/40 focus-visible:outline-none focus-visible:ring-2'
        ],
        itemIdle: 'text-on-surface hover:bg-surface-container-high',
        itemCurrent: 'bg-primary/10 text-primary',
        itemLeading: 'flex min-w-0 items-start gap-2.5',
        itemText: 'min-w-0 space-y-0.5',
        itemLabel: 'truncate font-medium',
        itemDescription: 'text-xs text-on-surface-variant',
        itemCode:
            'shrink-0 rounded-md bg-surface-container px-1.5 py-0.5 text-[11px] font-medium text-on-surface-variant uppercase',
        itemIndicator: 'shrink-0 text-primary'
    },
    variants: {
        fit: {
            true: {
                menu: 'w-fit min-w-0'
            },
            false: {
                menu: 'min-w-52'
            }
        },
        size: {
            xs: {
                triggerIcon: 'size-3.5',
                triggerChevron: 'size-3.5'
            },
            sm: {
                triggerIcon: 'size-4',
                triggerChevron: 'size-4'
            },
            md: {
                triggerIcon: 'size-5',
                triggerChevron: 'size-5'
            },
            lg: {
                triggerIcon: 'size-5',
                triggerChevron: 'size-5'
            },
            xl: {
                triggerIcon: 'size-6',
                triggerChevron: 'size-6'
            }
        }
    },
    defaultVariants: {
        fit: false
    }
})

export type LocaleButtonVariantProps = VariantProps<typeof localeButtonVariants>
export type LocaleButtonSlots = keyof ReturnType<typeof localeButtonVariants>

export const localeButtonDefaults = {
    defaultVariants: {
        ...localeButtonVariants.defaultVariants,
        color: 'surface' as NonNullable<ButtonVariantProps['color']>,
        variant: 'outline' as NonNullable<ButtonVariantProps['variant']>,
        size: 'md' as NonNullable<ButtonVariantProps['size']>
    },
    slots: {} as Partial<Record<LocaleButtonSlots, string>>
}
