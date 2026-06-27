<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import type { RatingProps } from './rating.types.js'
    import { ratingVariants } from './rating.variants.js'

    let {
        value = $bindable(0),
        max = 5,
        size = 'md',
        allowHalf = false,
        disabled = false,
        readonly = false,
        iconFull = 'lucide:star',
        iconEmpty = 'lucide:star',
        activeColor = 'text-warning-500 fill-warning-500',
        inactiveColor = 'text-surface-300 dark:text-surface-600',
        class: className,
        onchange,
        ...restProps
    }: RatingProps = $props()

    let styles = $derived(ratingVariants({ size, disabled, readonly }))
    let hoverValue = $state<number | null>(null)

    // Calculate array of stars
    let stars = $derived(Array.from({ length: max }, (_, i) => i + 1))

    function handleMouseMove(e: MouseEvent, index: number) {
        if (disabled || readonly) return
        
        if (allowHalf) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
            const x = e.clientX - rect.left
            const isHalf = x < rect.width / 2
            hoverValue = isHalf ? index - 0.5 : index
        } else {
            hoverValue = index
        }
    }

    function handleMouseLeave() {
        if (disabled || readonly) return
        hoverValue = null
    }

    function handleClick(index: number) {
        if (disabled || readonly) return
        value = hoverValue ?? index
        onchange?.(value)
    }

    function handleKeyDown(e: KeyboardEvent, index: number) {
        if (disabled || readonly) return
        
        let newValue = value
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            newValue = Math.min(max, value + (allowHalf ? 0.5 : 1))
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            newValue = Math.max(0, value - (allowHalf ? 0.5 : 1))
        } else if (e.key === 'Enter' || e.key === ' ') {
            newValue = index
        } else {
            return
        }
        
        e.preventDefault()
        value = newValue
        onchange?.(value)
    }

    function getStarState(index: number) {
        const currentValue = hoverValue ?? value
        if (currentValue >= index) return 'full'
        if (allowHalf && currentValue >= index - 0.5) return 'half'
        return 'empty'
    }
</script>

<div 
    class={twMerge(styles.base() as string, className)} 
    onmouseleave={handleMouseLeave}
    {...restProps}
    role="radiogroup"
>
    {#each stars as starIndex}
        {@const state = getStarState(starIndex)}
        
        <button
            type="button"
            role="radio"
            aria-checked={value >= starIndex}
            aria-label={`Rate ${starIndex} out of ${max} stars`}
            class={styles.starWrapper() as string}
            disabled={disabled || readonly}
            tabindex={disabled || readonly ? -1 : 0}
            onmousemove={(e) => handleMouseMove(e, starIndex)}
            onclick={() => handleClick(starIndex)}
            onkeydown={(e) => handleKeyDown(e, starIndex)}
        >
            {#if state === 'full'}
                <Icon name={iconFull} class={twMerge(styles.star() as string, activeColor)} />
            {:else if state === 'half'}
                <!-- Simple half star implementation using CSS clip-path or two icons -->
                <div class="relative">
                    <Icon name={iconEmpty} class={twMerge(styles.star() as string, inactiveColor)} />
                    <div class="absolute inset-0 overflow-hidden w-1/2">
                        <Icon name={iconFull} class={twMerge(styles.star() as string, activeColor)} />
                    </div>
                </div>
            {:else}
                <Icon name={iconEmpty} class={twMerge(styles.star() as string, inactiveColor)} />
            {/if}
        </button>
    {/each}
</div>
