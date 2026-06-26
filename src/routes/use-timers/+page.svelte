<script lang="ts">
    import { useInterval, useTimeout } from '$lib/index.js'
    import { Button, Badge, Card } from '$lib/index.js'

    // ==================== useInterval ====================
    let count = $state(0)
    const ticker = useInterval(() => count++, 1000)

    // ==================== useTimeout ====================
    let visible = $state(true)
    const dismiss = useTimeout(() => (visible = false), 3000)

    function show() {
        visible = true
        dismiss.restart()
    }
</script>

<div class="space-y-8">
    <div>
        <h1 class="text-2xl font-bold text-on-surface">useTimeout / useInterval</h1>
        <p class="mt-1 text-on-surface-variant">
            Timers with proper runes teardown — cleared automatically on unmount, with a reactive
            delay, pause/resume, and restart/cancel.
        </p>
    </div>

    <Card>
        <h2 id="useInterval-1000ms" class="mb-1 font-semibold text-on-surface">
<a href="#useInterval-1000ms" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        useInterval (1000ms)
                    </a>
</h2>
        <p class="mb-4 text-sm text-on-surface-variant">
            Ticks every second. Pause and resume without leaking the timer.
        </p>

        <div class="flex flex-wrap items-center gap-4">
            <span class="text-3xl font-bold text-primary tabular-nums">{count}</span>
            <Badge color={ticker.active ? 'success' : 'secondary'}>
                {ticker.active ? 'ticking' : 'paused'}
            </Badge>
            {#if ticker.active}
                <Button size="sm" variant="ghost" onclick={ticker.pause}>Pause</Button>
            {:else}
                <Button size="sm" variant="ghost" onclick={ticker.resume}>Resume</Button>
            {/if}
            <Button size="sm" variant="ghost" onclick={() => (count = 0)}>Reset</Button>
        </div>
    </Card>

    <Card>
        <h2 id="useTimeout-3000ms" class="mb-1 font-semibold text-on-surface">
<a href="#useTimeout-3000ms" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        useTimeout (3000ms)
                    </a>
</h2>
        <p class="mb-4 text-sm text-on-surface-variant">
            The message auto-dismisses after 3 seconds. <code>restart()</code> brings it back;
            <code>cancel()</code> keeps it.
        </p>

        <div class="flex items-center gap-3">
            {#if visible}
                <Badge color="info">Visible — dismissing in 3s…</Badge>
                <Button size="sm" variant="ghost" onclick={dismiss.cancel}>Keep it</Button>
            {:else}
                <span class="text-sm text-on-surface-variant">Dismissed.</span>
                <Button size="sm" color="primary" onclick={show}>Show again</Button>
            {/if}
        </div>
    </Card>
</div>
