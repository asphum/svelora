<script lang="ts">
    import { Menu, Separator } from '$lib/index.js'
    import type { MenuItemType } from '$lib/index.js'
    
    // --- Basic Flat Menu ---
    const basicItems: MenuItemType[] = [
        { type: 'item', label: 'Dashboard', icon: 'lucide:layout-dashboard', active: true },
        { type: 'item', label: 'Analytics', icon: 'lucide:bar-chart', badge: 'New', badgeColor: 'success' },
        { type: 'item', label: 'Customers', icon: 'lucide:users' },
        { type: 'item', label: 'Settings', icon: 'lucide:settings', shortcut: ['meta', ','] }
    ]

    // --- Complex Sidebar (Collapsible) ---
    const sidebarItems: MenuItemType[] = [
        { type: 'item', label: 'Overview', icon: 'lucide:home' },
        {
            type: 'group',
            label: 'E-commerce',
            icon: 'lucide:shopping-cart',
            open: true,
            items: [
                { type: 'item', label: 'Products', badge: 12 },
                { type: 'item', label: 'Orders', badge: 'Action Required', badgeColor: 'error' },
                { type: 'item', label: 'Customers' }
            ]
        },
        {
            type: 'group',
            label: 'Workspace',
            icon: 'lucide:folder',
            items: [
                { type: 'item', label: 'Projects', icon: 'lucide:briefcase' },
                { type: 'item', label: 'Team', icon: 'lucide:users' }
            ]
        },
        { type: 'item', label: 'Billing', icon: 'lucide:credit-card' }
    ]

    // --- Settings Menu (Shortcuts & Badges) ---
    const settingsItems: MenuItemType[] = [
        { type: 'item', label: 'Profile', icon: 'lucide:user', shortcut: ['shift', 'P'] },
        { type: 'item', label: 'Notifications', icon: 'lucide:bell', badge: 3, badgeColor: 'error' },
        { type: 'item', label: 'Keyboard Shortcuts', icon: 'lucide:keyboard', shortcut: ['meta', 'K'] },
        { type: 'item', label: 'Developer', icon: 'lucide:code', badge: 'Beta', badgeColor: 'warning' },
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Menu</h1>
        <p class="text-on-surface-variant">
            A flexible navigation menu system driven by a data array, supporting groups, badges, and keyboard shortcuts.
        </p>
    </div>

    <Separator />

    <!-- Sidebar Example -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Sidebar Navigation (Collapsible Groups)</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">type: 'group'</code> to create collapsible sections. Set <code class="rounded bg-surface-container-highest px-1">accordion=&#123;true&#125;</code> to allow only one group open at a time.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex justify-center">
            <div class="w-full max-w-sm bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden py-2">
                <Menu items={sidebarItems} />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Badges & Shortcuts -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Badges & Shortcuts</h2>
        <p class="text-sm text-on-surface-variant">
            Add <code class="rounded bg-surface-container-highest px-1">badge</code>, <code class="rounded bg-surface-container-highest px-1">badgeColor</code>, and <code class="rounded bg-surface-container-highest px-1">shortcut</code> properties to any item.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex justify-center">
            <div class="w-full max-w-sm bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden py-2">
                <Menu items={settingsItems} />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Basic Flat -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Basic Menu</h2>
        <p class="text-sm text-on-surface-variant">
            A simple, flat list of actions or links.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex justify-center">
            <div class="w-full max-w-sm bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden py-2">
                <Menu items={basicItems} />
            </div>
        </div>
    </section>
</div>
