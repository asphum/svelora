<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { twMerge } from 'tailwind-merge'
    import type { ChartProps } from './chart.types.js'
    import type ApexChartsType from 'apexcharts'

    let { options, series, class: className }: ChartProps = $props()

    let chartContainer: HTMLDivElement
    let chartInstance: ApexChartsType | null = null

    // Helper to dynamically load apexcharts only on the client
    onMount(async () => {
        // Dynamic import so it doesn't break SSR
        const ApexCharts = (await import('apexcharts')).default

        // Inject series if provided separately
        const initialOptions = series ? { ...options, series } : options

        // Default styling to match theme
        const mergedOptions: ApexChartsType.ApexOptions = {
            chart: {
                background: 'transparent',
                toolbar: { show: false },
                fontFamily: 'inherit',
                ...initialOptions.chart
            },
            theme: {
                ...initialOptions.theme
            },
            tooltip: {
                theme: 'dark', // Svelora default aesthetic
                ...initialOptions.tooltip
            },
            ...initialOptions
        }

        chartInstance = new ApexCharts(chartContainer, mergedOptions)
        chartInstance.render()
    })

    onDestroy(() => {
        if (chartInstance) {
            chartInstance.destroy()
        }
    })

    // React to options/series changes
    $effect(() => {
        if (chartInstance) {
            if (series) {
                chartInstance.updateSeries(series)
            }
            // If options change fully, updateOptions is available, but updating series is most common
        }
    })
</script>

<div class={twMerge('w-full', className)} bind:this={chartContainer}></div>
