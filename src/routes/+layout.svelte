<script lang="ts">
    import { page } from '$app/state'
    import './layout.css'
    import type { DocsGroup, DocsItem } from '$lib/docs/navigation.js'
    import { buildLocaleOptions } from '$lib/i18n.js'
    import {
        Button,
        Icon,
        LINK_LOCATION_CONTEXT_KEY,
        Link,
        type LinkLocationContext,
        LocaleButton,
        ModeWatcher,
        mode,
        toggleMode
    } from '$lib/index.js'
    import { m } from '$lib/paraglide/messages.js'
    import { getLocale, setLocale, toLocale } from '$lib/paraglide/runtime.js'
    import { setContext } from 'svelte'

    import {
        docsComponentGroups,
        docsHookItems,
        docsIntroItems,
        docsMeta,
        docsPathAliases,
        docsThemeItems,
        docsTopNav
    } from '$lib/docs/navigation.js'

    import '../svelora.config.js'

    const { children, data } = $props<{
        children: () => unknown
        data: {
            pathname: string
        }
    }>()

    const sidebarSections = [
        { title: 'Getting Started', items: docsIntroItems },
        { title: 'Theme & Config', items: docsThemeItems },
        ...docsComponentGroups.map((group) => ({ title: group.title, items: group.items })),
        { title: 'Hooks', items: docsHookItems }
    ] satisfies DocsGroup[]

    let sidebarOpen = $state(false)
    let searchQuery = $state('')

    const isLanding = $derived(data.pathname === '/')
    const activePath = $derived(docsPathAliases.get(data.pathname) ?? data.pathname)
    const normalizedSearchQuery = $derived(searchQuery.trim().toLowerCase())
    const currentLocale = $derived(getLocale())
    const localeOptions = $derived(buildLocaleOptions())

    const filteredSidebarSections = $derived.by(() => {
        if (!normalizedSearchQuery) {
            return sidebarSections
        }

        return sidebarSections
            .map((section) => {
                const items = section.items.filter((item) => matchesSearch(item, normalizedSearchQuery))
                return items.length > 0 ? { ...section, items } : null
            })
            .filter((section): section is DocsGroup => section !== null)
    })

    setContext<LinkLocationContext>(LINK_LOCATION_CONTEXT_KEY, {
        currentUrl: () => page.url
    })

    function isNavActive(href: string): boolean {
        return activePath === href
    }

    function isTopNavActive(href: string): boolean {
        if (href === '/docs') {
            return activePath === '/docs' || activePath.startsWith('/docs/')
        }

        if (href.includes('/components/')) {
            return activePath.startsWith('/docs/components/')
        }

        if (href.includes('/hooks/')) {
            return activePath.startsWith('/docs/hooks/')
        }

        return activePath === href
    }

    function matchesSearch(item: DocsItem, query: string): boolean {
        return [item.title, item.description ?? '', item.href, item.legacyHref ?? '']
            .join(' ')
            .toLowerCase()
            .includes(query)
    }
</script>

<ModeWatcher />

