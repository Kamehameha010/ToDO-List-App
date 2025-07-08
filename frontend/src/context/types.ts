import type { Dispatch } from "preact/hooks";
import type { Action, State } from "../reducer/types";
import type { SearchTaskParams } from "../services/task/types";

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

export type TaskFilterContextType = {
    filters: SearchTaskParams;
    setFilters: (state: SearchTaskParams) => void
}