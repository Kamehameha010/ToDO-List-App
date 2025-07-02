import dayjs from "dayjs";
import { Edit, Trash2 } from 'lucide-preact';
import type { TaskProps } from "./types";


const TaskPriorityColors: Record<string, string> = {
    "high": "red",
    "medium": "amber",
    "low": "green"
}

export function TaskItem({ _id, title, description, priority, created_at, status }: TaskProps) {

    const date_converted = dayjs(created_at).format('DD/MM/YYYY')
    return (
        <>
            <div className="flex items-center gap-4">
                <div>
                    <input className="size-4" type="checkbox" name="" />
                </div>
                <div className="flex-1 flex flex-col space-y-1">
                    <div className="flex items-center gap-1">
                        <span className={`rounded-full bg-${TaskPriorityColors[priority]}-400 size-1.5`}></span>
                        <p className="text-md font-semibold">{title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{description}</p>
                    <div className="flex gap-4 items-center">
                        <span className={`text-xs bg-${TaskPriorityColors[priority]}-200/50 text-${TaskPriorityColors[priority]}-600 px-1.5 py-0.5 rounded-md`}>{priority}</span>
                        <span className="text-xs text-gray-500">{date_converted}</span>
                    </div>
                </div>
                <div className="space-x-2.5">
                    <button className="inline-flex justify-center items-center whitespace-nowrap text-gray-400 hover:bg-gray-200 hover:text-gray-500 rounded-sm size-5"><Edit className="size-3.5 p-0" /></button>
                    <button className="inline-flex justify-center items-center whitespace-nowrap text-gray-400 hover:bg-red-100 hover:text-red-500 rounded-sm size-5"><Trash2 className="size-3.5 p-0" /></button>
                </div>

            </div>

        </>
    )
}