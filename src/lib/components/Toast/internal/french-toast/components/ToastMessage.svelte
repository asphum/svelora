<script lang="ts">
    import type { Toast } from '../core/types.js'

    interface Props {
        toast: Toast
        field?: 'message' | 'description'
    }

    let { toast, field = 'message' }: Props = $props()
    const content = $derived(field === 'description' ? toast.description : toast.message)
</script>

{#if content}
    {#if typeof content === 'string'}
        {content}
    {:else}
        {@const Content = content}
        <Content {toast} {...toast.props} />
    {/if}
{/if}
