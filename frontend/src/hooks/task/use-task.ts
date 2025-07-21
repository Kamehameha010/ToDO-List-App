import { useCallback, useContext } from "preact/hooks";
import { TaskContext } from "../../context/task-context";
import {
    createTask,
    deleteTask as deleteMeTask,
    getTasks as getMeTasks,
    getTasksStats,
    updateTask as updateMeTask,
    updateTaskStatus
} from "../../services/task";
import type { SearchTaskParams, Task, TaskStatResponse } from "../../services/task/types";


export function useTask() {

    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("Context out scoped");
    }

    const { state, dispatch } = context;

    const newTask = async (task: Task) => {
        const response = await createTask(task);
        if (response.error) {
            return response.error
        }
        dispatch({ type: "ADD_TASK", payload: response.data });
        return null;
    }

    const updateTask = async (taskId: string, task: Task) => {

        const response = await updateMeTask(taskId, task);

        if (response.error) {
            return response.error
        }

        dispatch({ type: "UPDATE_TASK", payload: response.data })
        return null
    }

    const updateStatus = async (taskId: string, status: string) => {

        const response = await updateTaskStatus(taskId, status);

        if (response.error) {
            return response.error
        }

        dispatch({ type: "UPDATE_TASK_STATUS", payload: { _id: taskId, status } })
        return null
    }

    const deleteTask = async (taskId: string) => {

        const response = await deleteMeTask(taskId);

        if (response.error) {
            return response.error
        }

        dispatch({ type: "DELETE_TASK", payload: { _id: taskId } })
        return null
    }

    const getTaskSummary = useCallback(async () => {
        const response = await getTasksStats();

        if (response.error) {
            return response.error;
        }

        const { summary } = response.data as TaskStatResponse;

        return summary;

    }, [])

    const getTasks = async (params: SearchTaskParams) => {

        const response = await getMeTasks(params);

        if (response.error) {
            return response.error
        }

        dispatch({ type: 'SET_TASKS', payload: response.data.items })

        return null
    }

    return {
        state,
        newTask,
        updateTask,
        updateStatus,
        deleteTask,
        getTaskSummary,
        getTasks
    }

}