<script lang="ts">
    import { Button, Card, Link, SortableList } from '$lib/index.js'

    type Item = { id: string; label: string }

    let items = $state<Item[]>([
        { id: '1', label: 'Inbox zero' },
        { id: '2', label: 'Prepare release notes' },
        { id: '3', label: 'Record demo video' },
        { id: '4', label: 'Update changelog' }
    ])

    let horizontalItems = $state<Item[]>([
        { id: 'h1', label: 'Draft' },
        { id: 'h2', label: 'Review' },
        { id: 'h3', label: 'Publish' }
    ])

    let wholeRowItems = $state<Item[]>([
        { id: 'w1', label: 'Drag anywhere on this row' },
        { id: 'w2', label: 'No grip handle' }
    ])

    let sortDisabled = $state(false)

    const propsReference = [
        { name: 'items', type: 'T[]', description: 'Bindable array — updated automatically on reorder.' },
        { name: 'getKey', type: '(item: T) => string | number', description: 'Stable key per item (used in #each).' },
        { name: 'onReorder', type: '(items: T[]) => void', description: 'Optional callback after bind:items updates.' },
        { name: 'handle', type: 'boolean', description: 'Show grip handle. Default true. Set false to drag the whole row.' },
        { name: 'axis', type: "'vertical' | 'horizontal'", description: 'List layout axis. Default vertical.' },
        { name: 'disabled', type: 'boolean', description: 'Disable sorting.' },
        { name: 'class', type: 'ClassNameValue', description: 'Classes on the list container.' },
        { name: 'itemClass', type: 'ClassNameValue', description: 'Classes on each sortable row.' }
    ] as const

    const snippetReference = [
        { name: 'item', type: 'T', description: 'The row item.' },
        { name: 'index', type: 'number', description: 'Zero-based position in the array.' },
        { name: 'dragging', type: 'boolean', description: 'True while this row is being dragged.' }
    ] as const

    function resetItems() {
        items = [
            { id: '1', label: 'Inbox zero' },
            { id: '2', label: 'Prepare release notes' },
            { id: '3', label: 'Record demo video' },
            { id: '4', label: 'Update changelog' }
        ]
    }
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">SortableList</h1>
        <p class="text-on-surface-variant">
            Opinionated sortable list built on
            <Link href="/docs/hooks/use-sortable" class="text-primary underline">useSortable</Link>.
            Uses <code class="rounded bg-surface-container-high px-1">bind:items</code>
            to keep array state in sync. For kanban or cross-column moves, use
            <Link href="/docs/hooks/use-drag-drop" class="text-primary underline">useDragDrop</Link>.
        </p>
    </div>

    <section class="space-y-3">
        <h2 id="When-to-use-what" class="text-lg font-semibold">
            <a href="#When-to-use-what" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                When to use what
            </a>
        </h2>
        <Card class="border border-outline-variant/70 p-4 text-sm text-on-surface-variant">
            <p>
                Use <strong class="text-on-surface">SortableList</strong> for standard vertical/horizontal task lists with a grip handle.
                Use <Link href="/docs/hooks/use-sortable" class="text-primary underline">useSortable</Link> directly when you need full control over markup.
                See the <Link href="/docs/hooks/use-sortable#When-to-use-what" class="text-primary underline">drag & drop overview</Link>
                for FileUpload and Editor.
            </p>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="Basic" class="text-lg font-semibold">
            <a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Basic
            </a>
        </h2>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items disabled={sortDisabled} getKey={(item) => item.id}>
                {#snippet children({ item, index, dragging })}
                    <div class="flex w-full items-center justify-between gap-3">
                        <span class="text-sm font-medium" class:opacity-60={dragging}>{item.label}</span>
                        <span class="text-xs text-on-surface-variant">#{index + 1}</span>
                    </div>
                {/snippet}
            </SortableList>
        </Card>
        <div class="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" label="Reset" onclick={resetItems} />
            <Button
                variant={sortDisabled ? 'solid' : 'outline'}
                size="sm"
                label={sortDisabled ? 'Sorting disabled' : 'Disable sorting'}
                onclick={() => (sortDisabled = !sortDisabled)}
            />
        </div>
    </section>

    <section class="space-y-3">
        <h2 id="Horizontal" class="text-lg font-semibold">
            <a href="#Horizontal" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Horizontal
            </a>
        </h2>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={horizontalItems} axis="horizontal" getKey={(item) => item.id}>
                {#snippet children({ item })}
                    <span class="text-sm font-medium">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="Whole-row-drag" class="text-lg font-semibold">
            <a href="#Whole-row-drag" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Whole row drag
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">Set <code class="rounded bg-surface-container-high px-1">handle={'{false}'}</code> to drag the entire row.</p>
        <Card class="border border-outline-variant/70 p-4">
            <SortableList bind:items={wholeRowItems} handle={false} getKey={(item) => item.id}>
                {#snippet children({ item })}
                    <span class="cursor-grab text-sm font-medium active:cursor-grabbing">{item.label}</span>
                {/snippet}
            </SortableList>
        </Card>
    </section>

    <section class="space-y-3">
        <h2 id="API-Reference" class="text-lg font-semibold">
            <a href="#API-Reference" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                API Reference
            </a>
        </h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Props</h3>
                    <div class="space-y-3">
                        {#each propsReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-primary">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">children snippet</h3>
                    <div class="space-y-3">
                        {#each snippetReference as item (item.name)}
                            <div class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0">
                                <p class="font-mono text-xs text-primary">{item.name}</p>
                                <p class="mt-1 text-sm font-medium">{item.type}</p>
                                <p class="mt-1 text-sm text-on-surface-variant">{item.description}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
    </section>
</div>
