<script lang="ts" module>
// Ported from svelte-sonner (MIT License)
// https://github.com/wobsoriano/svelte-sonner

const VISIBLE_TOASTS_AMOUNT = 3
const VIEWPORT_OFFSET = '24px'
const MOBILE_VIEWPORT_OFFSET = '16px'
const TOAST_LIFETIME = 4000
const TOAST_WIDTH = 356
const GAP = 14
const DARK = 'dark'
const LIGHT = 'light'

type OffsetRecord = Record<string, string>

function getOffsetObject(
    defaultOffset: string | number | Record<string, string | number> | undefined,
    mobileOffset: string | number | Record<string, string | number> | undefined
): OffsetRecord {
    const styles: OffsetRecord = {}

    ;[defaultOffset, mobileOffset].forEach((offset, index) => {
        const isMobile = index === 1
        const prefix = isMobile ? '--mobile-offset' : '--offset'
        const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET

        function assignAll(o: string | number) {
            ;['top', 'right', 'bottom', 'left'].forEach((key) => {
                styles[`${prefix}-${key}`] = typeof o === 'number' ? `${o}px` : o
            })
        }

        if (typeof offset === 'number' || typeof offset === 'string') {
            assignAll(offset)
        } else if (typeof offset === 'object' && offset !== null) {
            ;['top', 'right', 'bottom', 'left'].forEach((key) => {
                const value = (offset as Record<string, string | number>)[key]
                if (value === undefined) {
                    styles[`${prefix}-${key}`] = defaultValue
                } else {
                    styles[`${prefix}-${key}`] =
                        typeof value === 'number' ? `${value}px` : value
                }
            })
        } else {
            assignAll(defaultValue)
        }
    })

    return styles
}
</script>

<script lang="ts">
import { onMount } from 'svelte'
import { on } from 'svelte/events'
import { toastState } from './toast-state.svelte.js'
import Toast from './Toast.svelte'
import Icon from './Icon.svelte'
import type { ToasterProps } from './types.js'

function getInitialTheme(t: string): string {
    if (t !== 'system') return t
    if (typeof window !== 'undefined') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK
        }
        return LIGHT
    }
    return LIGHT
}

let {
    invert = false,
    position = 'bottom-right',
    hotkey = ['altKey', 'KeyT'],
    expand = false,
    closeButton = false,
    offset = VIEWPORT_OFFSET,
    mobileOffset = MOBILE_VIEWPORT_OFFSET,
    theme = 'light',
    richColors = false,
    duration = TOAST_LIFETIME,
    visibleToasts = VISIBLE_TOASTS_AMOUNT,
    toastOptions = {},
    dir = 'auto',
    gap = GAP,
    pauseWhenPageIsHidden = false,
    loadingIcon: loadingIconProp,
    successIcon: successIconProp,
    errorIcon: errorIconProp,
    warningIcon: warningIconProp,
    closeIcon: closeIconProp,
    infoIcon: infoIconProp,
    containerAriaLabel = 'Notifications',
    class: className,
    closeButtonAriaLabel = 'Close toast',
    onblur,
    onfocus,
    onmouseenter,
    onmousemove,
    onmouseleave,
    ondragend,
    onpointerdown,
    onpointerup,
    ...restProps
}: ToasterProps = $props()

function getDocumentDirection(): 'ltr' | 'rtl' {
    if (typeof window === 'undefined') return 'ltr'
    if (dir !== 'auto') return dir as 'ltr' | 'rtl'
    const dirAttribute = document.documentElement.getAttribute('dir')
    if (dirAttribute === 'auto' || !dirAttribute) {
        return window.getComputedStyle(document.documentElement).direction as 'ltr' | 'rtl'
    }
    return dirAttribute as 'ltr' | 'rtl'
}

const possiblePositions = $derived(
    Array.from(
        new Set([
            position,
            ...toastState.toasts
                .filter((toast) => toast.position)
                .map((toast) => toast.position)
        ])
    )
)

