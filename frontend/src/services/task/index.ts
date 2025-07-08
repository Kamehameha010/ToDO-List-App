import axios from "axios";
import { baseUrl } from "../../config";
import type { SearchTaskParams, Task, TaskResponse } from "./types";




const taskApi = axios.create({
    baseURL: `${baseUrl}/v1/tasks`
})

taskApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("auth.task")}`
    return config;
}, (error: any) => Promise.reject(error))


export const createTask = async (task: Task): Promise<TaskResponse> => {

    const response = await taskApi.post("/", task);

    const data = response.data;

    if (response.status > 299) {
        return {
            success: false,
            error: {
                detail: data?.detail,
                message: response.statusText,
                status: response.status
            }
        }
    }

    return {
        success: true,
        data: data
    };

}

export const updateTask = async (taskId: string, task: Task): Promise<TaskResponse> => {

    const response = await taskApi.put(`/${taskId}`, task);

    const data = response.data;

    if (response.status > 299) {
        return {
            success: false,
            error: {
                detail: data?.detail,
                message: response.statusText,
                status: response.status
            }
        }
    }

    return {
        success: true,
        data: data
    };

}

export const updateTaskStatus = async (taskId: string, status: string): Promise<TaskResponse> => {

    const response = await taskApi.put(`/${taskId}/${status}`);

    const data = response.data;

    if (response.status > 299) {
        return {
            success: false,
            error: {
                detail: data?.detail,
                message: response.statusText,
                status: response.status
            }
        }
    }

    return {
        success: true,
        data: data
    };

}

export const deleteTask = async (taskId: string): Promise<TaskResponse> => {

    const response = await taskApi.delete(`/${taskId}`);

    const data = response.data;

    if (response.status > 299) {
        return {
            success: false,
            error: {
                detail: data?.detail,
                message: response.statusText,
                status: response.status
            }
        }
    }

    return {
        success: true,
        data: data
    };

}

export const getTasks = async (params?: SearchTaskParams): Promise<TaskResponse> => {
    
    const response = await taskApi.get(`/`, {
        params: params
    });

    const data = response.data;

    if (response.status > 299) {
        return {
            success: false,
            error: {
                detail: data?.detail,
                message: response.statusText,
                status: response.status
            }
        }
    }

    return {
        success: true,
        data: data
    };

}

export const getTasksStats = async (): Promise<TaskResponse> => {

    const response = await taskApi.get(`/stats`);

    const data = response.data;

    if (response.status > 299) {
        return {
            success: false,
            error: {
                detail: data?.detail,
                message: response.statusText,
                status: response.status
            }
        }
    }

    return {
        success: true,
        data: data
    };

}