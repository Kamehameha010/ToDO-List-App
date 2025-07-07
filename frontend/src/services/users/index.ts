import axios from "axios";
import { baseUrl } from "../../config";
import type { ProfileResponse } from "./types";

const userApi = axios.create({
    baseURL: `${baseUrl}/v1/users`
})

userApi.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("auth.task")}`
    return config;
}, (error: any) => Promise.reject(error))


export const getMeProfile = async (): Promise<ProfileResponse> => {

    const response = await userApi.get("/me/profile");

    const data = response.data;

    return data as ProfileResponse;

}