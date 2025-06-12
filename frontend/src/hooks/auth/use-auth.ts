import { useContext, useEffect, useState } from "preact/hooks";
import type { AuthRequest, RegisterRequest } from "../../services/auth/types";
import { AuthContext } from "../../context/auth-context";
import { register, signIn } from "../../services/auth";
import { useLocalStorage } from "../use-localStorage";
import dayjs from "dayjs";

export function useAuth() {

    const context = useContext(AuthContext)!;

    if (!context) {
        throw new Error("Context out scoped");
    }

    const [isLoading, setIsIoading] = useState(false);

    const tokenKey = "auth.task"
    const expKey = "exp"

    const { setItem, clearStorage, getItem } = useLocalStorage();

    const { isAuthenticated, setIsAuthenticated, setExpiration, expiration } = context;

    const login = async (credentals: AuthRequest) => {
        try {
            setIsIoading(true)
            const response = await signIn(credentals);
            setItem(tokenKey, response.token);

            const exp = dayjs().add(response.expiration, 'second').toDate();

            setExpiration(exp)
            setItem(expKey, exp)
            setIsAuthenticated(true);

            return { data: null, error: null }
        } catch (err) {
            setIsAuthenticated(true);
            setExpiration(null);
            return { data: null, error: (err as Error).message }
        } finally {
            setIsIoading(false)
        }
    }

    const logout = () => {
        setIsIoading(true);
        clearStorage();
        setIsAuthenticated(false);
        setIsIoading(false);
    }

    const registerAccount = async (payload: RegisterRequest) => {
        try {
            setIsIoading(true)
            const response = await register(payload);
            setItem(tokenKey, response.token);

            const exp = dayjs().add(response.expiration, 'second').toDate();

            setExpiration(exp)
            setItem(expKey, exp)
            setIsAuthenticated(true);

            return { data: null, error: null }
        } catch (err) {
            setIsAuthenticated(true);
            setExpiration(null);
            return { data: null, error: (err as Error).message }
        } finally {
            setIsIoading(false)
        }
    }

    useEffect(() => {
        const refresh = () => {
            const exp = getItem(expKey);
            if (exp) {
                setExpiration(exp)
            }
        }
        const validateExp = () => {
            if (dayjs(expiration).isBefore(dayjs())) {
                setIsAuthenticated(false);
            }
        }

        refresh();
        validateExp();

    }, [])

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
        registerAccount
    }
}