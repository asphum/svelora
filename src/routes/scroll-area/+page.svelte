<script lang="ts">
    import { ScrollArea, Separator } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">ScrollArea</h1>
        <p class="text-on-surface-variant">
            Augments native scroll functionality for custom, cross-browser styling.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Wrap any content in a <code class="rounded bg-surface-container-highest px-1">ScrollArea</code> and provide it with a fixed height.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <ScrollArea class="h-72 w-full max-w-sm rounded-lg border border-outline-variant bg-surface p-4">
                <div class="space-y-4">
                    <h4 class="text-sm font-semibold">Svelora Components</h4>
                    <Separator />
                    {#each Array(50) as _, i}
                        <div class="text-sm text-on-surface-variant">Component {i + 1}</div>
                        {#if i !== 49}
                            <Separator />
                        {/if}
                    {/each}
                </div>
            </ScrollArea>
        </div>
    </section>

    <!-- Horizontal -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Horizontal Scrolling</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">orientation="horizontal"</code> or <code class="rounded bg-surface-container-highest px-1">orientation="both"</code> to enable horizontal scrollbars.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <ScrollArea orientation="horizontal" class="w-full max-w-lg rounded-lg border border-outline-variant bg-surface p-4 whitespace-nowrap">
                <div class="flex gap-4">
                    {#each Array(10) as _, i}
                        <div class="h-32 w-32 shrink-0 rounded-md bg-surface-container-highest flex items-center justify-center font-bold text-on-surface-variant">
                            Item {i + 1}
                        </div>
                    {/each}
                </div>
            </ScrollArea>
        </div>
    </section>
</div>
