<script lang="ts">
    import { Sidebar, Button, NavigationMenu, Avatar, DropdownMenu } from '$lib/index.js'
    import type { NavigationMenuItemType } from '$lib/components/NavigationMenu/navigation-menu.types.js'
    
    let isCollapsed = $state(false)

    const basicItems: NavigationMenuItemType[] = [
        { label: 'Inbox', icon: 'lucide:inbox', href: '#inbox', badge: 12 },
        { label: 'Sent', icon: 'lucide:send', href: '#sent' },
        { label: 'Drafts', icon: 'lucide:file-text', href: '#drafts' },
        { label: 'Trash', icon: 'lucide:trash-2', href: '#trash' }
    ]

    const groupedItems: NavigationMenuItemType[][] = [
        [
            { label: 'Dashboard', icon: 'lucide:home', href: '#home', active: true },
            { label: 'Analytics', icon: 'lucide:bar-chart-2', href: '#analytics' }
        ],
        [
            { label: 'Customers', icon: 'lucide:users', href: '#customers' },
            { label: 'Orders', icon: 'lucide:shopping-cart', href: '#orders', badge: 'New', badgeColor: 'success' },
            { label: 'Products', icon: 'lucide:package', href: '#products' }
        ],
        [
            { label: 'Settings', icon: 'lucide:settings', href: '#settings' },
            { label: 'Help', icon: 'lucide:help-circle', href: '#help' }
        ]
    ]
</script>

<div class="space-y-12 pb-20">
    <div class="space-y-2 border-b border-outline-variant/60 pb-8">
        <h1 class="text-3xl font-bold tracking-tight">Sidebar</h1>
        <p class="text-lg text-on-surface-variant max-w-3xl">
            A premium layout component with built-in collapsible states, perfect for application shells and dashboards. Integrates seamlessly with <code class="rounded bg-surface-container px-1 text-sm">NavigationMenu</code>.
        </p>
    </div>

    <!-- Basic Usage -->
    <section class="space-y-4">
        <h2 id="Basic" class="text-xl font-semibold">
<a href="#Basic" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic
                    </a>
