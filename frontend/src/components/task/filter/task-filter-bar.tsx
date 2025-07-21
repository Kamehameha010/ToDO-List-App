
import { Search } from 'lucide-preact'
import type { TargetedEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks'
import { useTask } from '../../../hooks/task/use-task';
import { useTaskFilter } from '../../../hooks/task/use-task-filter';

const btnStatus: Record<string, string> = {
    "btn-all": "all",
    "btn-active": "active",
    "btn-done": "done"

}
const statusToBtn: Record<string, string> = {
    "all": "btn-all",
    "active": "btn-active",
    "done": "btn-done"

}

export function TaskFilterBar() {

    const { setFilters, filters } = useTaskFilter();
    const [isSelected, setIsSelected] = useState(statusToBtn[filters.status]);
    const [query, setQuery] = useState('')

    const handleClick = (e: TargetedEvent<HTMLButtonElement, Event>) => {
        const { id } = e.currentTarget;
        setIsSelected(id);
    }

    const handleChange = (e: TargetedEvent<HTMLInputElement, Event>) => {
        const { value } = e.currentTarget;
        setQuery(value)
    }

    useEffect(() => {

        const interval = setTimeout(() => {
            setFilters({
                status: btnStatus[isSelected],
                q: query,
                limit:10,
                page:1
            })

        }, 500);

        return () => {
            clearTimeout(interval)
        }

    }, [query, isSelected])



    return (
        <>
            <div className="flex items-center">
                <div className=" flex-1 relative">
                    <Search className="absolute size-4 left-3 top-3" />
                    <input type="text" onChange={handleChange} className="inline-flex items-center h-9 w-full px-9 text-sm outline outline-gray-200 focus:outline-gray-900 rounded-md" placeholder="Search Tasks..." value={query} />
                </div>
                <div className="space-x-2 ml-3">
                    <button id="btn-all" onClick={handleClick} className={`inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm font-medium ${isSelected == "btn-all" ? "bg-blue-600 text-white hover:bg-blue-700" : "outline outline-gray-200 hover:bg-gray-300"}  disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}>All</button>
                    <button id="btn-active" onClick={handleClick} className={`inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm font-medium ${isSelected == "btn-active" ? "bg-blue-600 text-white hover:bg-blue-700" : "outline outline-gray-200 hover:bg-gray-300"}  disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}>Active</button>
                    <button id="btn-done" onClick={handleClick} className={`inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm font-medium ${isSelected == "btn-done" ? "bg-blue-600 text-white hover:bg-blue-700" : "outline outline-gray-200 hover:bg-gray-300"}  disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}>Done</button>
                </div>
            </div>
        </>
    )
}