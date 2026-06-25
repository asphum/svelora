<script lang="ts">
    import { Menu } from '$lib/index.js'
    import type { MenuItemType } from '$lib/index.js'
    
    const menuItems: MenuItemType[] = [
        { type: 'item', label: 'Dashboard', icon: 'lucide:layout-dashboard', active: true },
        { type: 'item', label: 'Analytics', icon: 'lucide:bar-chart' },
        {
            type: 'group',
            label: 'Workspace',
            icon: 'lucide:folder',
            open: true,
            items: [
                { type: 'item', label: 'Projects', icon: 'lucide:briefcase' },
                { type: 'item', label: 'Team Members', icon: 'lucide:users' }
            ]
        },
        { type: 'item', label: 'Settings', icon: 'lucide:settings' }
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Menu</h1>
        <p class="text-on-surface-variant">
            A flexible navigation menu system driven by a data array.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Pass an array of <code class="rounded bg-surface-container-highest px-1">MenuItemType</code> objects to the <code class="rounded bg-surface-container-highest px-1">items</code> prop. Items can be links, buttons, or collapsible groups.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-xs bg-surface border border-outline-variant rounded-lg p-2 shadow-sm">
                <Menu items={menuItems} />
            </div>
        </div>
    </section>
</div>