let expanded = $state(false)
let interacting = $state(false)
let actualTheme = $state(getInitialTheme(theme))
let listRef = $state<HTMLOListElement>()
let lastFocusedElementRef = $state<HTMLElement | null>(null)
let isFocusWithin = $state(false)

const hotkeyLabel = $derived(
    hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '')
)

$effect(() => {
    let hasDeletedToast = false
    const updatedToasts = toastState.toasts.map((toast) => {
        const matchingToast = toastState.toasts.find((t) => t.id === toast.id && t.dismiss)
        if (matchingToast && !toast.delete) {
            hasDeletedToast = true
            return { ...toast, delete: true }
        }
        return toast
    })
    if (hasDeletedToast) {
        toastState.toasts = updatedToasts
    }
})

$effect(() => {
    return () => {
        if (listRef && lastFocusedElementRef) {
            lastFocusedElementRef.focus({ preventScroll: true })
            lastFocusedElementRef = null
            isFocusWithin = false
        }
    }
})

onMount(() => {
    toastState.reset()
    const handleKeydown = (event: KeyboardEvent) => {
        const isHotkeyPressed = hotkey.every(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (key) => (event as any)[key] || event.code === key
        )
        if (isHotkeyPressed) {
            expanded = true
            listRef?.focus()
        }
        if (
            event.code === 'Escape' &&
            (document.activeElement === listRef || listRef?.contains(document.activeElement))
        ) {
            expanded = false
        }
    }
    return on(document, 'keydown', handleKeydown)
})

$effect(() => {
    if (theme !== 'system') {
        actualTheme = theme
    }
    if (typeof window !== 'undefined') {
        if (theme === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                actualTheme = DARK
            } else {
                actualTheme = LIGHT
            }
        }
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
        const changeHandler = ({ matches }: MediaQueryListEvent) => {
            if (theme !== 'system') return
            actualTheme = matches ? DARK : LIGHT
        }
        if ('addEventListener' in mediaQueryList) {
            mediaQueryList.addEventListener('change', changeHandler)
        }
    }
})

