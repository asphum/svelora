<script lang="ts">
    import { InputNumber, Separator } from '$lib/index.js'

    const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error'] as const
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    let bindValue = $state(5)
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold text-on-surface">InputNumber</h1>
        <p class="text-on-surface-variant">
            A numeric input with increment and decrement buttons. Supports size and color variants,
            min/max boundaries, step increments, error highlighting, and full slot customization.
        </p>
    </div>

    <!-- Basic Usage -->
    <section class="space-y-4">
        <h2 id="Basic-Usage" class="text-lg font-semibold text-on-surface">
            <a
                href="#Basic-Usage"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Basic Usage
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            A simple numeric input with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">+</code
            >
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">-</code>
            buttons.
        </p>
        <div class="w-48">
            <InputNumber />
        </div>
    </section>

    <!-- Two-way Binding -->
    <section class="space-y-4">
        <h2 id="Two-way-Binding" class="text-lg font-semibold text-on-surface">
            <a
                href="#Two-way-Binding"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Two-way Binding
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >bind:value</code
            > for reactive two-way data binding.
        </p>
        <div class="space-y-3">
            <div class="w-48">
                <InputNumber bind:value={bindValue} min={0} max={20} />
            </div>
            <p class="text-sm text-on-surface-variant">
                Value: <span class="font-mono text-on-surface">{bindValue}</span>
            </p>
        </div>
    </section>

    <!-- Min / Max / Step -->
    <section class="space-y-4">
        <h2 id="Min-Max-Step" class="text-lg font-semibold text-on-surface">
            <a
                href="#Min-Max-Step"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Min / Max / Step
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">min</code
            >,
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">max</code>,
            and
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">step</code> to
            constrain the value.
        </p>
        <div class="flex flex-wrap items-end gap-4">
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">min=0 max=10 step=1</p>
                <InputNumber min={0} max={10} step={1} />
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">min=0 max=100 step=10</p>
                <InputNumber min={0} max={100} step={10} value={50} />
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">min=-50 max=50 step=5</p>
                <InputNumber min={-50} max={50} step={5} value={0} />
            </div>
        </div>
    </section>

    <!-- Size -->
    <section class="space-y-4">
        <h2 id="Size" class="text-lg font-semibold text-on-surface">
            <a
                href="#Size"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Size
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code
            > to control the dimensions and text size.
        </p>
        <div class="flex flex-wrap items-end gap-4">
            {#each sizes as size (size)}
                <div class="space-y-1">
                    <p class="text-xs text-on-surface-variant">{size}</p>
                    <InputNumber {size} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Color -->
    <section class="space-y-4">
        <h2 id="Color" class="text-lg font-semibold text-on-surface">
            <a
                href="#Color"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Color
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >color</code
            > to set the focus ring color.
        </p>
        <div class="flex flex-wrap gap-4">
            {#each colors as color (color)}
                <div class="space-y-1">
                    <p class="text-xs text-on-surface-variant capitalize">{color}</p>
                    <InputNumber {color} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Highlight -->
    <section class="space-y-4">
        <h2 id="Highlight" class="text-lg font-semibold text-on-surface">
            <a
                href="#Highlight"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Highlight
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >highlight</code
            > to permanently show the ring, useful for error states.
        </p>
        <div class="flex flex-wrap gap-4">
            {#each colors as color (color)}
                <div class="space-y-1">
                    <p class="text-xs text-on-surface-variant capitalize">{color}</p>
                    <InputNumber highlight {color} />
                </div>
            {/each}
        </div>
    </section>

    <!-- Disabled -->
    <section class="space-y-4">
        <h2 id="Disabled" class="text-lg font-semibold text-on-surface">
            <a
                href="#Disabled"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Disabled
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >disabled</code
            > to prevent any interaction.
        </p>
        <div class="flex flex-wrap gap-4">
            <InputNumber disabled />
            <InputNumber disabled value={42} />
        </div>
    </section>

    <Separator />

    <!-- Real World Examples -->
    <section class="space-y-4">
        <h2 id="Real-World-Examples" class="text-lg font-semibold text-on-surface">
            <a
                href="#Real-World-Examples"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Real World Examples
            </a>
        </h2>

        <div class="space-y-6">
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Quantity selector</p>
                <div
                    class="inline-flex items-center gap-3 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <span class="text-sm text-on-surface-variant">Qty:</span>
                    <InputNumber min={1} max={99} value={1} size="sm" />
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Error state</p>
                <div class="space-y-1">
                    <InputNumber color="error" highlight value={-1} min={0} />
                    <p class="text-xs text-error">Value must be 0 or greater.</p>
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Custom slot classes</p>
                <InputNumber
                    value={10}
                    ui={{
                        root: 'w-44',
                        input: 'font-mono text-center',
                        button: 'bg-primary text-on-primary hover:bg-primary/90'
                    }}
                />
            </div>
        </div>
    </section>
</div>
