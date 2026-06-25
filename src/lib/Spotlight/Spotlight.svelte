<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { SpotlightProps } from './spotlight.types.js'
    import { spotlightVariants } from './spotlight.variants.js'

    let {
        size = 400,
        color = 'rgba(255, 255, 255, 0.1)',
        class: className,
        children,
        ...restProps
    }: SpotlightProps = $props()

    let styles = $derived(spotlightVariants())
    
    let mouseX = $state(0)
    let mouseY = $state(0)
    
    function handleMouseMove(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class={twMerge(styles.root() as string, className)}
    onmousemove={handleMouseMove}
    {...restProps}
>
    <!-- Spotlight Effect Background -->
    <div 
        class={styles.spotlight() as string}
        style:background={`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`}
    ></div>

    <!-- Content -->
    <div class={styles.content() as string}>
        {@render children?.()}
    </div>
</div>
