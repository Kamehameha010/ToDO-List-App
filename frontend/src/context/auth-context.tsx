import { createContext } from "preact";
import { useState } from "preact/hooks";

import type { AuthContextType } from "./types";



export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: preact.ComponentChildren }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [expiration, setExpiration] = useState<Date | null>(null);

    return <>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, expiration, setExpiration }}>
            {
                children
            }
        </AuthContext.Provider>
    </>
}
