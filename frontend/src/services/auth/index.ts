import axios, { type AxiosResponse } from 'axios';
import type { RegisterRequest, AuthRequest } from './types';
import { baseUrl } from '../../config';

interface AuthResponse {
    response: any;
    status: number;
}

const authApi = axios.create({
    baseURL: `${baseUrl}/v1`,
})

authApi.interceptors.response.use((response): AxiosResponse<AuthResponse | Promise<AuthResponse>> => {
    return {
        data: response.data,
        status: response.status
    } as AxiosResponse<AuthResponse>;
}, (error) => {
    return Promise.reject({
        data: error.response?.data || 'An error occurred',
        status: error.response?.status || 500
    });
});


export const signIn = async (payload: AuthRequest) => {
    const response = await authApi.post('/login', payload);
    
    return response.data;

}

export const register = async (payload: RegisterRequest) => {
    const response = await authApi.post('/register', payload);
    return response.data;
}