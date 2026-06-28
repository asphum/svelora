export type NestedTask = {
    id: string
    title: string
    description: string
}

export type TaskContainer = {
    data: NestedTask
    nesteds: NestedTask[]
}
