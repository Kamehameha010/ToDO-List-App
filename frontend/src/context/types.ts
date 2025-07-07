import type { Dispatch } from "preact/hooks";
import type { Action, State } from "../reducer/types";

export type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (state: boolean) => void;
    expiration: Date | null;
    setExpiration: (state: Date | null) => void;
}


export type TaskContextType = {
    state: State;
    dispatch: Dispatch<Action>;
}