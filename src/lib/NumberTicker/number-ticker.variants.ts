import { tv, type VariantProps } from 'tailwind-variants'

export const numberTickerVariants = tv({
    slots: {
        base: 'inline-block font-mono tracking-wider tabular-nums text-surface-900 dark:text-surface-50'
    }
})

export type NumberTickerVariantProps = VariantProps<typeof numberTickerVariants>
