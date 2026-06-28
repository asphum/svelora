<script lang="ts">
    import { createSortable } from '@dnd-kit/svelte/sortable'
    import type { NestedTask } from './nested-types.js'

    interface Props {
        task: NestedTask
        itemIndex: number
        containerId: string
    }

    let { task, itemIndex, containerId }: Props = $props()

    const { attach, isDragging, isDropTarget } = createSortable({
        get id() {
            return task.id
        },
        get index() {
            return itemIndex
        },
        get group() {
            return `nested-${containerId}`
        },
        type: 'item',
        get data() {
            return { type: 'item' as const, ...task }
        }
    })
</script>

<div
    {@attach attach}
    class={[
        'cursor-grab rounded-xl border border-outline-variant/60 bg-surface px-4 py-3 active:cursor-grabbing',
        isDragging && 'opacity-40',
        isDropTarget && 'border-primary/40 bg-primary/5'
    ]}
>
    {#if isDragging}
        <div
            class="flex min-h-14 items-center justify-center rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 text-sm font-medium text-primary"
        >
            Moving: {task.title}
        </div>
    {:else}
        <p class="text-sm font-semibold text-on-surface">{task.title}</p>
        <p class="mt-1 text-xs text-on-surface-variant">{task.description}</p>
    {/if}
</div>
