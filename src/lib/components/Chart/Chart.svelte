<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { twMerge } from 'tailwind-merge'
	import type ApexChartsType from 'apexcharts'
	import type { ChartProps } from './chart.types.js'

	let { options, series, class: className }: ChartProps = $props()

	let chartContainer = $state<HTMLDivElement | null>(null)
	let chartInstance: ApexChartsType | null = null

	function mergeOptions(
		nextOptions: ApexChartsType.ApexOptions,
		nextSeries: ApexChartsType.ApexOptions['series'] | undefined
	): ApexChartsType.ApexOptions {
		const initialOptions = nextSeries ? { ...nextOptions, series: nextSeries } : nextOptions
		return {
			...initialOptions,
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
				theme: 'dark',
				...initialOptions.tooltip
			}
		}
	}

	onMount(() => {
		let cancelled = false

		void (async () => {
			const ApexCharts = (await import('apexcharts')).default
			if (cancelled || !chartContainer?.isConnected) return

			const instance = new ApexCharts(chartContainer, mergeOptions(options, series))
			try {
				await instance.render()
			} catch {
				instance.destroy()
				return
			}

			if (cancelled || !chartContainer?.isConnected) {
				instance.destroy()
				return
			}

			chartInstance = instance
			/** sync กรณี options/series เปลี่ยนระหว่าง await import/render */
			void chartInstance.updateOptions(mergeOptions(options, series), false, true)
		})()

		return () => {
			cancelled = true
		}
	})

	onDestroy(() => {
		chartInstance?.destroy()
		chartInstance = null
	})

	$effect(() => {
		const nextOptions = options
		const nextSeries = series
		if (!chartInstance) return

		void chartInstance.updateOptions(mergeOptions(nextOptions, nextSeries), false, true)
	})
</script>

<div class={twMerge('w-full', className)} bind:this={chartContainer}></div>
