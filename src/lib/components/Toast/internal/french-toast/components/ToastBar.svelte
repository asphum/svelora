<script lang="ts">
    import type { Component as ComponentType, Snippet } from 'svelte'
    import type { Toast, ToastPosition } from '../core/types.js'
    import { prefersReducedMotion } from '../core/utils.js'
    import toastApi from '../core/toast.js'
    import { getToastToasterContext } from '../toast-context.js'
    import ToastIcon from './ToastIcon.svelte'
    import ToastMessage from './ToastMessage.svelte'

    interface Props {
        toast: Toast
        position?: ToastPosition | undefined
        style?: string
        Component?: ComponentType<Record<string, unknown>> | undefined
        children?: Snippet<
            [{ ToastIcon: typeof ToastIcon; ToastMessage: typeof ToastMessage; toast: Toast }]
        >
    }

    let {
        toast,
        position = undefined,
        style = '',
        Component = undefined,
        children
    }: Props = $props()

    const toasterContext = $derived(getToastToasterContext())

    let factor: number | undefined = $derived.by(() => {
        const top = (toast.position || position || 'top-center').includes('top')
        return top ? 1 : -1
    })

    let animation: string | undefined = $derived.by(() => {
        const [enter, exit] = prefersReducedMotion()
            ? ['_sft-fadeIn', '_sft-fadeOut']
            : ['_sft-enter', '_sft-exit']
        return toast.visible ? enter : exit
    })

    const showCloseButton = $derived(toast.closeButton ?? toasterContext.closeButton ?? false)
</script>

<div
    class="_sft-base {toast.height ? animation : '_sft-transparent'} {toast.className || ''}"
    style="{style}; {toast.style}"
    style:--factor={factor}
    data-svelora-toast=""
    data-styled="true"
    data-type={toast.type}
>
    {#if Component}
        <Component>
            {#snippet icon()}
                <ToastIcon {toast} />
            {/snippet}
            {#snippet message()}
                <ToastMessage {toast} />
            {/snippet}
        </Component>
    {:else if children}
        {@render children({ ToastIcon, ToastMessage, toast })}
    {:else}
        <ToastIcon {toast} />
        <div data-content="">
            <div data-title="">
                <ToastMessage {toast} field="message" />
            </div>
            {#if toast.description}
                <div data-description="" class={toast.descriptionClass || ''}>
                    <ToastMessage {toast} field="description" />
                </div>
            {/if}
        </div>
        {#if toast.action}
            <button type="button" data-button="" onclick={toast.action.onClick}>
                {toast.action.label}
            </button>
        {/if}
        {#if toast.cancel}
            <button type="button" data-cancel="" onclick={toast.cancel.onClick}>
                {toast.cancel.label}
            </button>
        {/if}
        {#if showCloseButton}
            <button
                type="button"
                data-close-button=""
                aria-label={toasterContext.closeButtonAriaLabel ?? 'Close toast'}
                onclick={() => toastApi.dismiss(toast.id)}
            >
                {#if toasterContext.closeIcon}
                    {@render toasterContext.closeIcon()}
                {:else}
                    ×
                {/if}
            </button>
        {/if}
    {/if}
</div>

<style>
    @keyframes enterAnimation {
        0% {
            transform: translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);
            opacity: 0.5;
        }
        100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 1;
        }
    }

    @keyframes exitAnimation {
        0% {
            transform: translate3d(0, 0, -1px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);
            opacity: 0;
        }
    }

    @keyframes fadeInAnimation {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fadeOutAnimation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    ._sft-base {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: #fff;
        color: #363636;
        line-height: 1.3;
        will-change: transform;
        box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.1),
            0 3px 3px rgba(0, 0, 0, 0.05);
        max-width: 350px;
        pointer-events: auto;
        padding: 8px 10px;
        border-radius: 8px;
        position: relative;
    }

    ._sft-transparent {
        opacity: 0;
    }

    ._sft-enter {
        animation: enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
    }

    ._sft-exit {
        animation: exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;
    }

    ._sft-fadeIn {
        animation: fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
    }

    ._sft-fadeOut {
        animation: fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;
    }

    [data-content] {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-width: 0;
    }

    [data-title] {
        font-weight: 600;
    }

    [data-description] {
        opacity: 0.85;
    }

    [data-button],
    [data-cancel] {
        border: none;
        cursor: pointer;
        white-space: nowrap;
    }

    [data-close-button] {
        position: absolute;
        top: 0.375rem;
        right: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        border: 1px solid transparent;
        border-radius: 50%;
        background: transparent;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
</style>
