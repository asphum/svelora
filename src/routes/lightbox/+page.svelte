<script lang="ts">
    import { Lightbox, Button } from '$lib/index.js'

    let singleOpen = $state(false)
    let galleryOpen = $state(false)
    let galleryIndex = $state(0)

    const galleryImages = [
        {
            src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
            title: 'Yosemite Valley',
            description: 'Stunning view of El Capitan and Half Dome at sunset.'
        },
        {
            src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1200',
            title: 'Mountain Lake Reflection',
            description: 'Serene crystal clear lake reflecting snow-capped peaks.'
        },
        {
            src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200',
            title: 'Foggy Forest Landscape',
            description: 'Misty pine forest shrouded in early morning fog.'
        }
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Lightbox</h1>
        <p class="text-on-surface-variant">
            Full-screen image viewer popover with gallery navigation, zoom, rotation, download, fullscreen, and keyboard shortcuts.
        </p>
    </div>

    <!-- Basic Single Image -->
    <section class="space-y-3">
        <h2 id="Single-Image" class="text-lg font-semibold">
            <a href="#Single-Image" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Single Image Preview
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Pass a single image URL via <code class="rounded bg-surface-container-highest px-1">src</code> to open a standalone Lightbox viewer.
        </p>
        <div class="flex items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <Button leadingIcon="lucide:image" onclick={() => (singleOpen = true)}>
                Open Single Image Lightbox
            </Button>
            <Lightbox
                bind:open={singleOpen}
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
                title="Yosemite Valley"
                description="Stunning view of El Capitan and Half Dome."
            />
        </div>
    </section>

    <!-- Gallery Mode -->
    <section class="space-y-3">
        <h2 id="Gallery-Mode" class="text-lg font-semibold">
            <a href="#Gallery-Mode" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Gallery Mode & Thumbnails
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Pass an array of images to <code class="rounded bg-surface-container-highest px-1">images</code> to enable next/previous navigation, thumbnail strip, and image counter.
        </p>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-4">
            <div class="flex flex-wrap items-center gap-3">
                {#each galleryImages as img, i (img.src)}
                    <button
                        type="button"
                        class="group relative size-24 overflow-hidden rounded-lg border border-outline-variant transition-transform hover:scale-105"
                        onclick={() => {
                            galleryIndex = i
                            galleryOpen = true
                        }}
                    >
                        <img src={img.src} alt={img.title} class="size-full object-cover" />
                        <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span class="text-xs font-medium text-white">View #{i + 1}</span>
                        </div>
                    </button>
                {/each}
            </div>

            <Lightbox
                bind:open={galleryOpen}
                bind:index={galleryIndex}
                images={galleryImages}
            />
        </div>
    </section>
    <!-- Controls Customization -->
    <section class="space-y-3">
        <h2 id="Controls-Customization" class="text-lg font-semibold">
            <a href="#Controls-Customization" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Controls Customization
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Toggle toolbar controls such as <code class="rounded bg-surface-container-highest px-1">zoom</code>, <code class="rounded bg-surface-container-highest px-1">rotate</code>, <code class="rounded bg-surface-container-highest px-1">download</code>, <code class="rounded bg-surface-container-highest px-1">fullscreen</code>, and <code class="rounded bg-surface-container-highest px-1">thumbnails</code>.
        </p>
        <div class="flex flex-wrap items-center gap-4 rounded-lg bg-surface-container-high p-4">
            <Button leadingIcon="lucide:settings-2" onclick={() => (singleOpen = true)}>
                Open Minimal Lightbox (No Rotate/Download)
            </Button>
            <Lightbox
                bind:open={singleOpen}
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
                title="Minimal Lightbox"
                rotate={false}
                download={false}
            />
        </div>
    </section>

    <!-- Keyboard Shortcuts -->
    <section class="space-y-3">
        <h2 id="Keyboard-Shortcuts" class="text-lg font-semibold">
            <a href="#Keyboard-Shortcuts" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Keyboard Shortcuts
            </a>
        </h2>
        <div class="overflow-x-auto rounded-lg border border-outline-variant bg-surface-container">
            <table class="w-full text-left text-sm">
                <thead class="border-b border-outline-variant bg-surface-container-high text-xs text-on-surface-variant uppercase">
                    <tr>
                        <th class="px-4 py-2.5">Key</th>
                        <th class="px-4 py-2.5">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/60 text-on-surface">
                    <tr><td class="px-4 py-2 font-mono text-xs"><kbd class="rounded bg-surface-container-highest px-1.5 py-0.5">←</kbd> / <kbd class="rounded bg-surface-container-highest px-1.5 py-0.5">→</kbd></td><td class="px-4 py-2">Navigate to previous / next image</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs"><kbd class="rounded bg-surface-container-highest px-1.5 py-0.5">+</kbd> / <kbd class="rounded bg-surface-container-highest px-1.5 py-0.5">-</kbd></td><td class="px-4 py-2">Zoom in / Zoom out</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs"><kbd class="rounded bg-surface-container-highest px-1.5 py-0.5">R</kbd></td><td class="px-4 py-2">Reset zoom and rotation back to default</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs"><kbd class="rounded bg-surface-container-highest px-1.5 py-0.5">ESC</kbd></td><td class="px-4 py-2">Close lightbox popover</td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- API Reference -->
    <section class="space-y-3">
        <h2 id="API-Reference" class="text-lg font-semibold">
            <a href="#API-Reference" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                API Reference
            </a>
        </h2>
        <div class="overflow-x-auto rounded-lg border border-outline-variant bg-surface-container">
            <table class="w-full text-left text-sm">
                <thead class="border-b border-outline-variant bg-surface-container-high text-xs text-on-surface-variant uppercase">
                    <tr>
                        <th class="px-4 py-2.5">Prop</th>
                        <th class="px-4 py-2.5">Type</th>
                        <th class="px-4 py-2.5">Default</th>
                        <th class="px-4 py-2.5">Description</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/60 text-on-surface">
                    <tr><td class="px-4 py-2 font-mono text-xs">open</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">false</td><td class="px-4 py-2">Open state (supports two-way binding)</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">images</td><td class="px-4 py-2 font-mono text-xs text-primary">LightboxSource[]</td><td class="px-4 py-2 text-xs">[]</td><td class="px-4 py-2">Array of image URLs or LightboxImage objects</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">src</td><td class="px-4 py-2 font-mono text-xs text-primary">string</td><td class="px-4 py-2 text-xs">undefined</td><td class="px-4 py-2">Shorthand URL for single image mode</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">index</td><td class="px-4 py-2 font-mono text-xs text-primary">number</td><td class="px-4 py-2 text-xs">0</td><td class="px-4 py-2">Active gallery image index (supports bind:index)</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">zoom</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">true</td><td class="px-4 py-2">Show zoom in/out controls and panning</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">rotate</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">true</td><td class="px-4 py-2">Show 90deg image rotation button</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">download</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">true</td><td class="px-4 py-2">Show image download button</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">fullscreen</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">true</td><td class="px-4 py-2">Show fullscreen mode toggle button</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">thumbnails</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">true</td><td class="px-4 py-2">Show thumbnail strip at bottom for galleries</td></tr>
                    <tr><td class="px-4 py-2 font-mono text-xs">counter</td><td class="px-4 py-2 font-mono text-xs text-primary">boolean</td><td class="px-4 py-2 text-xs">true</td><td class="px-4 py-2">Show active image counter badge</td></tr>
                </tbody>
            </table>
        </div>
    </section>
</div>
