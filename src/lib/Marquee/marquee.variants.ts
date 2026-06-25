import { tv, type VariantProps } from 'tailwind-variants'

export const marqueeVariants = tv({
    slots: {
        root: 'group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]',
        content: 'flex shrink-0 justify-around [gap:var(--gap)] animate-marquee'
    },
    variants: {
        direction: {
            left: { content: '[animation-direction:normal]' },
            right: { content: '[animation-direction:reverse]' },
            up: {
                root: 'flex-col',
                content: 'flex-col animate-marquee-vertical [animation-direction:normal]'
            },
            down: {
                root: 'flex-col',
                content: 'flex-col animate-marquee-vertical [animation-direction:reverse]'
            }
        },
        pauseOnHover: {
            true: { content: 'group-hover:[animation-play-state:paused]' }
        }
    },
    defaultVariants: {
        direction: 'left',
        pauseOnHover: false
    }
})

export type MarqueeVariantProps = VariantProps<typeof marqueeVariants>
