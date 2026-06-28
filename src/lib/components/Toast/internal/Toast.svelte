<script lang="ts" module>
// Ported from svelte-sonner (MIT License)
// https://github.com/wobsoriano/svelte-sonner

import {
    SCALE_MULTIPLIER,
    SWIPE_THRESHOLD,
    TIME_BEFORE_UNMOUNT
} from './constants.js'
import { cn, getDefaultSwipeDirections, getDampening } from './helpers.js'

export { cn }
</script>

<script lang="ts">
import { onMount, untrack } from 'svelte'
import { isAction } from './types.js'
import { toastState } from './toast-state.svelte.js'
import { useDocumentHidden } from './use-document-hidden.svelte.js'
import Loader from './Loader.svelte'
import type { ToastProps } from './types.js'

const TOAST_LIFETIME = 4000
const GAP = 14
const DEFAULT_TOAST_CLASSES = {
    toast: '',
    title: '',
    description: '',
    loader: '',
    closeButton: '',
    cancelButton: '',
    actionButton: '',
    action: '',
    warning: '',
    error: '',
    success: '',
    default: '',
    info: '',
    loading: ''
}

let {
    toast,
    index,
    expanded,
    invert: invertFromToaster,
    position,
    visibleToasts,
    expandByDefault,
    closeButton: closeButtonFromToaster,
    interacting,
    cancelButtonStyle = '',
    actionButtonStyle = '',
    duration: durationFromToaster,
    descriptionClass = '',
    classes: classesProp,
    unstyled = false,
    loadingIcon,
    successIcon,
    errorIcon,
    warningIcon,
    infoIcon,
    closeIcon,
    defaultRichColors = false,
    swipeDirections: swipeDirectionsProp,
    closeButtonAriaLabel = 'Close toast',
    pauseWhenPageIsHidden = false,
    ...restProps
}: ToastProps = $props()

const defaultClasses = { ...DEFAULT_TOAST_CLASSES }

let mounted = $state(false)
let removed = $state(false)
let swiping = $state(false)
let swipeOut = $state(false)
let isSwiped = $state(false)
let offsetBeforeRemove = $state(0)
let initialHeight = $state(0)
let remainingTime = toast.duration || durationFromToaster || TOAST_LIFETIME
let dragStartTime = $state<number | null>(null)
let toastRef = $state<HTMLLIElement>()
let swipeDirection = $state<string | null>(null)
let swipeOutDirection = $state<string | null>(null)

const isFront = $derived(index === 0)
const isVisible = $derived(index + 1 <= visibleToasts)
const toastType = $derived(toast.type)
const dismissible = $derived(
    toast.dismissible !== undefined
        ? toast.dismissible !== false
        : toast.dismissable !== false
)
const toastClass = $derived(toast.class || '')
const toastDescriptionClass = $derived(toast.descriptionClass || '')
const heightIndex = $derived(
    toastState.heights.findIndex((height) => height.toastId === toast.id) || 0
)
const closeButton = $derived(toast.closeButton ?? closeButtonFromToaster)
const duration = $derived(toast.duration ?? durationFromToaster ?? TOAST_LIFETIME)

let pointerStart: { x: number; y: number } | null = null

const coords = $derived(position.split('-'))
const toastsHeightBefore = $derived(
    toastState.heights.reduce((prev, curr, reducerIndex) => {
        if (reducerIndex >= heightIndex) return prev
        return prev + curr.height
    }, 0)
)
const isDocumentHidden = useDocumentHidden()
const invert = $derived(toast.invert || invertFromToaster)
const disabled = $derived(toastType === 'loading')
const classes = $derived({ ...defaultClasses, ...classesProp })
const toastTitle = $derived(toast.title)
const toastDescription = $derived(toast.description)
let closeTimerStartTime = $state(0)
let lastCloseTimerStartTime = $state(0)
const offset = $derived(Math.round(heightIndex * GAP + toastsHeightBefore))

