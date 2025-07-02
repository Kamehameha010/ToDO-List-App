import { TaskStatusCounter } from "../card/task-status-counter"
import type { TaskCounterProps } from "../card/types"

const tasks : TaskCounterProps[] = [
    {
        "status": "active",
        "counter": 10,
    }, {
        "status": "done",
        "counter": 10
    }, {
        "status": "total_tasks",
        "counter": 20
    }

]

export function TaskOverview() {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {
                    tasks.map(task => <TaskStatusCounter status={task.status} counter={task.counter} />)
                }
            </div>
        </>
    )

}