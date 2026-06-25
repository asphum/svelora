import type { HTMLAttributes } from 'svelte/elements'
import type { ChartData, ChartOptions, ChartType } from 'chart.js'

export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'type'> {
    /**
     * Type of the chart.
     */
    type: ChartType

    /**
     * The data object for the chart.
     */
    data: ChartData<ChartType, unknown, unknown>

    /**
     * Configuration options for the chart.
     */
    options?: ChartOptions<ChartType>

    /**
     * Additional CSS classes.
     */
    class?: string
}
