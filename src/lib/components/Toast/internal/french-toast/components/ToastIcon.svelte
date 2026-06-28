<script lang="ts">
    import type { Toast } from '../core/types.js'
    import { getToastToasterContext } from '../toast-context.js'
    import CheckmarkIcon from './CheckmarkIcon.svelte'
    import ErrorIcon from './ErrorIcon.svelte'
    import LoaderIcon from './LoaderIcon.svelte'

    interface Props {
        toast: Toast
    }

    let { toast }: Props = $props()
    let { type, icon, iconTheme } = $derived(toast)
    const toasterContext = $derived(getToastToasterContext())
</script>

<div data-icon="">
    {#if typeof icon === 'string'}
        <div class="_sft-animated">{icon}</div>
    {:else if icon === null}
        <!-- hidden -->
    {:else if typeof icon !== 'undefined'}
        {@const IconComponent = icon}
        <IconComponent />
    {:else if type === 'loading'}
        {#if toasterContext.loadingIcon}
            {@render toasterContext.loadingIcon()}
        {:else}
            <div class="_sft-indicator">
                <LoaderIcon {...iconTheme} />
            </div>
        {/if}
    {:else if type === 'error'}
        {#if toasterContext.errorIcon}
            {@render toasterContext.errorIcon()}
        {:else}
            <div class="_sft-indicator">
                <ErrorIcon {...iconTheme} />
            </div>
        {/if}
    {:else if type === 'success'}
        {#if toasterContext.successIcon}
            {@render toasterContext.successIcon()}
        {:else}
            <div class="_sft-indicator">
                <CheckmarkIcon {...iconTheme} />
            </div>
        {/if}
    {:else if type === 'warning'}
        {#if toasterContext.warningIcon}
            {@render toasterContext.warningIcon()}
        {:else}
            <div class="_sft-indicator _sft-warning">!</div>
        {/if}
    {:else if type === 'info'}
        {#if toasterContext.infoIcon}
            {@render toasterContext.infoIcon()}
        {:else}
            <div class="_sft-indicator _sft-info">i</div>
        {/if}
    {/if}
</div>

<style>
    ._sft-indicator {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        min-height: 20px;
    }

    ._sft-warning,
    ._sft-info {
        font-weight: 700;
        font-size: 0.875rem;
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
