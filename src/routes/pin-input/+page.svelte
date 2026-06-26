<script lang="ts">
    import { PinInput, FormField } from '$lib/index.js'

    const colors = [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'error',
        'info',
        'surface'
    ] as const

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    const variants = ['outline', 'soft', 'subtle', 'ghost', 'none'] as const

    let basicValue = $state('')
    let otpValue = $state('')
    let numericValue = $state('')
    let maskedValue = $state('')
    let highlightValue = $state('')
    let formValue = $state('')
    let formFieldValue = $state('')
    let formFieldErrorValue = $state('')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Pin Input</h1>
        <p class="text-on-surface-variant">
            Accessible PIN / OTP input built on bits-ui. Supports masking, numeric mode, OTP
            autocomplete, and form integration.
        </p>
    </div>

    <!-- Basic -->
    <section class="space-y-3">
        <h2 id="Basic" class="text-lg font-semibold">
<a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <PinInput bind:value={basicValue} />
            <p class="text-sm text-on-surface-variant">Value: "{basicValue}"</p>
        </div>
    </section>

    <!-- Lengths -->
    <section class="space-y-3">
        <h2 id="Length" class="text-lg font-semibold">
<a href="#Length" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Length
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">4 cells</p>
                <PinInput length={4} />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">5 cells (default)</p>
                <PinInput />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">6 cells (OTP)</p>
                <PinInput bind:value={otpValue} length={6} otp />
            </div>
        </div>
    </section>

    <!-- Type -->
    <section class="space-y-3">
        <h2 id="Type" class="text-lg font-semibold">
<a href="#Type" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Type
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">
                    type="number" — digits only
                </p>
                <PinInput bind:value={numericValue} type="number" length={6} />
                <p class="text-sm text-on-surface-variant">Value: "{numericValue}"</p>
            </div>
        </div>
    </section>

    <!-- Mask -->
    <section class="space-y-3">
        <h2 id="Mask" class="text-lg font-semibold">
<a href="#Mask" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Mask
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">
                    mask — shows ● instead of characters
                </p>
                <PinInput bind:value={maskedValue} mask />
                <p class="text-sm text-on-surface-variant">Value: "{maskedValue}"</p>
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
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            {#each variants as variant (variant)}
                <div class="flex items-center gap-4">
                    <span class="w-16 text-sm text-on-surface-variant">{variant}</span>
                    <PinInput {variant} />
                </div>
            {/each}
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
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            {#each colors as color (color)}
                <div class="flex items-center gap-4">
                    <span class="w-20 text-sm text-on-surface-variant">{color}</span>
                    <PinInput {color} />
                </div>
            {/each}
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
        <div class="space-y-5 rounded-lg bg-surface-container-high p-6">
            {#each sizes as size (size)}
                <div class="flex items-center gap-4">
                    <span class="w-6 text-xs text-on-surface-variant">{size}</span>
                    <PinInput {size} fixed />
                </div>
            {/each}
        </div>
    </section>

    <!-- Highlight -->
    <section class="space-y-3">
        <h2 id="Highlight" class="text-lg font-semibold">
<a href="#Highlight" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Highlight
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">
                    highlight — all cells show the color ring (e.g. error state)
                </p>
                <PinInput bind:value={highlightValue} highlight color="error" />
            </div>
        </div>
    </section>

    <!-- Placeholder -->
    <section class="space-y-3">
        <h2 id="Placeholder" class="text-lg font-semibold">
<a href="#Placeholder" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Placeholder
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Default (○)</p>
                <PinInput />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Custom (–)</p>
                <PinInput placeholder="–" />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Digit hint (0)</p>
                <PinInput placeholder="0" type="number" length={6} />
            </div>
        </div>
    </section>

    <!-- Disabled -->
    <section class="space-y-3">
        <h2 id="Disabled" class="text-lg font-semibold">
<a href="#Disabled" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Disabled
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <PinInput defaultValue="12" disabled />
        </div>
    </section>

    <!-- Form Integration -->
    <section class="space-y-3">
        <h2 id="Form-Integration" class="text-lg font-semibold">
<a href="#Form-Integration" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Form Integration
                    </a>
</h2>
        <div class="rounded-lg bg-surface-container-high p-6">
            <form
                class="max-w-sm space-y-4"
                onsubmit={(e) => {
                    e.preventDefault()
                    const fd = new FormData(e.currentTarget)
                    alert(`otp = ${fd.get('otp')}`)
                }}
            >
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-on-surface" for="otp-input"
                        >OTP Code</label
                    >
                    <PinInput
                        bind:value={formValue}
                        name="otp"
                        inputId="otp-input"
                        length={6}
                        type="number"
                        otp
                        color="success"
                    />
                </div>
                <button
                    type="submit"
                    class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary"
                >
                    Verify
                </button>
            </form>
        </div>
    </section>

    <!-- FormField Integration -->
    <section class="space-y-3">
        <h2 id="FormField-Integration" class="text-lg font-semibold">
<a href="#FormField-Integration" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        FormField Integration
                    </a>
</h2>
        <div class="max-w-sm space-y-4 rounded-lg bg-surface-container-high p-6">
            <FormField label="Verification Code" description="Enter the 6-digit code sent to you.">
                <PinInput bind:value={formFieldValue} length={6} type="number" otp class="mt-1" />
            </FormField>

            <FormField
                label="PIN"
                error={formFieldErrorValue.length > 0 && formFieldErrorValue.length < 4
                    ? 'PIN must be 4 digits.'
                    : undefined}
            >
                <PinInput bind:value={formFieldErrorValue} length={4} class="mt-1" />
            </FormField>
        </div>
    </section>

    <!-- Custom UI Slots -->
    <section class="space-y-3">
        <h2 id="Custom-UI-Slots" class="text-lg font-semibold">
<a href="#Custom-UI-Slots" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Custom UI Slots
                    </a>
</h2>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-6">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Rounded full cells</p>
                <PinInput color="tertiary" ui={{ base: 'rounded-full' }} />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Large gap</p>
                <PinInput size="lg" color="secondary" ui={{ root: 'gap-3' }} fixed />
            </div>
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Loading" class="text-lg font-semibold text-on-surface">
<a href="#Loading" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Loading
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Pass <code>loading</code> to overlay a spinner and disable input while verifying the
            code (e.g. checking an OTP against the backend). Use <code>loadingIcon</code> to customize
            the spinner.
        </p>
        <div class="flex flex-wrap items-center gap-6 rounded-lg bg-surface-container-high p-4">
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Loading</p>
                <PinInput loading length={6} />
            </div>
            <div class="space-y-2">
                <p class="text-sm font-medium text-on-surface-variant">Loading + masked</p>
                <PinInput loading mask color="primary" length={4} />
            </div>
        </div>
    </section>
</div>
