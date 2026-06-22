<script lang="ts">
    import { Alert, Card, Icon } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-3xl font-bold">Dark Mode</h1>
        <p class="text-on-surface-variant">
            Svelora has full dark mode support out of the box. Switch between light, dark, or
            system themes with a single component.
        </p>
    </div>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Setup</h2>
        <p class="text-on-surface-variant">
            Add <code class="rounded bg-surface-container px-1">ModeWatcher</code> to your root layout
            to enable automatic dark mode handling and persistence.
        </p>
        <Card>
            <pre class="overflow-x-auto text-sm"><code
                    >{`// src/routes/+layout.svelte
&lt;script&gt;
    import 'svelora/theme.css'
    import { ModeWatcher } from 'svelora'
&lt;/script&gt;

&lt;ModeWatcher defaultMode="system" /&gt;`}</code
                ></pre>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Toggle button</h2>
        <p class="text-on-surface-variant">
            Use <code class="rounded bg-surface-container px-1">toggleMode</code> directly from
            <code class="rounded bg-surface-container px-1">svelora</code>:
        </p>
        <Card>
            <pre class="overflow-x-auto text-sm"><code
                    >{`&lt;script&gt;
    import { Button, Icon, toggleMode } from 'svelora'
&lt;/script&gt;

&lt;Button icon="lucide:moon" onclick={toggleMode} square /&gt;`}</code
                ></pre>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Programmatic API</h2>
        <div class="grid gap-3 sm:grid-cols-3">
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:check" class="mt-0.5 text-success" />
                    <div>
                        <h3 class="font-semibold">setMode('light')</h3>
                        <p class="text-sm text-on-surface-variant">Set explicit theme</p>
                    </div>
                </div>
            </Card>
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:check" class="mt-0.5 text-success" />
                    <div>
                        <h3 class="font-semibold">setMode('dark')</h3>
                        <p class="text-sm text-on-surface-variant">Force dark theme</p>
                    </div>
                </div>
            </Card>
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:check" class="mt-0.5 text-success" />
                    <div>
                        <h3 class="font-semibold">setMode('system')</h3>
                        <p class="text-sm text-on-surface-variant">Follow OS preference</p>
                    </div>
                </div>
            </Card>
        </div>
    </section>

    <Alert
        variant="soft"
        color="info"
        description="All Svelora components automatically respond to the current theme. Import ModeWatcher, toggleMode, and setMode directly from svelora."
    />
</div>
