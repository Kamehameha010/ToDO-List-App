import type { ComponentChildren } from 'preact';
import { createContext } from "preact";
import { useState } from "preact/hooks";
import type { SearchTaskParams } from "../services/task/types";
import type { TaskFilterContextType } from "./types";



export const TaskFilterContext = createContext<TaskFilterContextType | null>(null);

export function TaskFilterProvider({ children }: { children: ComponentChildren }) {

    const [filters, setFilters] = useState<SearchTaskParams>({
        q: "",
        status: "all"
    });
    return (
        <TaskFilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </TaskFilterContext.Provider>)
}