$effect(() => {
    // Track title/description changes to recalculate height
    toastTitle
    toastDescription

    let scale: number
    if (expanded || expandByDefault) {
        scale = 1
    } else {
        scale = 1 - index * SCALE_MULTIPLIER
    }

    const toastEl = untrack(() => toastRef)
    if (toastEl === undefined) return

    toastEl.style.setProperty('height', 'auto')
    const offsetHeight = toastEl.offsetHeight
    const rectHeight = toastEl.getBoundingClientRect().height
    const scaledRectHeight = Math.round((rectHeight / scale + Number.EPSILON) * 100) / 100
    toastEl.style.removeProperty('height')

    let finalHeight: number
    if (Math.abs(scaledRectHeight - offsetHeight) < 1) {
        finalHeight = scaledRectHeight
    } else {
        finalHeight = offsetHeight
    }

    initialHeight = finalHeight
    toastState.setHeight({ toastId: toast.id, height: finalHeight })
})

function deleteToast() {
    removed = true
    offsetBeforeRemove = offset
    toastState.removeHeight(toast.id)
    setTimeout(() => {
        toastState.remove(toast.id)
    }, TIME_BEFORE_UNMOUNT)
}

let timeoutId: ReturnType<typeof setTimeout>

const isPromiseLoadingOrInfiniteDuration = $derived(
    (toast.promise && toastType === 'loading') || toast.duration === Number.POSITIVE_INFINITY
)

function startTimer() {
    closeTimerStartTime = new Date().getTime()
    timeoutId = setTimeout(
        () => {
            toast.onAutoClose?.(toast)
            deleteToast()
        },
        remainingTime
    )
}

function pauseTimer() {
    if (lastCloseTimerStartTime < closeTimerStartTime) {
        const elapsedTime = new Date().getTime() - closeTimerStartTime
        remainingTime = remainingTime - elapsedTime
    }
    lastCloseTimerStartTime = new Date().getTime()
}

onMount(() => {
    mounted = true
    if (!isPromiseLoadingOrInfiniteDuration) {
        startTimer()
    }
    return () => clearTimeout(timeoutId)
})

$effect(() => {
    if (expanded || interacting) {
        pauseTimer()
    } else if (!isPromiseLoadingOrInfiniteDuration) {
        startTimer()
    }
})

$effect(() => {
    if (toast.updated) {
        clearTimeout(timeoutId)
        remainingTime = duration
        startTimer()
    }
})

$effect(() => {
    if (pauseWhenPageIsHidden) {
        if (isDocumentHidden.current) {
            pauseTimer()
        } else {
            startTimer()
        }
    }
})

const handlePointerDown = (event: PointerEvent) => {
    if (disabled || !dismissible) return
    dragStartTime = new Date().getTime()
    const toastEl = event.currentTarget as HTMLElement
    toastEl.setPointerCapture(event.pointerId)
    if ((event.target as HTMLElement).tagName === 'BUTTON') return
    swiping = true
    pointerStart = { x: event.clientX, y: event.clientY }
}

const handlePointerUp = () => {
    if (swipeOut || !dismissible) return

    pointerStart = null
    const swipeAmountX = Number(
        toastRef?.style.getPropertyValue('--swipe-amount-x').replace('px', '') || 0
    )
    const swipeAmountY = Number(
        toastRef?.style.getPropertyValue('--swipe-amount-y').replace('px', '') || 0
    )
    const timeTaken = new Date().getTime() - (dragStartTime || 0)
    const velocity = Math.max(Math.abs(swipeAmountX), Math.abs(swipeAmountY)) / timeTaken

    if (
        Math.abs(swipeAmountX) >= SWIPE_THRESHOLD ||
        Math.abs(swipeAmountY) >= SWIPE_THRESHOLD ||
        velocity > 0.11
    ) {
        toast.onDismiss?.(toast)
        deleteToast()
        swipeOut = true

        if (swipeDirection === 'x') {
            swipeOutDirection = swipeAmountX > 0 ? 'right' : 'left'
        } else if (swipeDirection === 'y') {
            swipeOutDirection = swipeAmountY > 0 ? 'down' : 'up'
        }
        return
    } else {
        toastRef?.style.setProperty('--swipe-amount-x', '0px')
        toastRef?.style.setProperty('--swipe-amount-y', '0px')
    }

    isSwiped = false
    swiping = false
    swipeDirection = null
}

