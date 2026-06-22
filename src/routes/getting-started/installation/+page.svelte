<script lang="ts">
    import { Alert, Card } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-3xl font-bold">Installation</h1>
        <p class="text-on-surface-variant">
            Install the `svelora` package using your favorite package manager.
        </p>
    </div>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Install package</h2>

        <Card>
            <div class="flex items-center justify-between gap-3">
                <code class="font-mono text-sm">npm install svelora</code>
                <span
                    class="rounded bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface-variant"
                >npm</span>
            </div>
        </Card>

        <Card>
            <div class="flex items-center justify-between gap-3">
                <code class="font-mono text-sm">pnpm add svelora</code>
                <span
                    class="rounded bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface-variant"
                >pnpm</span>
            </div>
        </Card>

        <Card>
            <div class="flex items-center justify-between gap-3">
                <code class="font-mono text-sm">yarn add svelora</code>
                <span
                    class="rounded bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface-variant"
                >yarn</span>
            </div>
        </Card>

        <Card>
            <div class="flex items-center justify-between gap-3">
                <code class="font-mono text-sm">bun add svelora</code>
                <span
                    class="rounded bg-surface-container px-2 py-0.5 text-xs font-medium text-on-surface-variant"
                >bun</span>
            </div>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Setup root layout</h2>
        <p class="text-on-surface-variant">
            Import the theme CSS and the <code class="rounded bg-surface-container px-1">ModeWatcher</code>
            component in your root layout to enable dark mode. No extra dark mode package is
            needed after installing <code class="rounded bg-surface-container px-1">svelora</code>.
        </p>
        <Card>
            <pre class="overflow-x-auto text-sm"><code
                    >{`// src/routes/+layout.svelte
&lt;script&gt;
    import 'svelora/theme.css'
    import { ModeWatcher } from 'svelora'
&lt;/script&gt;

&lt;ModeWatcher /&gt;
&lt;slot /&gt;`}</code
                ></pre>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Use components</h2>
        <p class="text-on-surface-variant">
            Import any component and use it in your markup.
        </p>
        <Card>
            <pre class="overflow-x-auto text-sm"><code
                    >{`&lt;script lang="ts"&gt;
    import { Button, Card, Badge } from 'svelora'
&lt;/script&gt;

&lt;Card&gt;
    &lt;h3&gt;Hello&lt;/h3&gt;
    &lt;p&gt;Svelora is ready.&lt;/p&gt;
    &lt;div class="flex gap-2"&gt;
        &lt;Button label="Get Started" color="primary" /&gt;
        &lt;Badge label="v2.1.0" variant="soft" color="success" /&gt;
    &lt;/div&gt;
&lt;/Card&gt;`}</code
                ></pre>
        </Card>
    </section>

    <Alert
        variant="soft"
        color="success"
        title="You're all set!"
        description="Theme, dark mode, and components are ready to use. Check the Components section to browse all 53+ components."
    />
</div>
