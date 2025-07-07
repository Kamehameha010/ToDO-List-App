import dayjs from "dayjs";
import { Edit, Trash2 } from 'lucide-preact';
import type { TaskProps } from "./types";


const TaskPriorityColors: Record<string, Record<string, string>> = {
    high: {
        spanCircle: "bg-red-400",
        bgActiveLabel: "bg-red-200/50",
        bgDoneLabel: "bg-red-100/50",
        textLabel: "text-red-600",
        textLabelDone: "text-red-300"
    },
    medium: {
        spanCircle: "bg-amber-400",
        bgActiveLabel: "bg-amber-200/50",
        bgDoneLabel: "bg-amber-100/50",
        textLabel: "text-amber-600",
        textLabelDone: "text-amber-300"
    },
    low: {
        spanCircle: "bg-emerald-400",
        bgActiveLabel: "bg-emerald-200/50",
        bgDoneLabel: "bg-emerald-100/50",
        textLabel: "text-emerald-600",
        textLabelDone: "text-emerald-300"
    }
};

export function TaskItem({ _id, title, description, priority, created_at, status }: TaskProps) {

    const date_converted = dayjs(created_at).format('DD/MM/YYYY');

    const isDone = status == 'done';
    const taskPriorityColor = TaskPriorityColors[priority];
    return (
        <>
            <div className="flex items-center gap-4">
                <div>
                    <input checked={isDone} className="size-4" type="checkbox" name="status" />
                </div>
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex items-center gap-1">
                        <span className={`rounded-full ${taskPriorityColor.spanCircle} size-1.5`}></span>
                        <p className={`text-md font-semibold ${isDone ? 'line-through text-gray-300' : ''}`}>{title}</p>
                    </div>
                    <p className={`text-sm ${isDone ? 'line-through' : ''} ${isDone ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
                    <div className="flex gap-4 items-center">
                        <span className={`text-xs ${isDone ? taskPriorityColor.bgDoneLabel : taskPriorityColor.bgActiveLabel} ${isDone ? taskPriorityColor.textLabelDone : taskPriorityColor.textLabel} px-1.5 py-0.5 rounded-md`}>{priority}</span>
                        <span className={`text-xs ${isDone ? 'text-gray-300' : 'text-gray-500'}`}>{date_converted}</span>
                    </div>
                </div>
                <div id={_id} className="space-x-2.5">
                    <button className="inline-flex justify-center items-center whitespace-nowrap text-gray-400 hover:bg-gray-200 hover:text-gray-500 rounded-sm size-5"><Edit className="size-3.5 p-0" /></button>
                    <button className="inline-flex justify-center items-center whitespace-nowrap text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-sm size-5"><Trash2 className="size-3.5 p-0" /></button>
                </div>

            </div>

        </>
    )
}