const handlePointerMove = (event: PointerEvent) => {
    if (!pointerStart || !dismissible) return

    const isHighlighted = (window.getSelection()?.toString().length ?? -1) > 0
    if (isHighlighted) return

    const yDelta = event.clientY - pointerStart.y
    const xDelta = event.clientX - pointerStart.x
    const swipeDirections = swipeDirectionsProp ?? getDefaultSwipeDirections(position)

    if (!swipeDirection && (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1)) {
        swipeDirection = Math.abs(xDelta) > Math.abs(yDelta) ? 'x' : 'y'
    }

    let swipeAmount = { x: 0, y: 0 }

    if (swipeDirection === 'y') {
        if (swipeDirections.includes('top') || swipeDirections.includes('bottom')) {
            if (
                (swipeDirections.includes('top') && yDelta < 0) ||
                (swipeDirections.includes('bottom') && yDelta > 0)
            ) {
                swipeAmount.y = yDelta
            } else {
                const dampenedDelta = yDelta * getDampening(yDelta)
                swipeAmount.y =
                    Math.abs(dampenedDelta) < Math.abs(yDelta) ? dampenedDelta : yDelta
            }
        }
    } else if (swipeDirection === 'x') {
        if (swipeDirections.includes('left') || swipeDirections.includes('right')) {
            if (
                (swipeDirections.includes('left') && xDelta < 0) ||
                (swipeDirections.includes('right') && xDelta > 0)
            ) {
                swipeAmount.x = xDelta
            } else {
                const dampenedDelta = xDelta * getDampening(xDelta)
                swipeAmount.x =
                    Math.abs(dampenedDelta) < Math.abs(xDelta) ? dampenedDelta : xDelta
            }
        }
    }

    if (Math.abs(swipeAmount.x) > 0 || Math.abs(swipeAmount.y) > 0) {
        isSwiped = true
    }

    toastRef?.style.setProperty('--swipe-amount-x', `${swipeAmount.x}px`)
    toastRef?.style.setProperty('--swipe-amount-y', `${swipeAmount.y}px`)
}

const handleDragEnd = () => {
    swiping = false
    swipeDirection = null
    pointerStart = null
}

const icon = $derived.by(() => {
    if (toast.icon) return toast.icon
    if (toastType === 'success') return successIcon
    if (toastType === 'error') return errorIcon
    if (toastType === 'warning') return warningIcon
    if (toastType === 'info') return infoIcon
    if (toastType === 'loading') return loadingIcon
    return null
})
</script>

