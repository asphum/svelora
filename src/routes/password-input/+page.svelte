<script lang="ts">
    import { PasswordInput } from '$lib/index.js'
    
    let pwd1 = $state('')
    let pwd2 = $state('')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">PasswordInput</h1>
        <p class="text-on-surface-variant">
            A secure input for passwords with a built-in visibility toggle and strength meter.
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
            Behaves like a regular <code class="rounded bg-surface-container-highest px-1">Input</code> but adds an eye icon to toggle visibility.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput bind:value={pwd1} placeholder="Enter your password" />
        </div>
    </section>

    <!-- Strength Meter -->
    <section class="space-y-3">
        <h2 id="Strength-Meter" class="text-lg font-semibold">
<a href="#Strength-Meter" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Strength Meter
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">showStrength={`{true}`}</code> to display a color-coded strength indicator below the input.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput bind:value={pwd2} showStrength={true} placeholder="Create a strong password" />
        </div>
    </section>
</div>
