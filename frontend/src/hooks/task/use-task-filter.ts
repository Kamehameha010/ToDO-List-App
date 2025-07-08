import { useContext } from "preact/hooks";
import { TaskFilterContext } from "../../context/task-filter-context";

export function useTaskFilter() {
    const context = useContext(TaskFilterContext);

    if (!context) {
        throw new Error("Context out scoped");
    }

    return context;
}