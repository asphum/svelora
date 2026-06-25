<script lang="ts">
    import { TreeView } from '$lib/index.js'
    import type { TreeItem } from '$lib/index.js'
    
    const treeData: TreeItem[] = [
        {
            id: '1',
            label: 'src',
            icon: 'lucide:folder',
            children: [
                {
                    id: '1-1',
                    label: 'lib',
                    icon: 'lucide:folder',
                    children: [
                        { id: '1-1-1', label: 'index.ts', icon: 'lucide:file-code' },
                        { id: '1-1-2', label: 'utils.ts', icon: 'lucide:file-code' }
                    ]
                },
                {
                    id: '1-2',
                    label: 'routes',
                    icon: 'lucide:folder',
                    children: [
                        { id: '1-2-1', label: '+page.svelte', icon: 'lucide:file' },
                        { id: '1-2-2', label: '+layout.svelte', icon: 'lucide:file' }
                    ]
                }
            ]
        },
        {
            id: '2',
            label: 'package.json',
            icon: 'lucide:file-json'
        }
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">TreeView</h1>
        <p class="text-on-surface-variant">
            A component for displaying hierarchical data in a collapsible tree structure.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Pass an array of <code class="rounded bg-surface-container-highest px-1">TreeItem</code> objects to the <code class="rounded bg-surface-container-highest px-1">items</code> prop. Each item must have an <code class="rounded bg-surface-container-highest px-1">id</code> and <code class="rounded bg-surface-container-highest px-1">label</code>.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-sm p-4 bg-surface rounded-lg border border-outline-variant">
                <TreeView items={treeData} />
            </div>
        </div>
    </section>
</div>
