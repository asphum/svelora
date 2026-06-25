<script lang="ts">
    import { Resizable } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Resizable</h1>
        <p class="text-on-surface-variant">
            A simple container that allows users to resize its dimensions.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Wrap your content in a <code class="rounded bg-surface-container-highest px-1">Resizable</code> component. By default, it can be resized in both directions.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <Resizable direction="both" class="min-h-32 min-w-32 h-48 w-48 rounded-lg border border-outline-variant bg-surface overflow-hidden">
                <div class="flex h-full items-center justify-center p-6 text-center text-sm text-on-surface-variant">
                    Drag the bottom-right corner to resize
                </div>
            </Resizable>
        </div>
    </section>

    <!-- Horizontal & Vertical -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Horizontal & Vertical</h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code class="rounded bg-surface-container-highest px-1">direction</code> prop to restrict resizing to either <code class="rounded bg-surface-container-highest px-1">horizontal</code> or <code class="rounded bg-surface-container-highest px-1">vertical</code>.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex gap-4 justify-center flex-wrap">
            <Resizable direction="horizontal" class="min-h-32 min-w-32 h-32 w-48 rounded-lg border border-outline-variant bg-surface overflow-hidden">
                <div class="flex h-full items-center justify-center p-4 font-semibold">
                    Horizontal
                </div>
            </Resizable>
            
            <Resizable direction="vertical" class="min-h-32 min-w-32 h-48 w-32 rounded-lg border border-outline-variant bg-surface overflow-hidden">
                <div class="flex h-full items-center justify-center p-4 font-semibold">
                    Vertical
                </div>
            </Resizable>
        </div>
    </section>
</div>
