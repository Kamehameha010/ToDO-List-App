

export type TaskCounterProps = {
    title: TaskTitleKeys;
    counter: number;
}

export type TaskTitleKeys = 'active' | 'done' | 'total_tasks'

export type TaskProps = {
    _id: string,
    title: string,
    description: string,
    priority: string,
    created_at: number,
    status: string
    selectedTask: (id: string) => void
}