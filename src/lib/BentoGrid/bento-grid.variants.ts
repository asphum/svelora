import { tv, type VariantProps } from 'tailwind-variants'

export const bentoGridVariants = tv({
    slots: {
        gridBase: 'grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full',
        cardBase:
            'group relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-50 dark:bg-surface-900 border border-outline-variant transition-all hover:shadow-md dark:hover:shadow-surface-800/50',
        cardBackground: 'absolute inset-0 transition-all duration-300 pointer-events-none',
        cardContent:
            'pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300',
        cardIconWrapper:
            'mb-2 w-10 h-10 flex items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
        cardTitle: 'text-lg font-semibold text-surface-900 dark:text-surface-50',
        cardDescription: 'text-sm text-surface-500 dark:text-surface-400',
        cardAction:
            'pointer-events-auto absolute bottom-0 left-0 w-full p-6 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'
    },
    variants: {
        // Variants can be added if we want different styles of grids
    }
})

export type BentoGridVariantProps = VariantProps<typeof bentoGridVariants>
