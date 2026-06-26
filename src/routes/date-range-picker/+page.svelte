<script lang="ts">
    import { DateRangePicker } from '$lib/index.js'
    
    let range1 = $state<any>({ start: undefined, end: undefined })
    let range2 = $state<any>({ 
        start: undefined, 
        end: undefined 
    })
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">DateRangePicker</h1>
        <p class="text-on-surface-variant">
            A popover input that allows users to select a start and end date using a calendar interface.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">
<a href="#Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">bind:value</code> with an object containing <code class="rounded bg-surface-container-highest px-1">start</code> and <code class="rounded bg-surface-container-highest px-1">end</code> properties (which are <code class="rounded bg-surface-container-highest px-1">Date</code> objects or <code class="rounded bg-surface-container-highest px-1">null</code>).
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <DateRangePicker bind:value={range1} placeholder="Pick a date range" />
            <div class="text-sm text-on-surface-variant">
                <strong>Start:</strong> {range1.start?.toString() ?? 'None'} <br />
                <strong>End:</strong> {range1.end?.toString() ?? 'None'}
            </div>
        </div>
    </section>

    <!-- Default Value -->
    <section class="space-y-3">
        <h2 id="Pre-selected-Range" class="text-lg font-semibold">
<a href="#Pre-selected-Range" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Pre-selected Range
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Initialize the bound value to have the date range pre-filled.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <DateRangePicker bind:value={range2} />
        </div>
    </section>
</div>
