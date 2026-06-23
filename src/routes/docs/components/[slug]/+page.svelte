<script lang="ts">
    import type { Component } from 'svelte'
    import { Link } from '$lib/index.js'

    type PageModule = {
        default: Component
    }

    const modules = import.meta.glob('../../../*/+page.svelte', {
        eager: true
    }) as Record<string, PageModule>

    const docsPages = new Map<string, Component>(
        Object.entries(modules)
            .map(([path, module]) => [path.split('/').at(-2) ?? '', module.default] as const)
            .filter(([slug]) => slug.length > 0)
    )

    const { data } = $props<{
        data: {
            slug: string
        }
    }>()

    const resolvedPage = $derived(docsPages.get(data.slug))
</script>

{#if resolvedPage}
    {@const ResolvedPage = resolvedPage}
    <ResolvedPage />
{:else}
    <div class="space-y-4">
        <h1 class="text-3xl font-semibold">Component not found</h1>
        <p class="text-on-surface-variant">
            The requested component page does not exist.
        </p>
        <Link href="/docs/components" raw class="text-primary hover:underline">
            Back to all components
        </Link>
    </div>
{/if}
