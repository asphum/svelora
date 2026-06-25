<script lang="ts">
    import { Marquee, Card } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Marquee</h1>
        <p class="text-on-surface-variant">
            An infinite scrolling marquee component for displaying logos, text, or cards.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Horizontal Marquee</h2>
        <p class="text-sm text-on-surface-variant">
            A standard left-scrolling marquee that pauses on hover.
        </p>
        <div class="rounded-lg bg-surface-container-high py-8 overflow-hidden">
            <Marquee pauseOnHover={true} duration="20s">
                {#each Array(6) as _, i}
                    <Card class="w-48 p-4 text-center font-semibold">Brand {i + 1}</Card>
                {/each}
            </Marquee>
        </div>
    </section>

    <!-- Vertical -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Vertical Marquee</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">direction="up"</code> or <code class="rounded bg-surface-container-highest px-1">"down"</code> for vertical scrolling.
        </p>
        <div class="rounded-lg bg-surface-container-high py-8 overflow-hidden flex justify-center">
            <div class="h-[300px] flex gap-4 overflow-hidden">
                <Marquee direction="up" duration="15s">
                    {#each Array(5) as _, i}
                        <Card class="w-48 p-4 text-center">Feature A-{i + 1}</Card>
                    {/each}
                </Marquee>
                <Marquee direction="down" duration="15s">
                    {#each Array(5) as _, i}
                        <Card class="w-48 p-4 text-center">Feature B-{i + 1}</Card>
                    {/each}
                </Marquee>
            </div>
        </div>
    </section>
</div>