{#if isLanding}
    <div class="min-h-screen bg-surface text-on-surface">{@render children()}</div>
{:else}
    <div class="min-h-screen bg-surface text-on-surface">
        <header class="sticky top-0 z-50 border-b border-outline-variant/70 bg-surface/90 backdrop-blur">
            <div class="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
                <div class="flex items-center gap-3">
                    <button
                        class="rounded-lg border border-outline-variant bg-surface-container p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high lg:hidden"
                        onclick={() => (sidebarOpen = !sidebarOpen)}
                        aria-label={m.layout_toggle_sidebar()}
                    >
                        <Icon name="lucide:menu" size="18" />
                    </button>

                    <Link href="/" raw class="flex items-center gap-2 text-base font-semibold text-on-surface">
                        <span class="inline-flex size-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-on-primary">
                            S
                        </span>

                        <span>{docsMeta.name}</span>

                        <span class="hidden rounded-full border border-outline-variant bg-surface-container px-2 py-0.5 text-xs text-on-surface-variant sm:inline">
                            {docsMeta.version}
                        </span>
                    </Link>
                </div>

                <nav class="hidden items-center gap-1 lg:flex">
                    {#each docsTopNav as item (item.href)}
                        <Link
                            href={item.href}
                            raw
                            class={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                isTopNavActive(item.href)
                                    ? 'bg-primary-container text-on-primary-container'
                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                            }`}
                        >
                            {#if item.href === '/docs'}
                                {m.layout_docs()}
                            {:else if item.href.includes('/components/')}
                                {m.layout_components()}
                            {:else if item.href.includes('/hooks/')}
                                {m.layout_hooks()}
                            {:else}
                                {item.title}
                            {/if}
                        </Link>
                    {/each}
                </nav>

                <div class="flex items-center gap-2">
                    <LocaleButton
                        locales={localeOptions}
                        locale={currentLocale}
                        size="sm"
                        square={false}
                        ariaLabel={m.locale_change_language()}
                        menuLabel={m.locale_language()}
                        onLocaleChange={(nextLocale) => {
                            const locale = toLocale(nextLocale)
                            if (locale) {
                                return setLocale(locale, { reload: false })
                            }
                        }}
                    />
                    <Link
                        href={docsMeta.githubHref}
                        raw
                        external
                        class="hidden rounded-lg border border-outline-variant px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface sm:inline-flex"
                    >
                        {m.layout_github()}
                    </Link>

                    <Button
                        variant="ghost"
                        color="secondary"
                        icon={mode.current === 'dark' ? 'lucide:sun' : 'lucide:moon'}
                        onclick={toggleMode}
                        square
                        size="sm"
                    />
                </div>
            </div>
        </header>

        <div class="mx-auto flex max-w-[1600px]">
            {#if sidebarOpen}
                <button
                    class="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onclick={() => (sidebarOpen = false)}
                    aria-label={m.layout_close_sidebar()}
                ></button>
            {/if}

            <aside
                class={`fixed inset-y-0 left-0 top-16.25 z-40 h-[calc(100vh-65px)] w-80 shrink-0 overflow-y-auto border-r border-outline-variant bg-surface/95 px-4 py-6 backdrop-blur transition-transform duration-200 lg:sticky lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div class="space-y-6">
                    <section class="space-y-3">
                        <div class="relative">
                            <Icon
                                name="lucide:search"
                                size="16"
                                class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-on-surface-variant"
                            />

                            <input
                                bind:value={searchQuery}
                                type="search"
                                placeholder={m.layout_search_docs_placeholder()}
                                class="w-full rounded-xl border border-outline-variant bg-surface-container py-2 pr-3 pl-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary"
                                aria-label={m.layout_search_docs_aria()}
                            />
                        </div>

                        {#if normalizedSearchQuery}
                            <p class="px-1 text-xs text-on-surface-variant">
                                {#if filteredSidebarSections.length > 0}
                                    {m.layout_search_results({ query: searchQuery.trim() })}
                                {:else}
                                    {m.layout_search_empty({ query: searchQuery.trim() })}
                                {/if}
                            </p>
                        {/if}
                    </section>

                    {#if filteredSidebarSections.length > 0}
                        {#each filteredSidebarSections as section (section.title)}
                            <section class="space-y-2">
                                <p class="px-3 text-xs font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
                                    {section.title}
                                </p>

                                <div class="space-y-1">
                                    {#each section.items as item (item.href)}
                                        <Link
                                            href={item.href}
                                            raw
                                            class={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                                                isNavActive(item.href)
                                                    ? 'bg-primary-container text-on-primary-container'
                                                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                            }`}
                                            onclick={() => (sidebarOpen = false)}
                                        >
                                            <Icon name={item.icon} size="16" />
                                            <span>{item.title}</span>
                                        </Link>
                                    {/each}
                                </div>
                            </section>
                        {/each}
                    {/if}
                </div>
            </aside>

            <main class="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
                <div class="mx-auto max-w-5xl">
                    {@render children()}
                </div>
            </main>
        </div>
    </div>
{/if}

<style global>
    :global(html) {
        scroll-behavior: smooth;
    }

    :global(body) {
        background: var(--color-surface);
        color: var(--color-on-surface);
    }
</style>
