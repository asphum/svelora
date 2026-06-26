import type { ApexOptions } from 'apexcharts'
import type { ClassNameValue } from 'tailwind-merge'

export interface ChartProps {
    /**
     * Configuration options for ApexCharts.
     */
    options: ApexOptions

    /**
     * Series data. If provided, overrides options.series.
     */
    series?: ApexOptions['series']

    /**
     * Tailwind class to apply to the chart container wrapper.
     */
    class?: ClassNameValue
}
