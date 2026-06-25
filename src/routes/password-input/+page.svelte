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
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Behaves like a regular <code class="rounded bg-surface-container-highest px-1">Input</code> but adds an eye icon to toggle visibility.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput bind:value={pwd1} placeholder="Enter your password" />
        </div>
    </section>

    <!-- Strength Meter -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Strength Meter</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">showStrength={`{true}`}</code> to display a color-coded strength indicator below the input.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput bind:value={pwd2} showStrength={true} placeholder="Create a strong password" />
        </div>
    </section>
</div>
