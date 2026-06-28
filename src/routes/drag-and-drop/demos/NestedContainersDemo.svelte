<script lang="ts">
    import { DragDropProvider, DragOverlay } from '@dnd-kit/svelte'
    import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/dom'
    import { moveArrayItem } from '$lib/hooks/useSortable/sortable-utils.js'
    import NestedContainerCard from './NestedContainerCard.svelte'
    import NestedTaskRow from './NestedTaskRow.svelte'
    import type { NestedTask, TaskContainer } from './nested-types.js'

    const defaultItems: TaskContainer[] = [
        {
            data: {
                id: 'development-tasks',
                title: 'Development Tasks',
                description: 'Technical implementation tasks'
            },
            nesteds: [
                {
                    id: 'setup-project',
                    title: 'Setup Project',
                    description: 'Initialize repository and configure tools'
                },
                {
                    id: 'create-components',
                    title: 'Create Components',
                    description: 'Build reusable UI components'
                }
            ]
        },
        {
            data: {
                id: 'design-tasks',
                title: 'Design Tasks',
                description: 'UI/UX design related tasks'
            },
            nesteds: [
                {
                    id: 'color-palette',
                    title: 'Color Palette',
                    description: 'Define brand colors and variants'
                },
                {
                    id: 'typography',
                    title: 'Typography',
                    description: 'Select and implement fonts'
                }
            ]
        }
    ]

    let items = $state<TaskContainer[]>(defaultItems)
    let activeItem = $state<NestedTask | TaskContainer | null>(null)
    let activeType = $state<'container' | 'item' | null>(null)

    function isContainerItem(item: NestedTask | TaskContainer | null): item is TaskContainer {
        return item !== null && 'nesteds' in item
    }

    function findContainer(id: string): TaskContainer | null {
        const containerIndex = items.findIndex(
            (container) =>
                container.data.id === id || container.nesteds.some((item) => item.id === id)
        )
        return containerIndex !== -1 ? items[containerIndex] : null
    }

    function getTypeAndAccepts(source: { data?: Record<string, unknown> }, target: { data?: Record<string, unknown> }) {
        const activeKind = source.data?.type as 'container' | 'item' | undefined
        const overKind = target.data?.type as 'container' | 'item' | undefined
        const accepts = target.data?.accepts as string[] | undefined
        const acceptsItem = accepts?.includes('item') ?? false
        const acceptsContainer = accepts?.includes('container') ?? false
        return { activeKind, overKind, acceptsItem, acceptsContainer }
    }

    function handleDragStart(event: DragStartEvent) {
        const source = event.operation.source
        if (!source) return

        activeType = source.data?.type as 'container' | 'item'
        const container = findContainer(String(source.id))

        if (activeType === 'container') {
            activeItem = container
            return
        }

        activeItem = container?.nesteds.find((item) => item.id === String(source.id)) ?? null
    }

    function handleDragEnd(event: DragEndEvent) {
        activeItem = null
        activeType = null

        if (event.canceled) return

        const { source, target } = event.operation
        if (!source || !target) return

        const { activeKind, overKind, acceptsItem, acceptsContainer } = getTypeAndAccepts(source, target)

        if (activeKind === 'container' && (overKind === 'container' || acceptsContainer)) {
            const fromIndex = items.findIndex((item) => item.data.id === String(source.id))
            const toIndex = items.findIndex((item) => item.data.id === String(target.id))
            if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return
            items = moveArrayItem(items, fromIndex, toIndex)
            return
        }

        if (activeKind === 'item' && (overKind === 'item' || acceptsItem)) {
            const activeContainer = findContainer(String(source.id))
            const overContainer = findContainer(String(target.id))
            if (!activeContainer || !overContainer) return

            if (activeContainer === overContainer) {
                const fromIndex = activeContainer.nesteds.findIndex((item) => item.id === String(source.id))
                const toIndex = activeContainer.nesteds.findIndex((item) => item.id === String(target.id))
                if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return
                activeContainer.nesteds = moveArrayItem(activeContainer.nesteds, fromIndex, toIndex)
                items = [...items]
                return
            }

            const task = activeContainer.nesteds.find((item) => item.id === String(source.id))
            if (!task) return

            activeContainer.nesteds = activeContainer.nesteds.filter((nested) => nested.id !== task.id)
            const insertIndex = overContainer.nesteds.findIndex((nested) => nested.id === String(target.id))
            overContainer.nesteds.splice(insertIndex, 0, task)
            items = [...items]
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { source, target } = event.operation
        if (!source || !target) return

        const { activeKind, overKind, acceptsItem } = getTypeAndAccepts(source, target)
        activeType = activeKind ?? null

        if (activeKind !== 'item' || (!overKind && !acceptsItem)) return

        const activeContainer = findContainer(String(source.id))
        const overContainer = findContainer(String(target.id))
        if (!activeContainer || !overContainer || activeContainer === overContainer) return

        const task = activeContainer.nesteds.find((item) => item.id === String(source.id))
        if (!task) return

        activeContainer.nesteds = activeContainer.nesteds.filter((nested) => nested.id !== task.id)
        overContainer.nesteds.push(task)
        items = [...items]
    }
</script>

<DragDropProvider onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
    <div class="grid gap-4">
        {#each items as container, containerIndex (container.data.id)}
            <NestedContainerCard {container} {containerIndex} />
        {/each}
    </div>

    <p class="mt-3 text-xs text-on-surface-variant">Drag containers to reorder groups, or move tasks between them.</p>

    <DragOverlay>
        {#if activeItem}
            {#if isContainerItem(activeItem)}
                <NestedContainerCard container={activeItem} containerIndex={0} />
            {:else}
                <NestedTaskRow task={activeItem} itemIndex={0} containerId="overlay" />
            {/if}
        {/if}
    </DragOverlay>
</DragDropProvider>
