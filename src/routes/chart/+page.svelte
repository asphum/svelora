<script lang="ts">
    import { Chart } from '$lib/index.js'
    
    // Sample data for various charts
    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales ($)',
            data: [12000, 19000, 15000, 22000, 18000, 25000],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
        }]
    }

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Active Users',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(16, 185, 129)',
            tension: 0.1
        }]
    }

    const pieData = {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
            data: [300, 500, 100],
            backgroundColor: [
                'rgb(59, 130, 246)',
                'rgb(16, 185, 129)',
                'rgb(245, 158, 11)'
            ],
            hoverOffset: 4
        }]
    }
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Chart</h1>
        <p class="text-on-surface-variant">
            A flexible wrapper around <code class="rounded bg-surface-container-highest px-1">chart.js</code> to render beautiful, responsive charts.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Pass the <code class="rounded bg-surface-container-highest px-1">type</code> prop (e.g. <code class="rounded bg-surface-container-highest px-1">bar</code>, <code class="rounded bg-surface-container-highest px-1">line</code>, <code class="rounded bg-surface-container-highest px-1">pie</code>) and the standard Chart.js <code class="rounded bg-surface-container-highest px-1">data</code> object.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <div class="h-[300px] w-full">
                <Chart type="bar" data={barData} />
            </div>
        </div>
    </section>

    <!-- Line Chart -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Line Chart</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">type="line"</code> to render a line chart.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4">
            <div class="h-[300px] w-full">
                <Chart type="line" data={lineData} />
            </div>
        </div>
    </section>

    <!-- Pie Chart -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Pie Chart</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">type="pie"</code> to render a pie chart. Ensure the parent container has adequate width/height constraints.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="h-[300px] w-full max-w-sm">
                <Chart type="pie" data={pieData} />
            </div>
        </div>
    </section>
</div>
