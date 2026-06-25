import { tv, type VariantProps } from 'tailwind-variants'

export const spotlightVariants = tv({
    slots: {
        root: 'relative overflow-hidden group',
        spotlight:
            'pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
        content: 'relative z-10 h-full w-full'
    }
})

export type SpotlightVariantProps = VariantProps<typeof spotlightVariants>
