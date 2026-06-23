<script lang="ts">
    import { Button, Card, Icon, Link } from '$lib/index.js'
    import {
        docsComponentGroups,
        docsHookItems,
        docsIntroItems,
        docsMeta,
        docsThemeItems,
        totalComponents
    } from '$lib/docs/navigation.js'

    const usageCode = `<script lang="ts">
 import { Button, Card, Badge } from 'svelora';
<` + `/script>

<Card>
 <h3>Welcome</h3>
 <p>Build beautiful UIs with Svelte 5.</p>

 <div class="flex gap-2">
  <Button label="Get Started" color="primary" />
  <Badge label="${docsMeta.version}" variant="soft" color="success" />
 </div>
</Card>`

    const builtWith = [
        { title: 'Svelte 5', description: 'Runes & snippets', icon: 'lucide:zap' },
        { title: 'Tailwind 4', description: 'Utility-first CSS', icon: 'lucide:palette' },
        { title: 'bits-ui', description: 'Headless primitives', icon: 'lucide:layers' },
        { title: 'TypeScript', description: 'Full type safety', icon: 'lucide:code-xml' }
    ] as const
</script>

<div class="space-y-12">
    <section class="space-y-5 border-b border-outline-variant/60 pb-10">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>Getting Started</li>
            </ol>
        </nav>

        <div class="space-y-4">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Getting Started
            </p>
            <h1 class="text-4xl font-semibold tracking-tight">Build beautiful UIs with Svelora</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                A modern, accessible UI component library built natively for
                <strong> Svelte 5 </strong>
                and
                <strong> Tailwind CSS 4 </strong>.
                Ship faster with {totalComponents}+ production-ready components.
            </p>
            <div class="flex flex-wrap gap-3">
                <Button label="Installation" href="/docs/installation" leadingIcon="lucide:download" />
                <Button
                    label="Browse Components"
                    href="/docs/components/button"
                    variant="outline"
                    color="secondary"
                    leadingIcon="lucide:layout-grid"
                />
            </div>
        </div>
    </section>

    <section class="space-y-6">
        <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Quick Start</h2>
            <p class="text-on-surface-variant">Install and start using Svelora in two steps.</p>
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <div class="flex items-center gap-2 text-on-surface-variant">
                        <Icon name="lucide:package" size="18" />
                        <span class="text-sm font-medium">1. Install the package</span>
                    </div>
                    <div class="rounded-2xl bg-surface-container p-4 font-mono text-sm">
                        <code>{docsMeta.npmCommand}</code>
                    </div>
                </div>
            </Card>

            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <div class="flex items-center gap-2 text-on-surface-variant">
                        <Icon name="lucide:code" size="18" />
                        <span class="text-sm font-medium">2. Use components</span>
                    </div>
                    <div class="rounded-2xl bg-surface-container p-4 font-mono text-xs">
                        <pre class="overflow-x-auto whitespace-pre-wrap">{usageCode}</pre>
                    </div>
                </div>
            </Card>
        </div>
    </section>

    <section class="space-y-6">
        <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Components</h2>
            <p class="text-on-surface-variant">
                {totalComponents}+ components across {docsComponentGroups.length} categories.
            </p>
        </div>

        <div class="space-y-6">
            {#each docsComponentGroups as group (group.title)}
                <div class="space-y-3">
                    <div class="flex items-baseline gap-2">
                        <h3 class="text-lg font-semibold">{group.title}</h3>
                        <span class="text-sm text-on-surface-variant">{group.items.length}</span>
                    </div>
                    <div class="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                        {#each group.items as item (item.href)}
                            <Link
                                href={item.href}
                                raw
                                class="group flex items-center gap-3 rounded-2xl border border-outline-variant px-4 py-3 transition-colors hover:border-primary hover:bg-surface-container"
                            >
                                <Icon
                                    name={item.icon}
                                    size="18"
                                    class="text-on-surface-variant group-hover:text-primary"
                                />
                                <span class="text-sm font-medium group-hover:text-primary">
                                    {item.title}
                                </span>
                            </Link>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="space-y-6">
        <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Hooks</h2>
            <p class="text-on-surface-variant">Utility hooks for common interactions and reactive patterns.</p>
        </div>

        <div class="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {#each docsHookItems as item (item.href)}
                <Link
                    href={item.href}
                    raw
                    class="group flex items-center gap-3 rounded-2xl border border-outline-variant px-4 py-3 transition-colors hover:border-primary hover:bg-surface-container"
                >
                    <Icon
                        name={item.icon}
                        size="18"
                        class="text-on-surface-variant group-hover:text-primary"
                    />
                    <span class="font-mono text-sm group-hover:text-primary">{item.title}</span>
                </Link>
            {/each}
        </div>
    </section>

    <section class="space-y-6">
        <div class="space-y-2">
            <h2 class="text-2xl font-semibold">Built With</h2>
            <p class="text-on-surface-variant">Powered by the modern Svelte ecosystem.</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {#each builtWith as item (item.title)}
                <Card variant="soft" class="border border-outline-variant/70">
                    <div class="space-y-3">
                        <div class="flex size-11 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                            <Icon name={item.icon} size="20" />
                        </div>
                        <div class="space-y-1">
                            <h3 class="font-semibold">{item.title}</h3>
                            <p class="text-sm text-on-surface-variant">{item.description}</p>
                        </div>
                    </div>
                </Card>
            {/each}
        </div>
    </section>

    <section class="space-y-4 border-t border-outline-variant/60 pt-8">
        <div class="flex flex-wrap gap-3">
            {#each [...docsIntroItems.slice(1), ...docsThemeItems] as item (item.href)}
                <Button
                    label={item.title}
                    href={item.href}
                    variant="outline"
                    color="secondary"
                    trailingIcon="lucide:arrow-right"
                />
            {/each}
        </div>
    </section>
</div>
