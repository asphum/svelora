<script lang="ts">
    import { Rating } from '$lib/index.js'
    
    let rating1 = $state(3)
    let rating2 = $state(4.5)
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Rating</h1>
        <p class="text-on-surface-variant">
            A star rating input component supporting variants, colors, half-stars, and read-only mode.
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
            Use <code class="rounded bg-surface-container-highest px-1">bind:value</code> to control the rating.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <Rating bind:value={rating1} />
            <div class="text-sm text-on-surface-variant">
                <strong>Current Value:</strong> {rating1}
            </div>
        </div>
    </section>

    <!-- Variants -->
    <section class="space-y-3">
        <h2 id="Variants" class="text-lg font-semibold">
<a href="#Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Variants
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            <code class="rounded bg-surface-container-highest px-1">variant="solid"</code> (default) uses filled icons;
            <code class="rounded bg-surface-container-highest px-1">variant="outline"</code> uses stroke-only icons.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <Rating value={4} variant="solid" />
            <Rating value={4} variant="outline" />
        </div>
    </section>

    <!-- Colors -->
    <section class="space-y-3">
        <h2 id="Colors" class="text-lg font-semibold">
<a href="#Colors" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Colors
                    </a>
</h2>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-3 max-w-sm">
            <Rating value={4} color="warning" />
            <Rating value={4} color="primary" />
            <Rating value={4} color="error" />
            <Rating value={4} color="success" variant="outline" />
        </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-3">
        <h2 id="Sizes" class="text-lg font-semibold">
<a href="#Sizes" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Sizes
                    </a>
</h2>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 items-start">
            <Rating value={4} size="sm" />
            <Rating value={4} size="md" />
            <Rating value={4} size="lg" />
            <Rating value={4} size="xl" />
        </div>
    </section>

    <!-- Half Stars -->
    <section class="space-y-3">
        <h2 id="Half-Stars" class="text-lg font-semibold">
<a href="#Half-Stars" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Half Stars
                    </a>
</h2>
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
        <h2 id="Custom-Icons" class="text-lg font-semibold">
<a href="#Custom-Icons" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom Icons
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Provide <code class="rounded bg-surface-container-highest px-1">iconFull</code> and <code class="rounded bg-surface-container-highest px-1">iconEmpty</code> to change the shapes.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <Rating
                value={4}
                iconFull="lucide:heart"
                iconEmpty="lucide:heart"
                color="error"
                variant="solid"
            />
            <Rating
                value={3}
                iconFull="lucide:flame"
                iconEmpty="lucide:flame"
                color="warning"
                variant="outline"
            />
        </div>
    </section>
</div>
