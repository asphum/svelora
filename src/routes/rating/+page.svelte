<script lang="ts">
    import { Rating } from '$lib/index.js'
    
    let rating1 = $state(3)
    let rating2 = $state(4.5)
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Rating</h1>
        <p class="text-on-surface-variant">
            A star rating input component supporting half-stars, read-only mode, and custom icons.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">bind:value</code> to control the rating.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <Rating bind:value={rating1} />
            <div class="text-sm text-on-surface-variant">
                <strong>Current Value:</strong> {rating1}
            </div>
        </div>
    </section>

    <!-- Half Stars -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Half Stars</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">allowHalf={`{true}`}</code> to enable half-star precision rating via mouse or keyboard.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <Rating bind:value={rating2} allowHalf={true} />
            <div class="text-sm text-on-surface-variant">
                <strong>Current Value:</strong> {rating2}
            </div>
        </div>
    </section>

    <!-- Custom Icons -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Custom Icons</h2>
        <p class="text-sm text-on-surface-variant">
            Provide <code class="rounded bg-surface-container-highest px-1">iconFull</code> and <code class="rounded bg-surface-container-highest px-1">iconEmpty</code> to change the shapes.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <Rating 
                value={4} 
                iconFull="lucide:heart" 
                iconEmpty="lucide:heart" 
                class="text-error" 
            />
            <Rating 
                value={3} 
                iconFull="lucide:flame" 
                iconEmpty="lucide:flame" 
                class="text-warning-500" 
            />
        </div>
    </section>
</div>
