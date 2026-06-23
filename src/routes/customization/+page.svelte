<script lang="ts">
    import { Card, Link } from '$lib/index.js'

    const configCode = `import { defineConfig } from 'svelora';

defineConfig({
 button: {
  defaultVariants: { variant: 'outline', color: 'secondary', size: 'sm' }
 },
 avatar: {
  defaultVariants: { size: 'lg' }
 }
});`

    const layoutCode = `<script lang="ts">
 import './layout.css';
 import '../lib/config';
 import { ModeWatcher } from 'svelora';

 let { children } = $props();
<` + `/script>`

    const resetCode = `import { resetConfig } from 'svelora';

resetConfig();`

    const variantsCode = `// src/lib/Button/button.variants.ts
export const buttonVariants = tv({
 variants: {
  variant: {
   solid: '',
   outline: '',
   soft: '',
   gradient: ''
  }
 },
 compoundVariants: [
  {
   variant: 'gradient',
   color: 'primary',
   class: { base: 'bg-linear-to-r from-primary to-tertiary text-on-primary' }
  }
 ]
});`
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>Customization</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Theme & Config
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Customization</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                Configure global defaults, icons, and component slots when you need project-wide consistency.
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Custom Component Defaults</h2>
        <p class="text-on-surface-variant">Create a config file to change default props for all instances.</p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{configCode}</code></pre>
        </Card>
        <p class="text-on-surface-variant">Then import it in your root layout.</p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{layoutCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Reset Config</h2>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{resetCode}</code></pre>
        </Card>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Customizing Variants</h2>
        <p class="text-on-surface-variant">
            Add new variants or modify existing ones in the component variant definitions.
        </p>
        <Card class="border border-outline-variant/70">
            <pre class="overflow-x-auto text-sm"><code>{variantsCode}</code></pre>
        </Card>
    </section>
</div>
