
export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (state: boolean) => void;
    expiration: Date | null;
    setExpiration: (state: Date | null) => void;
}