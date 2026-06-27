<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { MarqueeProps } from './marquee.types.js'
    import { marqueeVariants } from './marquee.variants.js'

    let {
        direction = 'left',
        pauseOnHover = false,
        duration = '40s',
        gap = '1rem',
        repeat = 2,
        class: className,
        children,
        ...restProps
    }: MarqueeProps = $props()

    let styles = $derived(marqueeVariants({ direction, pauseOnHover }))
</script>

<div 
    class={twMerge(styles.root() as string, className)} 
    style:--gap={gap}
    style:--duration={duration}
    {...restProps}
>
    {#each Array(Math.max(2, repeat)) as _}
        <div class={styles.content() as string}>
            {@render children?.()}
        </div>
    {/each}
</div>

<style>
    /* Injected keyframes for marquee animation since it might not be in tailwind config */
    :global(.animate-marquee) {
        animation: marquee var(--duration) linear infinite;
    }
    
    :global(.animate-marquee-vertical) {
        animation: marquee-vertical var(--duration) linear infinite;
    }

    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(calc(-100% - var(--gap)));
        }
    }

    @keyframes marquee-vertical {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(calc(-100% - var(--gap)));
        }
    }
</style>
