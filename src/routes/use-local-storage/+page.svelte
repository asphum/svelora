<script lang="ts">
    import { useLocalStorage } from '$lib/index.js'
    import { Button, Input, Badge } from '$lib/index.js'

    const note = useLocalStorage('svelora-demo-note', '')
    const count = useLocalStorage('svelora-demo-count', 0)
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">useLocalStorage</h1>
        <p class="text-on-surface-variant">
            Reactive <code>localStorage</code>-backed value. Reads on mount, writes through on
            change, and syncs across tabs via the <code>storage</code> event. SSR-safe; parse/quota errors
            are tolerated.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="Persisted-text" class="text-lg font-semibold">
<a href="#Persisted-text" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Persisted text
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Type below, then reload the page — the value persists. Open this page in a second tab to
            see live cross-tab sync.
        </p>
        <div class="space-y-2 rounded-lg bg-surface-container-high p-4">
            <Input bind:value={note.current} placeholder="Persists across reloads & tabs..." />
            <p class="text-xs text-on-surface-variant">
                Stored under key <code>svelora-demo-note</code>.
            </p>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Persisted-counter" class="text-lg font-semibold">
<a href="#Persisted-counter" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Persisted counter
                    </a>
</h2>
        <div class="flex flex-wrap items-center gap-3 rounded-lg bg-surface-container-high p-4">
            <Button size="sm" variant="outline" onclick={() => (count.current -= 1)}>−</Button>
            <Badge label={count.current} color="primary" variant="soft" size="lg" />
            <Button size="sm" variant="outline" onclick={() => (count.current += 1)}>+</Button>
            <Button size="sm" variant="soft" color="error" onclick={() => (count.current = 0)}>
                Reset
            </Button>
        </div>
    </section>
</div>
