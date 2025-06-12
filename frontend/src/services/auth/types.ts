export interface AuthRequest {
    email: string;
    password: string;
}


export interface RegisterRequest extends AuthRequest {
    name: string;
}