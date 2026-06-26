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

    // --- Vertical Sidebar Links ---
    const sidebarLinks: NavigationMenuItemType[] = [
        { label: 'Overview', icon: 'lucide:layout-dashboard', href: '/dashboard' },
        {
            label: 'Analytics',
            icon: 'lucide:bar-chart-2',
            defaultOpen: true,
            items: [
                { type: 'item', label: 'Reports', icon: 'lucide:file-text' },
                { type: 'item', label: 'Traffic', icon: 'lucide:activity' }
            ]
        },
        {
            label: 'Settings',
            icon: 'lucide:settings',
            items: [
                { type: 'item', label: 'Profile', icon: 'lucide:user' },
                { type: 'item', label: 'Billing', icon: 'lucide:credit-card' }
            ]
        }
    ]

    // --- Tree Sidebar Links ---
    const treeLinks: NavigationMenuItemType[] = [
        { label: 'Overview', icon: 'lucide:layout-dashboard', href: '/dashboard' },
        {
            label: 'Analytics',
            icon: 'lucide:bar-chart-2',
            badge: 2,
            defaultOpen: true,
            items: [
                { type: 'item', label: 'Reports', icon: 'lucide:file-text', active: true },
                { type: 'item', label: 'Traffic', icon: 'lucide:activity' }
            ]
        },
        {
            label: 'Settings',
            icon: 'lucide:settings',
            badge: 3,
            items: [
                { type: 'item', label: 'Profile', icon: 'lucide:user' },
                { type: 'item', label: 'Preferences', icon: 'lucide:sliders' },
                { type: 'item', label: 'Billing', icon: 'lucide:credit-card' }
            ]
        }
    ]
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Navigation Menu</h1>
        <p class="text-on-surface-variant">
            A unified navigation component that supports both horizontal and vertical orientations.
        </p>
    </div>

    <!-- Basic Navbar -->
    <section class="space-y-3">
        <h2 id="Basic-Navigation" class="text-lg font-semibold">
<a href="#Basic-Navigation" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Navigation
                    </a>
</h2>
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
        <h2 id="Grouping-2D-Arrays" class="text-lg font-semibold">
<a href="#Grouping-2D-Arrays" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Grouping (2D Arrays)
                    </a>
</h2>
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

    <!-- Vertical Orientation (Accordion) -->
    <section class="space-y-3">
        <h2 id="Vertical-Sidebar--Accordion" class="text-lg font-semibold">
<a href="#Vertical-Sidebar--Accordion" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Vertical (Sidebar & Accordion)
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">orientation="vertical"</code> to render as a sidebar menu. Nested sub-menus will automatically render as smoothly expanding accordions! Add <code class="rounded bg-surface-container-highest px-1">accordion="true"</code> to restrict opening to one group at a time.
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex gap-8">
            <div class="w-64 bg-surface border border-outline-variant rounded-xl shadow-sm p-3 flex flex-col items-start">
                <p class="text-xs font-semibold text-on-surface-variant px-3 mb-2 uppercase tracking-wider">Multi-Open</p>
                <NavigationMenu items={sidebarLinks} orientation="vertical" variant="ghost" />
            </div>
            
            <div class="w-64 bg-surface border border-outline-variant rounded-xl shadow-sm p-3 flex flex-col items-start">
                <p class="text-xs font-semibold text-on-surface-variant px-3 mb-2 uppercase tracking-wider">Strict Accordion</p>
                <NavigationMenu items={sidebarLinks} orientation="vertical" variant="ghost" accordion />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Tree Style (Lines & Badges) -->
    <section class="space-y-3">
        <h2 id="Tree-Style" class="text-lg font-semibold">
<a href="#Tree-Style" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        
            Tree Style
        
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Set <code class="rounded bg-surface-container-highest px-1">tree="true"</code> to render connecting lines for nested sub-menus. This style pairs well with badges indicating the number of child items!
        </p>
        <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 flex gap-8">
            <div class="w-64 bg-surface border border-outline-variant rounded-xl shadow-sm p-3 flex flex-col items-start">
                <p class="text-xs font-semibold text-on-surface-variant px-3 mb-2 uppercase tracking-wider">With Lines & Badges</p>
                <NavigationMenu items={treeLinks} orientation="vertical" variant="ghost" tree accordion />
            </div>
        </div>
    </section>

    <Separator />

    <!-- Auto-Active State -->
    <section class="space-y-3">
        <h2 id="Auto-Active-State" class="text-lg font-semibold">
            <a href="#Auto-Active-State" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Auto-Active State
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            NavigationMenu automatically detects the current URL and highlights matching links! It features a powerful Longest Prefix Match algorithm and supports exact/prefix matching out of the box.
        </p>
        
        <div class="space-y-4 mt-4">
            <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
                <h3 class="text-sm font-semibold mb-2">Exact Match (Default)</h3>
                <p class="text-sm text-on-surface-variant mb-4">By default, <code class="rounded bg-surface-container-highest px-1">exact: true</code> is assumed. The item will only be active if the current URL matches its <code class="rounded bg-surface-container-highest px-1">href</code> perfectly.</p>
            </div>

            <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
                <h3 class="text-sm font-semibold mb-2">Prefix Match</h3>
                <p class="text-sm text-on-surface-variant mb-4">Set <code class="rounded bg-surface-container-highest px-1">exact: false</code> on an item to make it active whenever the URL starts with its <code class="rounded bg-surface-container-highest px-1">href</code>. Great for top-level navigation tabs!</p>
            </div>

            <div class="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
                <h3 class="text-sm font-semibold mb-2">Advanced: Match Pattern</h3>
                <p class="text-sm text-on-surface-variant mb-4">If your <code class="rounded bg-surface-container-highest px-1">href</code> points to a deep subpage (like <code class="text-primary">/docs/components/button</code>) but you want it to act as the parent tab for the whole section, use <code class="rounded bg-surface-container-highest px-1">matchPattern</code> to tell the menu what URL to match against!</p>
            </div>
        </div>
    </section>
</div>
