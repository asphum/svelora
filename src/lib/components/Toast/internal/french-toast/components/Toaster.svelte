<script lang="ts">
    import type { DOMToast, ToastOptions, ToastPosition } from '../core/types.js'
    import { useToaster } from '../core/use-toaster.svelte.js'
    import { parsePosition } from '../core/utils.js'
    import { setToastToasterContext } from '../toast-context.js'
    import type { Snippet } from 'svelte'
    import ToastWrapper from './ToastWrapper.svelte'

    interface Props {
        reverseOrder?: boolean
        position?: ToastPosition
        toastOptions?: ToastOptions | undefined
        gutter?: number
        containerStyle?: string | undefined
        containerClassName?: string | undefined
        closeButton?: boolean
        closeButtonAriaLabel?: string
        theme?: 'light' | 'dark' | 'system'
        successIcon?: Snippet
        errorIcon?: Snippet
        warningIcon?: Snippet
        infoIcon?: Snippet
        loadingIcon?: Snippet
        closeIcon?: Snippet
    }

    let {
        reverseOrder = false,
        position = 'bottom-right',
        toastOptions = undefined,
        gutter = 14,
        containerStyle = undefined,
        containerClassName = undefined,
        closeButton = false,
        closeButtonAriaLabel = 'Close toast',
        theme = 'light',
        successIcon,
        errorIcon,
        warningIcon,
        infoIcon,
        loadingIcon,
        closeIcon
    }: Props = $props()

    setToastToasterContext(() => ({
        closeButton,
        closeButtonAriaLabel,
        successIcon,
        errorIcon,
        warningIcon,
        infoIcon,
        loadingIcon,
        closeIcon
    }))

    const resolvedToastOptions = $derived(toastOptions ?? {})
    const toaster = useToaster(() => resolvedToastOptions)

    const _toasts: DOMToast[] = $derived(
        toaster.mergedToasts.map((toast) => ({
            ...toast,
            position: toast.position || position,
            offset: toaster.handlers.calculateOffset(toast, toaster.mergedToasts, {
                reverseOrder,
                gutter,
                defaultPosition: position
            })
        }))
    )

    const positionAttrs = $derived(parsePosition(position))

    const resolvedTheme = $derived.by(() => {
        if (theme !== 'system') return theme
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    })
</script>

<div
    class="_sft-toaster {containerClassName || ''}"
    style={containerStyle}
    data-svelora-toaster=""
    data-x-position={positionAttrs.xPosition}
    data-y-position={positionAttrs.yPosition}
    data-svelora-theme={resolvedTheme}
    onmouseenter={toaster.handlers.startPause}
    onmouseleave={toaster.handlers.endPause}
    role="alert"
>
    {#each _toasts as toast (toast.id)}
        <ToastWrapper {toast} setHeight={(height) => toaster.handlers.updateHeight(toast.id, height)} />
    {/each}
</div>

<style>
    ._sft-toaster {
        --default-offset: 16px;

        position: fixed;
        z-index: 9999;
        top: var(--default-offset);
        left: var(--default-offset);
        right: var(--default-offset);
        bottom: var(--default-offset);
        pointer-events: none;
    }

    :global(._sft-toaster ._sft-base) {
        background: transparent;
        box-shadow: none;
        padding: 0;
        max-width: none;
    }
</style>
