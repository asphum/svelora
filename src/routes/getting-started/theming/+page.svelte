<script lang="ts">
    import { Alert, Card } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-3xl font-bold">Theming</h1>
        <p class="text-on-surface-variant">
            Svelora ships with OKLCH color tokens following Material Design 3. Override the
            default values via CSS custom properties.
        </p>
    </div>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Color tokens</h2>
        <p class="text-on-surface-variant">
            Every color is exposed as a CSS custom property on <code
                class="rounded bg-surface-container px-1">:root</code
            >. Override any of them to retheme the library.
        </p>
        <Card>
            <pre class="overflow-x-auto text-sm"><code
                    >{`@layer base {
  :root {
    --color-primary: oklch(0.55 0.18 250);
    --color-secondary: oklch(0.55 0.18 320);
    --color-surface: oklch(0.985 0.002 247.84);
    --color-on-surface: oklch(0.145 0.014 247.09);
  }

  .dark {
    --color-primary: oklch(0.7 0.15 250);
    --color-surface: oklch(0.145 0.014 247.09);
    --color-on-surface: oklch(0.929 0.013 255.51);
  }
}`}</code
                ></pre>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Available tokens</h2>
        <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {#each ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info', 'surface', 'surface-container', 'surface-container-high', 'outline', 'on-surface', 'on-surface-variant'] as token (token)}
                <Card variant="soft">
                    <code class="text-sm">--color-{token}</code>
                </Card>
            {/each}
        </div>
    </section>

    <Alert
        variant="soft"
        color="info"
        title="Variants"
        description="Component variants (color, size, variant) can also be customized globally via the defineConfig API. See /customization for details."
    />
</div>
