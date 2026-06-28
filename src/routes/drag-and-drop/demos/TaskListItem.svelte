<script lang="ts">
    import { createSortable } from '@dnd-kit/svelte/sortable'

    export type TaskListTodo = {
        id: string
        content: string
        done: boolean
    }

    interface Props {
        task: TaskListTodo
        index: number
    }

    let { task, index }: Props = $props()

    const { attach, isDragging, isDropTarget, isDragSource } = createSortable({
        get id() {
            return task.id
        },
        get index() {
            return index
        },
        group: 'task-list-demo',
        get data() {
            return task
        }
    })
</script>

<div
    {@attach attach}
    class={[
        'select-none rounded-2xl border border-outline-variant/60 bg-surface px-4 py-3 text-sm transition-shadow',
        isDragging && 'opacity-40',
        isDropTarget && 'border-primary/40 bg-primary/5',
        isDragSource && 'ring-2 ring-primary/30'
    ]}
>
    {#if isDragging}
        <div
            class="flex min-h-12 items-center justify-center rounded-xl border-2 border-dashed border-primary/50 bg-primary/10 text-sm font-medium text-primary"
        >
            Moving: {task.content}
        </div>
    {:else}
        {task.content}
    {/if}
</div>
