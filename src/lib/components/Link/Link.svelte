<script lang="ts" module>
    import type { LinkProps } from './link.types.js'

    const locationSubscribers = new Set<() => void>()
    let stopLocationTracking: (() => void) | undefined
    let lastKnownHref = ''

    export type Props = LinkProps

    function parseUrl(url: string, baseUrl: URL) {
        try {
            const parsed = new URL(url, baseUrl.origin)
            return {
                pathname: parsed.pathname,
                query: parsed.searchParams,
                hash: parsed.hash
            }
        } catch {
            return {
                pathname: url,
                query: new URLSearchParams(),
                hash: ''
            }
        }
    }

    function isQueryMatch(
        linkQuery: URLSearchParams,
        currentQuery: URLSearchParams,
        mode: boolean | 'partial'
    ): boolean {
        if (mode === false) return true
        if (mode === 'partial') {
            for (const [key, value] of linkQuery) {
                if (!currentQuery.getAll(key).includes(value)) return false
            }
            return true
        }

        // Exact: check size first (O(1) bail-out), then compare sorted strings
        if (linkQuery.size !== currentQuery.size) return false
        const sorted = (p: URLSearchParams) => new URLSearchParams([...p].sort()).toString()
        return sorted(linkQuery) === sorted(currentQuery)
    }

    function isPathnameMatch(linkPath: string, currentPath: string, exactMatch: boolean): boolean {
        if (exactMatch) return linkPath === currentPath

        const link = linkPath.replace(/\/$/, '') || '/'
        const current = currentPath.replace(/\/$/, '') || '/'

        return link === '/' ? current === '/' : current === link || current.startsWith(`${link}/`)
    }

    function dispatchLocationChange() {
        if (typeof window === 'undefined') {
            return
        }

        for (const callback of locationSubscribers) {
            callback()
        }
    }

    function syncLocation(force = false) {
        if (typeof window === 'undefined') {
            return
        }

        const href = window.location.href
        if (!force && href === lastKnownHref) {
            return
        }

        lastKnownHref = href
        dispatchLocationChange()
    }

    function scheduleLocationSync() {
        if (typeof window === 'undefined') {
            return
        }

        queueMicrotask(() => syncLocation())
        window.setTimeout(() => syncLocation(), 0)
        window.requestAnimationFrame(() => syncLocation())
    }

    function ensureLocationTracking() {
        if (typeof window === 'undefined' || stopLocationTracking) {
            return
        }

        lastKnownHref = window.location.href

        const handleImmediateLocationChange = () => syncLocation()
        const handleDeferredLocationChange = () => scheduleLocationSync()
        const intervalId = window.setInterval(() => syncLocation(), 125)

        window.addEventListener('popstate', handleImmediateLocationChange)
        window.addEventListener('hashchange', handleImmediateLocationChange)
        document.addEventListener('click', handleDeferredLocationChange, true)

        stopLocationTracking = () => {
            window.clearInterval(intervalId)
            window.removeEventListener('popstate', handleImmediateLocationChange)
            window.removeEventListener('hashchange', handleImmediateLocationChange)
            document.removeEventListener('click', handleDeferredLocationChange, true)
            stopLocationTracking = undefined
        }
    }

    function subscribeToLocation(callback: () => void) {
        if (typeof window === 'undefined') {
            return () => undefined
        }

        ensureLocationTracking()
        locationSubscribers.add(callback)

        callback()

        return () => {
            locationSubscribers.delete(callback)

            if (locationSubscribers.size === 0) {
                stopLocationTracking?.()
            }
        }
    }
</script>

<script lang="ts">
    import { getContext, onMount } from 'svelte'
    import { twMerge } from 'tailwind-merge'
    import { getComponentConfig } from '../../config.js'
    import { LINK_LOCATION_CONTEXT_KEY, type LinkLocationContext } from './location-context.js'
    import { linkDefaults, linkVariants } from './link.variants.js'

    const config = getComponentConfig('link', linkDefaults)

    let {
        ref = $bindable(null),
        href,
        type,
        active,
        exact = false,
        exactQuery = false,
        exactHash = false,
        activeClass,
        inactiveClass,
        disabled = false,
        raw = false,
        external,
        children,
        class: className,
        ui,
        target,
        rel,
        onclick,
        ...restProps
    }: Props = $props()

    const isLink = $derived(!!href)
    const locationContext = getContext<LinkLocationContext | undefined>(LINK_LOCATION_CONTEXT_KEY)
    let observedUrl = $state<URL | undefined>(undefined)
    const currentUrl = $derived.by(() => locationContext?.currentUrl() ?? observedUrl)

    onMount(() => {
        if (locationContext) {
            return
        }

        return subscribeToLocation(() => {
            observedUrl = new URL(window.location.href)
        })
    })

    const isExternal = $derived(
        isLink &&
            (external ??
                (href!.startsWith('http://') ||
                    href!.startsWith('https://') ||
                    href!.startsWith('//')))
    )

    const resolvedTarget = $derived(
        isLink ? (target ?? (isExternal ? '_blank' : undefined)) : undefined
    )

    const resolvedRel = $derived(
        isLink
            ? (rel ??
                  (isExternal || resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined))
            : undefined
    )

    const isActive = $derived.by(() => {
        if (active !== undefined) return active
        if (!isLink || !currentUrl || isExternal) return false

        const link = parseUrl(href!, currentUrl)

        if (exactHash && link.hash !== currentUrl.hash) return false
        if (!isQueryMatch(link.query, currentUrl.searchParams, exactQuery)) return false

        return isPathnameMatch(link.pathname, currentUrl.pathname, exact)
    })

    const baseClass = $derived.by(() => {
        const stateClass = isActive ? activeClass : inactiveClass
        if (raw) return twMerge(stateClass, className)

        const slots = linkVariants({ active: isActive, disabled, raw })
        return slots.base({ class: [config.slots.base, stateClass, className, ui?.base] })
    })

    const ariaCurrent = $derived(isActive && exact ? ('page' as const) : undefined)

    function handleClick(e: MouseEvent) {
        if (disabled) {
            e.preventDefault()
            e.stopPropagation()
            return
        }

        if (typeof onclick === 'function') {
            ;(onclick as (e: MouseEvent) => void)(e)
        }
    }
</script>

{#if isLink}
    <!-- eslint-disable svelte/no-navigation-without-resolve -->
    <a
        bind:this={ref}
        {...restProps}
        href={disabled ? undefined : href}
        class={baseClass}
        target={resolvedTarget}
        rel={resolvedRel}
        role={disabled ? 'link' : undefined}
        aria-disabled={disabled ? 'true' : undefined}
        aria-current={ariaCurrent}
        tabindex={disabled ? -1 : undefined}
        onclick={handleClick}
    >
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {@render children?.()}
    </a>
{:else}
    <button
        bind:this={ref}
        {...restProps}
        type={type ?? 'button'}
        class={baseClass}
        {disabled}
        aria-current={ariaCurrent}
        onclick={handleClick}
    >
        {@render children?.()}
    </button>
{/if}