</h2>
        <p class="text-on-surface-variant text-sm">A simple sidebar with a header, navigation links, and a footer.</p>
        <div class="rounded-xl bg-surface-container-high p-6 flex justify-center overflow-hidden border border-outline-variant/50">
            <div class="w-full max-w-[280px] h-[500px] border border-outline-variant/50 rounded-xl flex overflow-hidden bg-surface dark:bg-surface-900 shadow-sm">
                <Sidebar>
                    {#snippet header()}
                        <div class="w-full flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">A</div>
                            <span class="font-semibold text-lg">Acme Corp</span>
                        </div>
                    {/snippet}
                    
                    {#snippet children()}
                        <div class="space-y-1">
                            <NavigationMenu items={basicItems} orientation="vertical" variant="ghost" />
                        </div>
                    {/snippet}
                    
                    {#snippet footer()}
                        <Button variant="soft" color="surface" class="w-full justify-start text-on-surface-variant">
                            {#snippet children()}
                                <div class="flex items-center gap-3 w-full">
                                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" size="sm" />
                                    <span class="font-medium text-sm truncate flex-1 text-left">Alex Doe</span>
                                </div>
                            {/snippet}
                        </Button>
                    {/snippet}
                </Sidebar>
            </div>
        </div>
    </section>

    <!-- Grouped Sections -->
    <section class="space-y-4">
        <h2 id="Grouped-Sections" class="text-xl font-semibold">
<a href="#Grouped-Sections" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Grouped Sections
                    </a>
</h2>
        <p class="text-on-surface-variant text-sm">Pass an array of arrays to <code class="rounded bg-surface-container px-1 text-sm">NavigationMenu</code> inside the sidebar to create distinct groupings.</p>
        <div class="rounded-xl bg-surface-container-high p-6 flex justify-center overflow-hidden border border-outline-variant/50">
            <div class="w-full max-w-[280px] h-[600px] border border-outline-variant/50 rounded-xl flex overflow-hidden bg-surface dark:bg-surface-900 shadow-sm">
                <Sidebar>
                    {#snippet children()}
                        <div class="space-y-6 mt-2">
                            <div>
                                <p class="px-3 mb-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Overview</p>
                                <NavigationMenu items={groupedItems[0]} orientation="vertical" variant="ghost" />
                            </div>
                            <div>
                                <p class="px-3 mb-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Business</p>
                                <NavigationMenu items={groupedItems[1]} orientation="vertical" variant="ghost" />
                            </div>
                            <div>
                                <p class="px-3 mb-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">System</p>
                                <NavigationMenu items={groupedItems[2]} orientation="vertical" variant="ghost" />
                            </div>
                        </div>
                    {/snippet}
                </Sidebar>
            </div>
        </div>
    </section>

    <!-- Collapsible App Shell -->
    <section class="space-y-4">
        <h2 id="Collapsible-App-Shell" class="text-xl font-semibold">
<a href="#Collapsible-App-Shell" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Collapsible App Shell
                    </a>
</h2>
        <p class="text-on-surface-variant text-sm">
            Pass <code class="rounded bg-surface-container px-1 text-sm">collapsed</code> to the Sidebar. When collapsed, <code class="rounded bg-surface-container px-1 text-sm">NavigationMenu</code> items instantly convert to perfectly proportioned tooltips! Use the <code class="rounded bg-surface-container px-1 text-sm">{"{ collapsed }"}</code> snippet props to conditionally render the header/footer.
        </p>
        <div class="rounded-xl bg-surface-container-high p-6 flex justify-center overflow-hidden border border-outline-variant/50">
            <div class="w-full max-w-4xl h-[600px] border border-outline-variant/50 rounded-xl flex overflow-hidden bg-surface dark:bg-surface-900 shadow-xl">
                <Sidebar collapsed={isCollapsed}>
                    {#snippet header({ collapsed: isCol })}
                        <div class="w-full flex items-center justify-between">
                            {#if !isCol}
                                <span class="font-bold text-lg flex items-center gap-2">
                                    <div class="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center text-sm">S</div>
                                    Svelora
                                </span>
                            {:else}
                                <div class="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center text-sm font-bold">S</div>
                            {/if}
                        </div>
                    {/snippet}
                    
                    {#snippet children()}
                        <div class="space-y-6">
                            <div>
                                {#if !isCollapsed}
                                    <p class="px-3 mb-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Main Menu</p>
                                {/if}
                                <NavigationMenu items={basicItems} orientation="vertical" variant="ghost" />
                            </div>
                            <div>
                                {#if !isCollapsed}
                                    <p class="px-3 mb-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Settings</p>
                                {/if}
                                <NavigationMenu items={groupedItems[2]} orientation="vertical" variant="ghost" />
                            </div>
                        </div>
                    {/snippet}
                    
                    {#snippet footer({ collapsed: isCol })}
                        <div class="w-full flex flex-col gap-3 items-center">
                            <Button 
                                icon={isCol ? "lucide:chevron-right" : "lucide:chevron-left"} 
                                variant="outline" 
                                color="surface"
                                size={isCol ? "md" : "sm"} 
                                class={isCol ? "w-10 h-10 aspect-square p-0" : "w-full justify-center"}
                                onclick={() => isCollapsed = !isCollapsed} 
                            >
                                {#if !isCol} Collapse Sidebar {/if}
                            </Button>

                            {#if !isCol}
                                <DropdownMenu 
                                    items={[
                                        { label: 'Profile', icon: 'lucide:user' },
                                        { label: 'Billing', icon: 'lucide:credit-card' },
                                        { type: 'separator' },
                                        { label: 'Log out', icon: 'lucide:log-out' }
                                    ]}
                                    align="center"
                                >
                                    {#snippet children({ props })}
                                        <button {...props} class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container transition-colors text-left focus:outline-none focus-visible:ring-2 ring-primary">
                                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" size="sm" />
                                            <div class="flex-1 overflow-hidden">
                                                <div class="font-semibold text-sm truncate text-on-surface">Alex Doe</div>
                                                <div class="text-xs text-on-surface-variant truncate">alex@svelora.com</div>
                                            </div>
                                            <div class="text-on-surface-variant opacity-50">
                                                <iconify-icon icon="lucide:chevron-up" class="text-sm"></iconify-icon>
                                            </div>
                                        </button>
                                    {/snippet}
                                </DropdownMenu>
                            {:else}
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" size="sm" class="cursor-pointer" />
                            {/if}
                        </div>
                    {/snippet}
                </Sidebar>
                
                <main class="flex-1 p-8 bg-surface-50 dark:bg-surface-950 flex flex-col">
                    <header class="h-10 flex items-center justify-between border-b border-outline-variant/30 mb-8 pb-4">
                        <h2 id="Dashboard" class="text-2xl font-bold">
<a href="#Dashboard" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Dashboard
                    </a>
</h2>
                        <div class="flex gap-2">
                            <Button variant="soft" icon="lucide:bell" square />
                            <Button variant="solid" color="primary" label="New Project" icon="lucide:plus" />
                        </div>
                    </header>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {#each Array(3) as _, i}
                            <div class="h-32 rounded-xl bg-surface dark:bg-surface-900 border border-outline-variant/40 shadow-sm p-6 flex flex-col justify-between">
                                <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <iconify-icon icon="lucide:activity"></iconify-icon>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold">{(i + 1) * 124}</div>
                                    <div class="text-sm text-on-surface-variant">Total views</div>
                                </div>
                            </div>
                        {/each}
                    </div>
                    
                    <div class="mt-6 flex-1 rounded-xl bg-surface dark:bg-surface-900 border border-outline-variant/40 shadow-sm flex items-center justify-center text-on-surface-variant">
                        Main content area
                    </div>
                </main>
            </div>
        </div>
    </section>

    <!-- Right Positioned (AI Chat Panel) -->
    <section class="space-y-4">
        <h2 id="Right-Positioned--Responsive" class="text-xl font-semibold">
<a href="#Right-Positioned--Responsive" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Right Positioned & Responsive
                    </a>
</h2>
        <p class="text-on-surface-variant text-sm">
            Pass <code class="rounded bg-surface-container px-1 text-sm">position="right"</code> to dock the sidebar on the right side. The borders and Tooltips automatically adapt! 
            <br/><br/>
            <strong>Responsive Design:</strong> Sidebar is purely structural. To hide it on small screens, simply use Tailwind classes like <code class="rounded bg-surface-container px-1 text-sm">hidden md:flex</code> on the Sidebar, and use a <code class="rounded bg-surface-container px-1 text-sm">Drawer</code> component for mobile navigation.
        </p>
        <div class="rounded-xl bg-surface-container-high p-6 flex justify-center overflow-hidden border border-outline-variant/50">
            <div class="w-full max-w-4xl h-[500px] border border-outline-variant/50 rounded-xl flex overflow-hidden bg-surface dark:bg-surface-900 shadow-xl relative">
                
                <main class="flex-1 p-8 bg-surface-50 dark:bg-surface-950 flex flex-col">
                    <header class="h-10 flex items-center justify-between border-b border-outline-variant/30 mb-8 pb-4">
                        <h2 id="Workspace" class="text-2xl font-bold">
<a href="#Workspace" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Workspace
                    </a>
</h2>
                        <div class="flex gap-2">
                            <!-- Mobile toggle button (hidden on desktop) -->
                            <Button variant="soft" icon="lucide:menu" class="md:hidden" />
                        </div>
                    </header>
                    <div class="flex-1 border-2 border-dashed border-outline-variant/30 rounded-xl flex items-center justify-center text-on-surface-variant">
                        Main Canvas Area
                    </div>
                </main>

                <!-- Sidebar on the right, hidden on mobile -->
                <Sidebar position="right" collapsed={isCollapsed} class="hidden md:flex">
                    {#snippet header({ collapsed: isCol })}
                        <div class="w-full flex items-center justify-between">
                            {#if !isCol}
                                <span class="font-bold text-lg">AI Chat</span>
                                <Button variant="ghost" icon="lucide:x" size="sm" square />
                            {:else}
                                <div class="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
                                    <iconify-icon icon="lucide:bot" class="text-xl"></iconify-icon>
                                </div>
                            {/if}
                        </div>
                    {/snippet}
                    
                    {#snippet children({ collapsed: isCol })}
                        {#if !isCol}
                            <div class="flex-1 flex flex-col justify-end p-4">
                                <div class="bg-surface-container-high rounded-lg p-3 text-sm text-on-surface mb-4 self-end max-w-[85%]">
                                    What is Nuxt UI?
                                </div>
                                <div class="text-sm text-on-surface-variant leading-relaxed">
                                    Nuxt UI is a Vue component library built on Tailwind CSS... But Svelora is the Svelte equivalent with premium aesthetics!
                                </div>
                            </div>
                        {:else}
                            <div class="flex-1 flex flex-col gap-4 mt-4">
                                <NavigationMenu items={[
                                    { label: 'Chat History', icon: 'lucide:message-square' },
                                    { label: 'Summarize', icon: 'lucide:file-text' },
                                    { label: 'Code Gen', icon: 'lucide:code' }
                                ]} orientation="vertical" variant="ghost" />
                            </div>
                        {/if}
                    {/snippet}
                    
                    {#snippet footer({ collapsed: isCol })}
                        <div class="w-full flex gap-2">
                            {#if !isCol}
                                <div class="flex-1 flex items-center bg-surface-container rounded-lg px-3 py-2 border border-outline-variant/50">
                                    <input type="text" placeholder="Ask AI..." class="bg-transparent border-none outline-none text-sm w-full" />
                                    <iconify-icon icon="lucide:arrow-up-circle" class="text-primary text-xl ml-2"></iconify-icon>
                                </div>
                            {:else}
                                <Button 
                                    icon="lucide:chevron-left" 
                                    variant="outline" 
                                    size="md" 
                                    class="w-10 h-10 aspect-square p-0"
                                    onclick={() => isCollapsed = !isCollapsed} 
                                />
                            {/if}
                        </div>
                    {/snippet}
                </Sidebar>
            </div>
        </div>
    </section>
</div>
