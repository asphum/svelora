<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { onMount } from 'svelte'
    import { 
        Chart as ChartJS, 
        Title, 
        Tooltip, 
        Legend, 
        BarElement, 
        CategoryScale, 
        LinearScale, 
        PointElement, 
        LineElement, 
        ArcElement,
        RadialLinearScale,
        Filler
    } from 'chart.js'
    import { Bar, Line, Pie, Doughnut, Radar, PolarArea, Scatter, Bubble } from 'svelte-chartjs'
    import type { ChartProps } from './chart.types.js'
    import { chartVariants } from './chart.variants.js'

    // Register all common elements
    ChartJS.register(
        Title, 
        Tooltip, 
        Legend, 
        BarElement, 
        CategoryScale, 
        LinearScale, 
        PointElement, 
        LineElement, 
        ArcElement,
        RadialLinearScale,
        Filler
    )

    // Set default styling to match Tailwind/Svelora theme
    ChartJS.defaults.color = 'currentColor'
    ChartJS.defaults.font.family = 'inherit'
    ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    ChartJS.defaults.plugins.tooltip.titleColor = '#ffffff'
    ChartJS.defaults.plugins.tooltip.bodyColor = '#ffffff'
    ChartJS.defaults.plugins.tooltip.cornerRadius = 6
    ChartJS.defaults.plugins.tooltip.padding = 10

    let {
        type,
        data,
        options = {},
        class: className,
        ...restProps
    }: ChartProps = $props()

    let styles = $derived(chartVariants())

    // Map string types to components
    const components = {
        bar: Bar,
        line: Line,
        pie: Pie,
        doughnut: Doughnut,
        radar: Radar,
        polarArea: PolarArea,
        scatter: Scatter,
        bubble: Bubble
    }

    // Default responsive options
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false
    }

    let mergedOptions = $derived({ ...defaultOptions, ...options })
    
    // We must use "as any" or "as typeof SvelteComponent" because svelte-chartjs types 
    // are sometimes tricky with svelte:component in Svelte 5.
    const ChartComponent = $derived(components[type as keyof typeof components])
</script>

<div class={twMerge(styles, className)} {...restProps}>
    {#if ChartComponent}
        <ChartComponent data={data as any} options={mergedOptions as any} />
    {/if}
</div>
