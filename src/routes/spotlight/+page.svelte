<script lang="ts">
    import { Spotlight } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Spotlight</h1>
        <p class="text-on-surface-variant">
            A hover effect that follows your mouse cursor around the container.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Wrap your content in a <code class="rounded bg-surface-container-highest px-1">Spotlight</code> component. Hover over the card to see the effect.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <Spotlight class="w-full max-w-sm rounded-xl border border-outline bg-surface-50 dark:bg-surface-900 p-8">
                <h3 class="text-xl font-bold mb-2">Interactive Card</h3>
                <p class="text-surface-500">
                    The spotlight follows your cursor, creating a subtle, premium look for modern interfaces.
                </p>
            </Spotlight>
        </div>
    </section>
    
    <!-- Custom Color -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Custom Color & Size</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">color</code> and <code class="rounded bg-surface-container-highest px-1">size</code> props to adjust the spotlight appearance.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex gap-4 justify-center flex-wrap">
            <Spotlight 
                color="rgba(59, 130, 246, 0.2)" 
                size={300}
                class="w-full max-w-[200px] rounded-xl border border-outline bg-surface-900 text-white p-6"
            >
                <div class="font-semibold text-primary-300">Blue Spotlight</div>
            </Spotlight>
            
            <Spotlight 
                color="rgba(16, 185, 129, 0.2)" 
                size={500}
                class="w-full max-w-[200px] rounded-xl border border-outline bg-surface-900 text-white p-6"
            >
                <div class="font-semibold text-success-400">Large Green Spotlight</div>
            </Spotlight>
        </div>
    </section>
</div>
