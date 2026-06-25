<script lang="ts">
    import { NavigationMenu, Separator, Badge } from '$lib/index.js'
    import type { NavigationMenuItemType } from '$lib/index.js'

    // --- Basic Navbar ---
    const basicLinks: NavigationMenuItemType[] = [
        { label: 'Home', href: '/', icon: 'lucide:home', active: true },
        { label: 'Components', href: '/docs/components/button', icon: 'lucide:box' },
        { label: 'Changelog', href: '/changelog', badge: 'v3.0.7', badgeColor: 'info' },
        { label: 'GitHub', href: 'https://github.com/asphum/svelora', icon: 'simple-icons:github', target: '_blank' }
    ]

    // --- Navbar with Dropdowns ---
    const dropdownLinks: NavigationMenuItemType[] = [
        { label: 'Dashboard', icon: 'lucide:layout-dashboard', href: '/dashboard' },
        {
            label: 'Products',
            icon: 'lucide:shopping-bag',
            items: [
                { type: 'item', label: 'All Products', icon: 'lucide:package' },
                { type: 'item', label: 'Categories', icon: 'lucide:tags' },
                { type: 'separator' },
                { type: 'item', label: 'Add New Product', icon: 'lucide:plus', kbds: ['meta', 'P'] }
            ]
        },
        {
            label: 'Settings',
            icon: 'lucide:settings',
            items: [
                { type: 'item', label: 'Profile', icon: 'lucide:user' },
                { type: 'item', label: 'Billing', icon: 'lucide:credit-card' },
                {
                    type: 'sub',
                    label: 'Preferences',
                    icon: 'lucide:sliders',
                    items: [
                        { type: 'item', label: 'Theme', icon: 'lucide:palette' },
                        { type: 'item', label: 'Notifications', icon: 'lucide:bell' }
                    ]
                }
            ]
        }
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Navigation Menu</h1>
        <p class="text-on-surface-variant">
            A horizontal navigation bar supporting active states, icons, badges, and nested dropdown submenus.
        </p>
    </div>

    <!-- Basic Navbar -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Basic Navigation</h2>
        <p class="text-sm text-on-surface-variant">
            A simple list of links. Use the <code class="rounded bg-surface-container-highest px-1">items</code> prop to define your navigation.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex flex-col gap-4">
            <div class="w-full bg-surface border border-outline-variant rounded-xl shadow-sm px-4 py-2 flex items-center justify-between">
                <span class="font-bold text-lg mr-8">Brand</span>
                <NavigationMenu items={basicLinks} class="flex-1" />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Dropdowns -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">With Dropdowns</h2>
        <p class="text-sm text-on-surface-variant">
            If an item provides an <code class="rounded bg-surface-container-highest px-1">items</code> array, it will automatically render as a DropdownMenu trigger. This supports deep nesting natively.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <div class="w-full bg-surface border border-outline-variant rounded-xl shadow-sm px-4 py-2 flex items-center">
                <NavigationMenu items={dropdownLinks} />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Ghost Variant -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Ghost Variant</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">variant="ghost"</code> for a more subtle styling (often used for secondary navigations).
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <div class="w-full bg-surface border border-outline-variant rounded-xl shadow-sm px-4 py-2 flex items-center">
                <NavigationMenu items={dropdownLinks} variant="ghost" />
            </div>
        </div>
    </section>
</div>
