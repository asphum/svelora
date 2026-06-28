<script lang="ts">
    import { createDroppable } from '@dnd-kit/svelte'
    import type { Snippet } from 'svelte'

    interface Props {
        id: string
        title: string
        children?: Snippet
    }

    let { id, title, children }: Props = $props()

    const { attach, isDropTarget } = createDroppable({
        get id() {
            return id
        }
    })
</script>

<div
    {@attach attach}
    class={[
        'rounded-2xl border border-outline-variant/60 bg-surface-container-low p-4 pt-6 transition-colors',
        isDropTarget && 'border-primary/40 bg-primary/5'
    ]}
>
    <p class="pb-3 text-base font-semibold text-on-surface">{title}</p>
    <div class="grid gap-2">
        {@render children?.()}
    </div>
</div>
