export interface Task {
    _id?: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    created_at?: number
}

export interface TaskResponse {
    success: boolean,
    data?: any,
    error?: {
        status: number,
        message: string,
        detail: string
    }
}

export interface SearchTaskParams {
    q?: string,
    status: string
}

export type TaskStatResponse = {
    summary: {
        active: number,
        done: number,
        total_tasks: number
    }
}