import type { TaskCounterProps, TaskTitleKeys } from "./types";
import { Circle, CircleCheck } from 'lucide-preact'


const TITLE_COUNTER: Record<TaskTitleKeys, string> = {

    "active": "In Progress",
    "done": "Completed",
    "total_tasks": "Total Tasks"
}

const OVERVIEW_COLOR = {
    active: {
        font: "text-amber-700",
        background: "bg-amber-200/50",
        icon: <Circle />
    },
    done: {
        font: "text-green-700",
        background: "bg-green-200/50",
        icon: <CircleCheck />
    },
    total_tasks: {
        font: "text-blue-700",
        background: "bg-blue-200/50",
        icon: <Circle />
    },

}

export function TaskStatusCounter({ title, counter }: TaskCounterProps) {

    const title_custom = OVERVIEW_COLOR[title]

    return <>
        <div className="outline outline-gray-200/60 h-25 content-center rounded-sm p-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-gray-600/100">{TITLE_COUNTER[title]}</p>
                    <p className={`text-2xl font-semibold ${title_custom.font}`} >{counter}</p>
                </div>
                <div className={`flex items-center justify-center rounded-md ${title_custom.background} ${title_custom.font} size-10`}>
                    {title_custom.icon}
                </div>
            </div>
        </div>
    </>
}