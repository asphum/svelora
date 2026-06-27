import { tv, type VariantProps } from 'tailwind-variants'

export const colorPickerVariants = tv({
    slots: {
        base: 'relative inline-flex',
        trigger:
            'flex items-center gap-2 px-3 py-2 border border-outline-variant rounded-md bg-surface text-sm w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        colorIndicator: 'w-5 h-5 rounded border border-outline/50 shrink-0',
        content:
            'w-64 p-3 flex flex-col gap-3 bg-surface border border-outline-variant rounded-md shadow-md',
        swatchGrid: 'grid grid-cols-6 gap-2',
        swatch: 'w-6 h-6 rounded border border-outline/50 cursor-pointer hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        nativeInput: 'w-full h-8 cursor-pointer rounded overflow-hidden',
        hexInputWrapper: 'flex items-center gap-2'
    }
})

export type ColorPickerVariantProps = VariantProps<typeof colorPickerVariants>
