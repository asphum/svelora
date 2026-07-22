import { tv, type VariantProps } from 'tailwind-variants'

export const lightboxVariants = tv({
    slots: {
        root: [
            'fixed inset-0 z-50 flex flex-col bg-black/90 text-white backdrop-blur-md',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
        ],
        header: 'absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent',
        titleGroup: 'flex flex-col min-w-0 pr-4',
        title: 'font-medium text-sm sm:text-base truncate text-white',
        description: 'text-xs text-white/70 truncate',
        toolbar: 'flex items-center gap-1 sm:gap-2 shrink-0',
        toolButton:
            'p-2 text-white/80 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer',
        body: 'relative flex-1 flex items-center justify-center overflow-hidden p-4 select-none',
        imageWrapper: 'relative flex items-center justify-center size-full overflow-hidden',
        image: 'max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-150 shadow-2xl rounded-md cursor-grab active:cursor-grabbing select-none',
        navButton:
            'absolute top-1/2 -translate-y-1/2 z-20 p-3 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer',
        prevButton: 'left-4',
        nextButton: 'right-4',
        footer: 'absolute bottom-0 inset-x-0 z-20 flex flex-col items-center gap-2 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent',
        counter:
            'text-xs font-medium px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90',
        thumbnails: 'flex items-center gap-2 overflow-x-auto max-w-full px-4 py-1.5 scrollbar-none',
        thumbnail:
            'size-12 shrink-0 rounded-md overflow-hidden border-2 transition-all cursor-pointer',
        thumbnailActive: 'border-primary ring-2 ring-primary/40 opacity-100 scale-105',
        thumbnailInactive: 'border-transparent opacity-60 hover:opacity-100'
    },
    variants: {
        size: {
            sm: {
                image: 'max-h-[70vh] max-w-[80vw]'
            },
            md: {
                image: 'max-h-[85vh] max-w-[90vw]'
            },
            lg: {
                image: 'max-h-[92vh] max-w-[95vw]'
            }
        }
    },
    defaultVariants: {
        size: 'md'
    }
})

export type LightboxVariantProps = VariantProps<typeof lightboxVariants>
export type LightboxSlots = keyof ReturnType<typeof lightboxVariants>

export const lightboxDefaults = {
    defaultVariants: lightboxVariants.defaultVariants,
    slots: {} as Partial<Record<LightboxSlots, string>>
}
