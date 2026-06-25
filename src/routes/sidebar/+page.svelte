<script lang="ts">
    import { Sidebar, Button } from '$lib/index.js'
    
    let collapsed = $state(false)
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Sidebar</h1>
        <p class="text-on-surface-variant">
            A layout component for application sidebars with built-in collapsible state.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">Sidebar</code> with <code class="rounded bg-surface-container-highest px-1">header</code> and <code class="rounded bg-surface-container-highest px-1">footer</code> snippets. Pass <code class="rounded bg-surface-container-highest px-1">collapsed</code> prop to toggle the expanded state.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center overflow-hidden">
            <div class="w-full max-w-3xl h-[400px] border border-outline-variant rounded-lg flex overflow-hidden bg-surface-50 dark:bg-surface-900">
                <Sidebar {collapsed}>
                    {#snippet header()}
                        <div class="p-4 flex items-center justify-between border-b border-outline-variant">
                            {#if !collapsed}
                                <span class="font-bold text-lg">Acme Corp</span>
                            {/if}
                            <Button 
                                icon={collapsed ? "lucide:chevron-right" : "lucide:chevron-left"} 
                                variant="ghost" 
                                size="sm" 
                                square 
                                onclick={() => collapsed = !collapsed} 
                                class={collapsed ? "mx-auto" : ""}
                            />
                        </div>
                    {/snippet}
                    
                    <div class="flex-1 overflow-y-auto p-4 space-y-2">
                        {#each Array(4) as _, i}
                            <div class="h-10 rounded-md bg-surface-container flex items-center px-3">
                                <div class="w-5 h-5 bg-surface-300 dark:bg-surface-600 rounded-sm shrink-0"></div>
                                {#if !collapsed}
                                    <div class="ml-3 h-4 bg-surface-300 dark:bg-surface-600 rounded-sm w-24"></div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    
                    {#snippet footer()}
                        <div class="p-4 border-t border-outline-variant flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold shrink-0">
                                JD
                            </div>
                            {#if !collapsed}
                                <div class="flex-1 overflow-hidden">
                                    <div class="font-semibold text-sm truncate">John Doe</div>
                                </div>
                            {/if}
                        </div>
                    {/snippet}
                </Sidebar>
                
                <main class="flex-1 p-6">
                    <h2 class="text-xl font-semibold mb-4">Main Content Area</h2>
                    <p class="text-on-surface-variant">Toggle the sidebar to see it collapse.</p>
                </main>
            </div>
        </div>
    </section>
</div>
