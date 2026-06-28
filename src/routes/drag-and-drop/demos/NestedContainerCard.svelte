<script lang="ts">
    import { createSortable } from '@dnd-kit/svelte/sortable'
    import NestedTaskRow from './NestedTaskRow.svelte'
    import type { TaskContainer } from './nested-types.js'

    interface Props {
        container: TaskContainer
        containerIndex: number
    }

    let { container, containerIndex }: Props = $props()

    const { attach, isDragging, isDropTarget } = createSortable({
        get id() {
            return container.data.id
        },
        get index() {
            return containerIndex
        },
        group: 'nested-containers',
        type: 'container',
        get data() {
            return {
                type: 'container' as const,
                accepts: ['item'] as const,
                ...container.data
            }
        }
    })
</script>

<div
    {@attach attach}
    class={[
        'rounded-2xl border border-outline-variant/60 bg-surface-container-low p-4 transition-shadow',
        isDragging && 'opacity-50 shadow-lg ring-2 ring-primary/20',
        isDropTarget && 'border-primary/40 bg-primary/5'
    ]}
>
    <div class="mb-4">
        <p class="text-base font-semibold text-on-surface">{container.data.title}</p>
        <p class="mt-1 text-sm text-on-surface-variant">{container.data.description}</p>
    </div>

    <div class="grid gap-2">
        {#each container.nesteds as nested, itemIndex (nested.id)}
            <NestedTaskRow task={nested} {itemIndex} containerId={container.data.id} />
        {:else}
            <p class="rounded-xl border border-dashed border-outline-variant/60 px-4 py-6 text-center text-sm text-on-surface-variant">
                No tasks
            </p>
        {/each}
    </div>
</div>
