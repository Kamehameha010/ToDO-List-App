import type { Task } from "../services/task/types";

export type State = {
    tasks: Task[];
};

export type Action =
    { type: 'ADD_TASK' | 'UPDATE_TASK', payload: Task }
    | { type: 'UPDATE_TASK_STATUS', payload: { _id: string, status: string } }
    | { type: 'DELETE_TASK', payload: { _id: string } }
    | { type: 'SET_TASKS', payload: Task[] }