const handleBlur = (event: FocusEvent & { currentTarget: HTMLOListElement }) => {
    onblur?.(event)
    if (isFocusWithin && !(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
        isFocusWithin = false
        if (lastFocusedElementRef) {
            lastFocusedElementRef.focus({ preventScroll: true })
            lastFocusedElementRef = null
        }
    }
}

const handleFocus = (event: FocusEvent & { currentTarget: HTMLOListElement }) => {
    onfocus?.(event)
    const isNotDismissable =
        event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false'
    if (isNotDismissable) return
    if (!isFocusWithin) {
        isFocusWithin = true
        lastFocusedElementRef = event.relatedTarget as HTMLElement
    }
}

const handlePointerDown = (event: PointerEvent & { currentTarget: HTMLOListElement }) => {
    onpointerdown?.(event)
    const isNotDismissable =
        event.target instanceof HTMLElement && event.target.dataset.dismissible === 'false'
    if (isNotDismissable) return
    interacting = true
}

const handleMouseEnter = (event: MouseEvent & { currentTarget: HTMLOListElement }) => {
    onmouseenter?.(event)
    expanded = true
}

const handleMouseLeave = (event: MouseEvent & { currentTarget: HTMLOListElement }) => {
    onmouseleave?.(event)
    if (!interacting) {
        expanded = false
    }
}

const handleMouseMove = (event: MouseEvent & { currentTarget: HTMLOListElement }) => {
    onmousemove?.(event)
    expanded = true
}

const handleDragEnd = (event: DragEvent & { currentTarget: HTMLOListElement }) => {
    ondragend?.(event)
    expanded = false
}

const handlePointerUp = (event: PointerEvent & { currentTarget: HTMLOListElement }) => {
    onpointerup?.(event)
    interacting = false
}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<section
    aria-label="{containerAriaLabel} {hotkeyLabel}"
    tabindex={-1}
    aria-live="polite"
    aria-relevant="additions text"
    aria-atomic="false"
>
    {#if toastState.toasts.length > 0}
        {#each possiblePositions.filter(Boolean) as position, index (position)}
            {@const [y, x] = (position as string).split('-')}
            {@const offsetObject = getOffsetObject(offset, mobileOffset)}
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ol
                tabindex={-1}
                dir={getDocumentDirection()}
                bind:this={listRef}
                class={className}
                data-sonner-toaster
                data-sonner-theme={actualTheme}
                data-y-position={y}
                data-x-position={x}
                style:--front-toast-height={`${toastState.heights[0]?.height}px`}
                style:--width={`${TOAST_WIDTH}px`}
                style:--gap={`${gap}px`}
                style:--offset-top={offsetObject['--offset-top']}
                style:--offset-right={offsetObject['--offset-right']}
                style:--offset-bottom={offsetObject['--offset-bottom']}
                style:--offset-left={offsetObject['--offset-left']}
                style:--mobile-offset-top={offsetObject['--mobile-offset-top']}
                style:--mobile-offset-right={offsetObject['--mobile-offset-right']}
                style:--mobile-offset-bottom={offsetObject['--mobile-offset-bottom']}
                style:--mobile-offset-left={offsetObject['--mobile-offset-left']}
                style={restProps.style}
                onblur={handleBlur}
                onfocus={handleFocus}
                onmouseenter={handleMouseEnter}
                onmousemove={handleMouseMove}
                onmouseleave={handleMouseLeave}
                ondragend={handleDragEnd}
                onpointerdown={handlePointerDown}
                onpointerup={handlePointerUp}
                {...restProps}
            >
                {#each toastState.toasts.filter((toast) => (!toast.position && index === 0) || toast.position === position) as toast, index (toast.id)}
                    <Toast
                        {index}
                        {toast}
                        defaultRichColors={richColors}
                        duration={toastOptions?.duration ?? duration}
                        class={toastOptions?.class ?? ''}
                        descriptionClass={toastOptions?.descriptionClass || ''}
                        {invert}
                        {visibleToasts}
                        {closeButton}
                        {interacting}
                        position={position as import('./types.js').Position}
                        style={toastOptions?.style ?? ''}
                        classes={toastOptions.classes || {}}
                        unstyled={toastOptions.unstyled ?? false}
                        cancelButtonStyle={toastOptions?.cancelButtonStyle ?? ''}
                        actionButtonStyle={toastOptions?.actionButtonStyle ?? ''}
                        closeButtonAriaLabel={toastOptions?.closeButtonAriaLabel ?? closeButtonAriaLabel}
                        expandByDefault={expand}
                        {expanded}
                        {pauseWhenPageIsHidden}
                        loadingIcon={loadingIconProp}
                    >
                        {#snippet successIcon()}
                            {#if successIconProp}
                                {@render successIconProp?.()}
                            {:else if successIconProp !== null}
                                <Icon type="success" />
                            {/if}
                        {/snippet}

                        {#snippet errorIcon()}
                            {#if errorIconProp}
                                {@render errorIconProp?.()}
                            {:else if errorIconProp !== null}
                                <Icon type="error" />
                            {/if}
                        {/snippet}

                        {#snippet warningIcon()}
                            {#if warningIconProp}
                                {@render warningIconProp?.()}
                            {:else if warningIconProp !== null}
                                <Icon type="warning" />
                            {/if}
                        {/snippet}

                        {#snippet infoIcon()}
                            {#if infoIconProp}
                                {@render infoIconProp?.()}
                            {:else if infoIconProp !== null}
                                <Icon type="info" />
                            {/if}
                        {/snippet}

                        {#snippet closeIcon()}
                            {#if closeIconProp}
                                {@render closeIconProp?.()}
                            {:else if closeIconProp !== null}
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                                </svg>
                            {/if}
                        {/snippet}
                    </Toast>
                {/each}
            </ol>
        {/each}
    {/if}
</section>

<style>
    :global(html[dir='ltr']),
    :global([data-sonner-toaster][dir='ltr']) {
        --toast-icon-margin-start: -3px;
        --toast-icon-margin-end: 4px;
        --toast-svg-margin-start: -1px;
        --toast-svg-margin-end: 0px;
        --toast-button-margin-start: auto;
        --toast-button-margin-end: 0;
        --toast-close-button-start: 0;
        --toast-close-button-end: unset;
        --toast-close-button-transform: translate(-35%, -35%);
    }

    :global(html[dir='rtl']),
    :global([data-sonner-toaster][dir='rtl']) {
        --toast-icon-margin-start: 4px;
        --toast-icon-margin-end: -3px;
        --toast-svg-margin-start: 0px;
        --toast-svg-margin-end: -1px;
        --toast-button-margin-start: 0;
        --toast-button-margin-end: auto;
        --toast-close-button-start: unset;
        --toast-close-button-end: 0;
        --toast-close-button-transform: translate(35%, -35%);
    }

    :global([data-sonner-toaster]) {
        position: fixed;
        width: var(--width);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
        --gray1: hsl(0, 0%, 99%);
        --gray2: hsl(0, 0%, 97.3%);
        --gray3: hsl(0, 0%, 95.1%);
        --gray4: hsl(0, 0%, 93%);
        --gray5: hsl(0, 0%, 90.9%);
        --gray6: hsl(0, 0%, 88.7%);
        --gray7: hsl(0, 0%, 85.8%);
        --gray8: hsl(0, 0%, 78%);
        --gray9: hsl(0, 0%, 56.1%);
        --gray10: hsl(0, 0%, 52.3%);
        --gray11: hsl(0, 0%, 43.5%);
        --gray12: hsl(0, 0%, 9%);
        --border-radius: 8px;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        list-style: none;
        outline: none;
        z-index: 999999999;
    }

    :global([data-sonner-toaster][data-y-position='top']) {
        top: var(--offset-top);
    }

    :global([data-sonner-toaster][data-y-position='bottom']) {
        bottom: var(--offset-bottom);
    }

    :global([data-sonner-toaster][data-x-position='left']) {
        left: var(--offset-left);
    }

    :global([data-sonner-toaster][data-x-position='right']) {
        right: var(--offset-right);
    }

    :global([data-sonner-toaster][data-x-position='center']) {
        left: 50%;
        transform: translateX(-50%);
    }

    :global([data-sonner-toast]) {
        --y: translateY(0);
        --lift: translateY(0);
        --lift-amount: calc(var(--lift-off) * var(--factor) * 1px);
        touch-action: none;
        position: absolute;
        top: 0;
        width: var(--width);
        transition:
            transform 400ms,
            opacity 400ms,
            height 400ms,
            box-shadow 200ms;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 16px;
        background: var(--normal-bg);
        border: 1px solid var(--normal-border);
        color: var(--normal-text);
        border-radius: var(--border-radius);
        font-size: 13px;
        min-height: 48px;
        box-shadow:
            0px 4px 12px rgba(0, 0, 0, 0.1),
            0 1px 1px rgba(0, 0, 0, 0.05);
        pointer-events: auto;
        will-change: transform;
    }

    :global([data-sonner-toast][data-y-position='top']) {
        --factor: 1;
        --lift-off: 1;
        --sign: 1;
        top: 0;
    }

    :global([data-sonner-toast][data-y-position='bottom']) {
        --factor: -1;
        --lift-off: -1;
        --sign: -1;
        bottom: 0;
        top: unset;
    }

    :global([data-sonner-toast]:focus-visible) {
        box-shadow:
            0px 4px 12px rgba(0, 0, 0, 0.1),
            0 1px 1px rgba(0, 0, 0, 0.05),
            0 0 0 2px rgba(0, 0, 0, 0.3);
    }

    :global([data-sonner-toast][data-expanded='false'][data-front='false']) {
        --scale: calc(1 - 0.05 * var(--index));
        --y: scaleX(var(--scale)) translateY(calc(var(--index) * -1 * var(--gap)));
        height: var(--front-toast-height);
        cursor: default;
    }

    :global([data-sonner-toast][data-expanded='false'][data-front='false'][data-y-position='bottom']) {
        --y: scaleX(var(--scale)) translateY(calc(var(--index) * var(--gap)));
    }

    :global([data-sonner-toast][data-expanded='true'][data-front='false']) {
        --y: translateY(calc(var(--offset) * var(--factor)));
    }

    :global([data-sonner-toast][data-expanded='true'][data-front='false'][data-y-position='bottom']) {
        --y: translateY(calc(var(--offset) * var(--factor) * -1));
    }

    :global([data-sonner-toast]) {
        transform: var(--y);
    }

    :global([data-sonner-toast][data-visible='false']) {
        opacity: 0;
        pointer-events: none;
    }

    :global([data-sonner-toast][data-mounted='false'][data-y-position='top']) {
        --y: translateY(-100%);
        opacity: 0;
    }

    :global([data-sonner-toast][data-mounted='false'][data-y-position='bottom']) {
        --y: translateY(100%);
        opacity: 0;
    }

    :global([data-sonner-toast][data-removed='true'][data-front='true'][data-y-position='top']) {
        --y: translateY(-150%);
        opacity: 0;
    }

    :global([data-sonner-toast][data-removed='true'][data-front='true'][data-y-position='bottom']) {
        --y: translateY(150%);
        opacity: 0;
    }

    :global([data-sonner-toast][data-removed='true'][data-front='false'][data-expanded='true']) {
        --y: translateY(calc(var(--offset) * 1px + var(--factor) * -100%));
        opacity: 0;
    }

    :global([data-sonner-toast][data-removed='true'][data-front='false'][data-expanded='false']) {
        --y: scaleX(calc(1 - 0.05 * var(--index))) translateY(calc(var(--index) * -1 * var(--gap)));
        opacity: 0;
    }

    :global([data-sonner-toast][data-removed='true'][data-front='false'][data-y-position='bottom']) {
        --y: translateY(calc(var(--offset) * 1px + var(--factor) * -100%));
        opacity: 0;
    }

    :global([data-sonner-toast][data-swiped='true']) {
        user-select: none;
    }

    :global([data-sonner-toast][data-swiping='true']) {
        transform: var(--y) translate(var(--swipe-amount-x, 0px), var(--swipe-amount-y, 0px));
        transition: none;
        cursor: grabbing;
    }

    :global([data-sonner-toast][data-swipe-out='true'][data-swipe-direction='right']) {
        animation: swipe-out-right 200ms ease-out forwards;
    }

    :global([data-sonner-toast][data-swipe-out='true'][data-swipe-direction='left']) {
        animation: swipe-out-left 200ms ease-out forwards;
    }

    :global([data-sonner-toast][data-swipe-out='true'][data-swipe-direction='up']) {
        animation: swipe-out-up 200ms ease-out forwards;
    }

    :global([data-sonner-toast][data-swipe-out='true'][data-swipe-direction='down']) {
        animation: swipe-out-down 200ms ease-out forwards;
    }

    :global([data-sonner-toast]) :global([data-icon]) {
        display: flex;
        height: 20px;
        width: 20px;
        position: relative;
        justify-content: flex-start;
        align-items: center;
        flex-shrink: 0;
        margin-left: var(--toast-icon-margin-start);
        margin-right: var(--toast-icon-margin-end);
    }

    :global([data-sonner-toast][data-promise='true']) :global([data-icon] > svg) {
        animation: sonner-fade-in 0.3s ease forwards;
    }

    :global([data-sonner-toast]) :global([data-icon] > svg) {
        margin-left: var(--toast-svg-margin-start);
        margin-right: var(--toast-svg-margin-end);
    }

    :global([data-sonner-toast]) :global([data-content]) {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
    }

    :global([data-sonner-toast]) :global([data-title]) {
        font-weight: 500;
        line-height: 1.5;
        font-size: 13px;
        color: inherit;
    }

    :global([data-sonner-toast]) :global([data-description]) {
        font-weight: 400;
        line-height: 1.4;
        font-size: 13px;
        color: var(--gray11);
    }

    :global([data-sonner-toast]) :global([data-button]) {
        border-radius: 4px;
        padding: 0 8px;
        height: 24px;
        font-size: 12px;
        color: var(--normal-bg);
        background: var(--normal-text);
        margin-left: var(--toast-button-margin-start);
        margin-right: var(--toast-button-margin-end);
        border: none;
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        transition:
            background 200ms,
            opacity 200ms;
    }

    :global([data-sonner-toast]) :global([data-cancel]) {
        color: var(--normal-text);
        background: rgba(0, 0, 0, 0.08);
    }

    :global([data-sonner-toast]:focus-visible) :global([data-close-button]) {
        opacity: 1;
    }

    :global([data-sonner-toast]) :global([data-close-button]) {
        position: absolute;
        left: var(--toast-close-button-start);
        right: var(--toast-close-button-end);
        top: 0;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background: var(--gray1);
        color: var(--gray12);
        border: 1px solid var(--gray4);
        transform: var(--toast-close-button-transform);
        border-radius: 50%;
        cursor: pointer;
        z-index: 1;
        transition:
            opacity 100ms,
            background 200ms,
            border-color 200ms;
        opacity: 0;
    }

    :global([data-sonner-toast][data-mounted='true']:hover) :global([data-close-button]) {
        opacity: 1;
    }

    @keyframes -global-swipe-out-left {
        from {
            transform: var(--y) translateX(var(--swipe-amount-x));
            opacity: 1;
        }
        to {
            transform: var(--y) translateX(calc(var(--swipe-amount-x) - 100%));
            opacity: 0;
        }
    }

    @keyframes -global-swipe-out-right {
        from {
            transform: var(--y) translateX(var(--swipe-amount-x));
            opacity: 1;
        }
        to {
            transform: var(--y) translateX(calc(var(--swipe-amount-x) + 100%));
            opacity: 0;
        }
    }

    @keyframes -global-swipe-out-up {
        from {
            transform: var(--y) translateY(var(--swipe-amount-y));
            opacity: 1;
        }
        to {
            transform: var(--y) translateY(calc(var(--swipe-amount-y) - 100%));
            opacity: 0;
        }
    }

    @keyframes -global-swipe-out-down {
        from {
            transform: var(--y) translateY(var(--swipe-amount-y));
            opacity: 1;
        }
        to {
            transform: var(--y) translateY(calc(var(--swipe-amount-y) + 100%));
            opacity: 0;
        }
    }

    @media (max-width: 600px) {
        :global([data-sonner-toaster]) {
            position: fixed;
            right: var(--mobile-offset-right);
            left: var(--mobile-offset-left);
            width: 100%;
        }

        :global([data-sonner-toaster][dir='rtl']) {
            left: calc(var(--mobile-offset-left) * -1);
        }

        :global([data-sonner-toaster]) :global([data-sonner-toast]) {
            left: 0;
            right: 0;
            width: calc(100% - var(--mobile-offset-left) * 2);
        }

        :global([data-sonner-toaster][data-x-position='left']) {
            left: var(--mobile-offset-left);
        }

        :global([data-sonner-toaster][data-y-position='bottom']) {
            bottom: var(--mobile-offset-bottom);
        }

        :global([data-sonner-toaster][data-y-position='top']) {
            top: var(--mobile-offset-top);
        }

        :global([data-sonner-toaster][data-x-position='center']) {
            left: var(--mobile-offset-left);
            right: var(--mobile-offset-right);
            transform: none;
        }
    }

    :global([data-sonner-toaster][data-sonner-theme='light']) {
        --normal-bg: #fff;
        --normal-border: var(--gray4);
        --normal-text: var(--gray12);

        --success-bg: hsl(143, 85%, 96%);
        --success-border: hsl(145, 92%, 87%);
        --success-text: hsl(140, 100%, 27%);

        --info-bg: hsl(208, 100%, 97%);
        --info-border: hsl(221, 91%, 93%);
        --info-text: hsl(210, 92%, 45%);

        --warning-bg: hsl(49, 100%, 97%);
        --warning-border: hsl(49, 91%, 84%);
        --warning-text: hsl(31, 92%, 45%);

        --error-bg: hsl(359, 100%, 97%);
        --error-border: hsl(359, 100%, 94%);
        --error-text: hsl(360, 100%, 45%);
    }

    :global([data-sonner-toaster][data-sonner-theme='dark']) {
        --normal-bg: #000;
        --normal-bg-hover: hsl(0, 0%, 12%);
        --normal-border: hsl(0, 0%, 20%);
        --normal-border-hover: hsl(0, 0%, 25%);
        --normal-text: var(--gray1);

        --success-bg: hsl(150, 100%, 6%);
        --success-border: hsl(147, 100%, 12%);
        --success-text: hsl(150, 86%, 65%);

        --info-bg: hsl(215, 100%, 6%);
        --info-border: hsl(223, 43%, 17%);
        --info-text: hsl(216, 87%, 65%);

        --warning-bg: hsl(64, 100%, 6%);
        --warning-border: hsl(60, 100%, 9%);
        --warning-text: hsl(46, 87%, 65%);

        --error-bg: hsl(358, 76%, 10%);
        --error-border: hsl(357, 89%, 16%);
        --error-text: hsl(358, 100%, 81%);
    }

    :global(.sonner-loading-wrapper) {
        --size: 16px;
        height: var(--size);
        width: var(--size);
        position: absolute;
        inset: 0;
        z-index: 10;
    }

    :global(.sonner-loading-wrapper[data-visible='false']) {
        transform-origin: center;
        animation: sonner-fade-out 0.2s ease forwards;
    }

    :global(.sonner-spinner) {
        position: relative;
        top: 50%;
        left: 50%;
        height: var(--size);
        width: var(--size);
    }

    :global(.sonner-loading-bar) {
        animation: sonner-spin 1.2s linear infinite;
        background: var(--gray11);
        border-radius: 6px;
        height: 8%;
        left: -10%;
        position: absolute;
        top: -3.9%;
        width: 24%;
    }

    :global(.sonner-loading-bar:nth-child(1)) { animation-delay: -1.2s; transform: rotate(0.0001deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(2)) { animation-delay: -1.1s; transform: rotate(30deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(3)) { animation-delay: -1s; transform: rotate(60deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(4)) { animation-delay: -0.9s; transform: rotate(90deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(5)) { animation-delay: -0.8s; transform: rotate(120deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(6)) { animation-delay: -0.7s; transform: rotate(150deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(7)) { animation-delay: -0.6s; transform: rotate(180deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(8)) { animation-delay: -0.5s; transform: rotate(210deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(9)) { animation-delay: -0.4s; transform: rotate(240deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(10)) { animation-delay: -0.3s; transform: rotate(270deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(11)) { animation-delay: -0.2s; transform: rotate(300deg) translate(146%); }
    :global(.sonner-loading-bar:nth-child(12)) { animation-delay: -0.1s; transform: rotate(330deg) translate(146%); }

    @keyframes -global-sonner-fade-in {
        0% { opacity: 0; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1); }
    }

    @keyframes -global-sonner-fade-out {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.8); }
    }

    @keyframes -global-sonner-spin {
        0% { opacity: 1; }
        100% { opacity: 0.15; }
    }

    @media (prefers-reduced-motion) {
        :global([data-sonner-toast]),
        :global([data-sonner-toast]) > :global(*),
        :global(.sonner-loading-bar) {
            transition: none !important;
            animation: none !important;
        }
    }

    :global(.sonner-loader) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transform-origin: center;
        transition: opacity 200ms, transform 200ms;
    }

    :global(.sonner-loader[data-visible='false']) {
        opacity: 0;
        transform: scale(0.8) translate(-50%, -50%);
    }
</style>
