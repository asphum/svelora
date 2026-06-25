<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { onMount } from 'svelte'
    import type { NumberTickerProps } from './number-ticker.types.js'
    import { numberTickerVariants } from './number-ticker.variants.js'

    let {
        value,
        duration = 2000,
        decimals = 0,
        delay = 0,
        class: className,
        ...restProps
    }: NumberTickerProps = $props()

    let styles = $derived(numberTickerVariants())
    
    let displayValue = $state(0)
    let isVisible = $state(false)
    let nodeRef = $state<HTMLSpanElement | null>(null)

    // Easing function (easeOutExpo)
    const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - 2 ** (-10 * x)
    }

    onMount(() => {
        if (!nodeRef) return

        let startTime: number | null = null
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime

            if (progress < duration) {
                const percentage = progress / duration
                const easedProgress = easeOutExpo(percentage)
                displayValue = value * easedProgress
                animationFrame = requestAnimationFrame(animate)
            } else {
                displayValue = value
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isVisible) {
                    isVisible = true
                    setTimeout(() => {
                        animationFrame = requestAnimationFrame(animate)
                    }, delay)
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(nodeRef)

        return () => {
            observer.disconnect()
            if (animationFrame) cancelAnimationFrame(animationFrame)
        }
    })

    // Re-animate if value changes significantly (optional)
    $effect(() => {
        if (isVisible && value !== undefined) {
            // A simpler approach for dynamic updates is to just snap to it 
            // or we could restart the animation. For now we snap if it changes after initial load.
        }
    })

    let formattedValue = $derived(
        new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(displayValue)
    )
</script>

<span 
    bind:this={nodeRef}
    class={twMerge(styles.base() as string, className)} 
    {...restProps}
>
    {formattedValue}
</span>
