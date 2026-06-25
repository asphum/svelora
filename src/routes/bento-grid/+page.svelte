<script lang="ts">
    import { BentoGrid, BentoCard, Icon } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">BentoGrid</h1>
        <p class="text-on-surface-variant">
            A masonry-like grid layout composed of beautifully animated cards, inspired by Bento boxes.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">BentoGrid</code> as a wrapper and <code class="rounded bg-surface-container-highest px-1">BentoCard</code> for the children. 
            Adjust the <code class="rounded bg-surface-container-highest px-1">col-span-*</code> classes on the children to make them span different columns.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 bg-surface-50 dark:bg-surface-900">
            <BentoGrid class="max-w-3xl mx-auto">
                <BentoCard 
                    class="md:col-span-2 md:row-span-2" 
                    name="Analytics" 
                    icon="lucide:line-chart"
                    description="Dive deep into your traffic data."
                    href="#"
                    cta="View dashboard"
                >
                    {#snippet background()}
                        <div class="absolute right-0 top-0 opacity-10 blur-xl">
                            <Icon name="lucide:bar-chart-3" size="200" />
                        </div>
                    {/snippet}
                </BentoCard>

                <BentoCard 
                    name="Notifications" 
                    icon="lucide:bell"
                    description="Manage your alert settings."
                    href="#"
                />

                <BentoCard 
                    name="Security" 
                    icon="lucide:shield-check"
                    description="Keep your account safe."
                    href="#"
                />
                
                <BentoCard 
                    class="md:col-span-3"
                    name="Integrations" 
                    icon="lucide:blocks"
                    description="Connect with your favorite tools seamlessly."
                    href="#"
                    cta="Browse tools"
                />
            </BentoGrid>
        </div>
    </section>
</div>
