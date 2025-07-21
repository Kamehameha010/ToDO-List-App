import { useEffect, useState } from "preact/hooks";
import { useTask } from "../../../hooks/task/use-task";
import { TaskStatusCounter } from "../card/task-status-counter";
import type { TaskTitleKeys } from "../card/types";
import { memo } from "preact/compat";


export const TaskOverview = memo(() => {

    const [summary, setSummary] = useState<Record<TaskTitleKeys, number> | null>(null);
    const { state, getTaskSummary } = useTask();


    useEffect(() => {

        const fetchTaskSummary = async () => {
            const response = await getTaskSummary();

            if ("status" in response) {
                return;
            }
            setSummary(response);
        }

        fetchTaskSummary()

    }, [state])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    summary && Object.entries(summary).map(([title, count]) => (<TaskStatusCounter title={title as TaskTitleKeys} counter={count} />))
                }
            </div>


        </>
    )

});