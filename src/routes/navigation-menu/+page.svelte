<script lang="ts">
    import { NavigationMenu, Separator } from '$lib/index.js'
    import type { NavigationMenuItemType } from '$lib/index.js'

    // --- Basic Navbar (1D Array) ---
    const basicLinks: NavigationMenuItemType[] = [
        { label: 'Home', href: '/', icon: 'lucide:home', active: true },
        { label: 'Components', href: '/docs/components/button', icon: 'lucide:box' },
        { label: 'Changelog', href: '/changelog', badge: 'v3.0.7', badgeColor: 'info' }
    ]

    // --- Unified Navbar (2D Array) ---
    const unifiedLinks: NavigationMenuItemType[][] = [
        [
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
            }
        ],
        [
            { label: 'GitHub', icon: 'simple-icons:github', href: 'https://github.com/asphum/svelora', target: '_blank', badge: 'v3' },
            {
                label: 'Settings',
                icon: 'lucide:settings',
                items: [
                    { type: 'item', label: 'Profile', icon: 'lucide:user' },
                    { type: 'item', label: 'Preferences', icon: 'lucide:sliders' }
                ]
            }
        ]
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Navigation Menu</h1>
        <p class="text-on-surface-variant">
            A unified navigation component that supports both horizontal and vertical orientations, along with 2D array grouping.
        </p>
    </div>

    <!-- Basic Navbar -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Basic Navigation</h2>
        <p class="text-sm text-on-surface-variant">
            A simple 1D list of links. Use the <code class="rounded bg-surface-container-highest px-1">items</code> prop to define your navigation.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex flex-col gap-4">
            <div class="w-full bg-surface border border-outline-variant rounded-xl shadow-sm px-4 py-2 flex items-center justify-between">
                <span class="font-bold text-lg mr-8">Brand</span>
                <NavigationMenu items={basicLinks} class="flex-1" />
            </div>
        </div>
    </section>

    <Separator />

    <!-- 2D Array Grouping -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Grouping (2D Arrays)</h2>
        <p class="text-sm text-on-surface-variant">
            Pass a 2D array (<code class="rounded bg-surface-container-highest px-1">items=[ [leftItems], [rightItems] ]</code>) to easily group links on opposite sides of the navbar.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <div class="w-full bg-surface border border-outline-variant rounded-xl shadow-sm px-4 py-2 flex items-center">
                <NavigationMenu items={unifiedLinks} />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Vertical Orientation -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Vertical Orientation</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">orientation="vertical"</code> to render as a sidebar menu. Nested dropdowns will automatically pop out to the right.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
            <div class="w-64 bg-surface border border-outline-variant rounded-xl shadow-sm p-2 flex flex-col items-start">
                <NavigationMenu items={unifiedLinks} orientation="vertical" variant="ghost" />
            </div>
        </div>
    </section>
</div>
