<script lang="ts">
    import { DragDropProvider, DragOverlay } from '@dnd-kit/svelte'
    import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/dom'
    import { isSortableOperation } from '@dnd-kit/dom/sortable'
    import { moveArrayItem } from '$lib/hooks/useSortable/sortable-utils.js'
    import TaskListColumn from './TaskListColumn.svelte'
    import TaskListItem, { type TaskListTodo } from './TaskListItem.svelte'

    let todos = $state<TaskListTodo[]>([
        { id: 'task-1', content: 'Learn Svelte', done: false },
        { id: 'task-2', content: 'Build a Kanban board', done: false },
        { id: 'task-3', content: 'Review code', done: false },
        { id: 'task-4', content: 'Setup project', done: false }
    ])

    let activeId = $state<string | null>(null)

    const inProgress = $derived(todos.filter((task) => !task.done))
    const done = $derived(todos.filter((task) => task.done))
    const activeTodo = $derived(todos.find((task) => task.id === activeId))

    function findIndex(id: string): number {
        return todos.findIndex((task) => task.id === id)
    }

    function handleDragStart(event: DragStartEvent) {
        const source = event.operation.source
        if (!source) return
        activeId = String(source.id)
    }

    function handleDragOver(event: DragOverEvent) {
        const { source, target } = event.operation
        if (!source || !target) return

        const activeTask = todos.find((task) => task.id === String(source.id))
        if (!activeTask) return

        if (target.id === 'in-progress' || target.id === 'done') {
            activeTask.done = target.id === 'done'
            todos = [...todos]
            return
        }

        const overTask = todos.find((task) => task.id === String(target.id))
        if (overTask) {
            activeTask.done = overTask.done
            todos = [...todos]
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        activeId = null

        if (event.canceled || !isSortableOperation(event.operation)) return

        const { source, target } = event.operation
        if (!source || !target) return

        if (target.id === 'in-progress' || target.id === 'done') {
            return
        }

        const fromIndex = findIndex(String(source.id))
        const toIndex = findIndex(String(target.id))
        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return

        todos = moveArrayItem(todos, fromIndex, toIndex)
    }
</script>

<DragDropProvider onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
    <div class="grid gap-4 md:grid-cols-2">
        <TaskListColumn id="in-progress" title="In Progress">
            {#each inProgress as task (task.id)}
                <TaskListItem task={task} index={findIndex(task.id)} />
            {/each}
        </TaskListColumn>

        <TaskListColumn id="done" title="Done">
            {#each done as task (task.id)}
                <TaskListItem task={task} index={findIndex(task.id)} />
            {/each}
        </TaskListColumn>
    </div>

    <DragOverlay>
        {#if activeTodo}
            <div class="rounded-2xl border border-primary/30 bg-surface px-4 py-3 text-sm shadow-lg ring-2 ring-primary/20">
                {activeTodo.content}
            </div>
        {/if}
    </DragOverlay>
</DragDropProvider>