{#snippet LoadingIcon()}
    {#if loadingIcon}
        <div
            class={cn(classes?.loader, toast?.classes?.loader, 'sonner-loader')}
            data-visible={toastType === 'loading'}
        >
            {@render loadingIcon()}
        </div>
    {:else}
        <Loader class={cn(classes?.loader, toast.classes?.loader)} visible={toastType === 'loading'} />
    {/if}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li
    tabindex={0}
    bind:this={toastRef}
    class={cn(
        restProps.class,
        toastClass,
        classes?.toast,
        toast?.classes?.toast,
        classes?.[toastType as keyof typeof classes],
        toast?.classes?.[toastType as keyof typeof toast.classes]
    )}
    aria-live={toast.important ? 'assertive' : 'polite'}
    aria-atomic="true"
    data-sonner-toast=""
    data-rich-colors={toast.richColors ?? defaultRichColors}
    data-styled={!(toast.component || toast.unstyled || unstyled)}
    data-mounted={mounted}
    data-promise={Boolean(toast.promise)}
    data-swiped={isSwiped}
    data-removed={removed}
    data-visible={isVisible}
    data-y-position={coords[0]}
    data-x-position={coords[1]}
    data-index={index}
    data-front={isFront}
    data-swiping={swiping}
    data-dismissible={dismissible}
    data-type={toastType}
    data-invert={invert}
    data-swipe-out={swipeOut}
    data-swipe-direction={swipeOutDirection}
    data-expanded={Boolean(expanded || (expandByDefault && mounted))}
    style:--index={index}
    style:--toasts-before={index}
    style:--z-index={toastState.toasts.length - index}
    style:--offset={`${removed ? offsetBeforeRemove : offset}px`}
    style:--initial-height={expandByDefault ? 'auto' : `${initialHeight}px`}
    style={`${restProps.style ?? ''} ${toast.style ?? ''}`}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerdown={handlePointerDown}
    ondragend={handleDragEnd}
>
    {#if closeButton && !toast.component && toastType !== 'loading' && closeIcon !== null}
        <button
            aria-label={closeButtonAriaLabel}
            data-disabled={disabled}
            data-close-button
            onclick={() => {
                if (disabled || !dismissible) return
                deleteToast()
                toast.onDismiss?.(toast)
            }}
            class={cn(classes?.closeButton, toast?.classes?.closeButton)}
        >
            {@render closeIcon?.()}
        </button>
    {/if}

    {#if toast.component}
        {@const Component = toast.component}
        <Component {...toast.componentProps} closeToast={deleteToast} />
    {:else}
        {#if (toastType || toast.icon || toast.promise) && toast.icon !== null && (icon !== null || toast.icon)}
            <div data-icon="" class={cn(classes?.icon, toast?.classes?.icon)}>
                {#if toast.promise || toastType === 'loading'}
                    {#if toast.icon}
                        <toast.icon />
                    {:else}
                        {@render LoadingIcon()}
                    {/if}
                {/if}
                {#if toast.type !== 'loading'}
                    {#if toast.icon}
                        <toast.icon />
                    {:else if toastType === 'success'}
                        {@render successIcon?.()}
                    {:else if toastType === 'error'}
                        {@render errorIcon?.()}
                    {:else if toastType === 'warning'}
                        {@render warningIcon?.()}
                    {:else if toastType === 'info'}
                        {@render infoIcon?.()}
                    {/if}
                {/if}
            </div>
        {/if}

        <div data-content="" class={cn(classes?.content, toast?.classes?.content)}>
            <div data-title="" class={cn(classes?.title, toast?.classes?.title)}>
                {#if toast.title}
                    {#if typeof toast.title !== 'string'}
                        {@const Title = toast.title}
                        <Title {...toast.componentProps} />
                    {:else}
                        {toast.title}
                    {/if}
                {/if}
            </div>
            {#if toast.description}
                <div
                    data-description=""
                    class={cn(
                        descriptionClass,
                        toastDescriptionClass,
                        classes?.description,
                        toast.classes?.description
                    )}
                >
                    {#if typeof toast.description !== 'string'}
                        {@const Description = toast.description}
                        <Description {...toast.componentProps} />
                    {:else}
                        {toast.description}
                    {/if}
                </div>
            {/if}
        </div>

        {#if toast.cancel}
            {#if typeof toast.cancel === 'function'}
                <toast.cancel />
            {:else if isAction(toast.cancel)}
                <button
                    data-button
                    data-cancel
                    style={toast.cancelButtonStyle ?? cancelButtonStyle}
                    class={cn(classes?.cancelButton, toast?.classes?.cancelButton)}
                    onclick={(event) => {
                        if (!isAction(toast.cancel)) return
                        if (!dismissible) return
                        toast.cancel?.onClick?.(event)
                        deleteToast()
                    }}
                >
                    {toast.cancel.label}
                </button>
            {/if}
        {/if}

        {#if toast.action}
            {#if typeof toast.action === 'function'}
                <toast.action />
            {:else if isAction(toast.action)}
                <button
                    data-button=""
                    style={toast.actionButtonStyle ?? actionButtonStyle}
                    class={cn(classes?.actionButton, toast?.classes?.actionButton)}
                    onclick={(event) => {
                        if (!isAction(toast.action)) return
                        toast.action?.onClick(event)
                        if (event.defaultPrevented) return
                        deleteToast()
                    }}
                >
                    {toast.action.label}
                </button>
            {/if}
        {/if}
    {/if}
</li>
