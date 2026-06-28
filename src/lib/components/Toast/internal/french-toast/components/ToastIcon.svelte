<script lang="ts">
    import type { Toast } from '../core/types.js'
    import { getToastToasterContext } from '../toast-context.js'
    import {
        ToastError,
        ToastInfo,
        ToastLoading,
        ToastSuccess,
        ToastWarning
    } from '../../toast-icons/index.js'

    interface Props {
        toast: Toast
    }

    let { toast }: Props = $props()
    let { type, icon } = $derived(toast)
    const toasterContext = $derived(getToastToasterContext())
    const iconTone = $derived(toasterContext.iconTone ?? 'standard')

    const hasIcon = $derived.by(() => {
        if (icon === null) return false
        if (typeof icon === 'string') return true
        if (typeof icon !== 'undefined') return true
        return (
            type === 'loading' ||
            type === 'error' ||
            type === 'success' ||
            type === 'warning' ||
            type === 'info'
        )
    })
</script>

{#if hasIcon}
<div data-icon="">
    {#if typeof icon === 'string'}
        <div class="_sft-animated">{icon}</div>
    {:else if typeof icon !== 'undefined'}
        {@const IconComponent = icon}
        <IconComponent />
    {:else if type === 'loading'}
        {#if toasterContext.loadingIcon}
            {@render toasterContext.loadingIcon()}
        {:else}
            <ToastLoading tone={iconTone} />
        {/if}
    {:else if type === 'error'}
        {#if toasterContext.errorIcon}
            {@render toasterContext.errorIcon()}
        {:else}
            <ToastError tone={iconTone} />
        {/if}
    {:else if type === 'success'}
        {#if toasterContext.successIcon}
            {@render toasterContext.successIcon()}
        {:else}
            <ToastSuccess tone={iconTone} />
        {/if}
    {:else if type === 'warning'}
        {#if toasterContext.warningIcon}
            {@render toasterContext.warningIcon()}
        {:else}
            <ToastWarning tone={iconTone} />
        {/if}
    {:else if type === 'info'}
        {#if toasterContext.infoIcon}
            {@render toasterContext.infoIcon()}
        {:else}
            <ToastInfo tone={iconTone} />
        {/if}
    {/if}
</div>
{/if}

<style>
    [data-icon] :global(.animated-icon-root) {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
    }

    ._sft-animated {
        position: relative;
        transform: scale(0.6);
        opacity: 0.4;
        min-width: 20px;
        animation: enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    @keyframes enter {
        from {
            transform: scale(0.6);
            opacity: 0.4;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
