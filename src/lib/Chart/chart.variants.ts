import { tv, type VariantProps } from 'tailwind-variants'

export const chartVariants = tv({
    base: 'w-full h-full relative'
})

export type ChartVariantProps = VariantProps<typeof chartVariants>
