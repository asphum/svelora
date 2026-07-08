<script lang="ts">
    import { getComponentConfig } from '../../config.js'
    import Icon from '../Icon/Icon.svelte'
    import type { RatingProps } from './rating.types.js'
    import { ratingDefaults, ratingVariants } from './rating.variants.js'

    const config = getComponentConfig('rating', ratingDefaults)

    let {
        value = $bindable(0),
        max = 5,
        variant = config.defaultVariants.variant,
        color = config.defaultVariants.color,
        size = config.defaultVariants.size,
        allowHalf = false,
        disabled = false,
        readonly = false,
        iconFull,
        iconEmpty,
        ui,
        class: className,
        onchange,
        ...restProps
    }: RatingProps = $props()

    const resolvedIconFull = $derived(
        iconFull ?? (variant === 'solid' ? 'mdi:star' : 'lucide:star')
    )
    const resolvedIconEmpty = $derived(
        iconEmpty ?? (variant === 'solid' ? 'mdi:star-outline' : 'lucide:star')
    )

    const styles = $derived.by(() => {
        const slots = ratingVariants({ variant, color, size, disabled, readonly })
        return {
            base: slots.base({ class: [config.slots.base, className, ui?.base] }),
            starWrapper: slots.starWrapper({ class: [config.slots.starWrapper, ui?.starWrapper] }),
            starFull: slots.starFull({ class: [config.slots.starFull, ui?.starFull] }),
            starEmpty: slots.starEmpty({ class: [config.slots.starEmpty, ui?.starEmpty] })
        }
    })

    let hoverValue = $state<number | null>(null)

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
    class={styles.base}
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
            class={styles.starWrapper}
            disabled={disabled || readonly}
            tabindex={disabled || readonly ? -1 : 0}
            onmousemove={(e) => handleMouseMove(e, starIndex)}
            onclick={() => handleClick(starIndex)}
            onkeydown={(e) => handleKeyDown(e, starIndex)}
        >
            {#if state === 'full'}
                <Icon name={resolvedIconFull} class={styles.starFull} />
            {:else if state === 'half'}
                <div class="relative">
                    <Icon name={resolvedIconEmpty} class={styles.starEmpty} />
                    <div class="absolute inset-0 overflow-hidden w-1/2">
                        <Icon name={resolvedIconFull} class={styles.starFull} />
                    </div>
                </div>
            {:else}
                <Icon name={resolvedIconEmpty} class={styles.starEmpty} />
            {/if}
        </button>
    {/each}
</div>
