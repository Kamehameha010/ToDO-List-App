
import { Search } from 'lucide-preact'
import type { TargetedEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks'



export function TaskFilterBar() {

    const [isSelected, setIsSelected] = useState("btn-all");
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
            console.log("re-render");

        }, 500);

        return () => {
            clearTimeout(interval)
        }

    }, [query])



    return (
        <>
            <div className="flex items-center">
                <div className=" flex-1 relative">
                    <Search className="absolute size-4 left-3 top-3" />
                    <input type="text" onChange={handleChange} className="inline-flex items-center h-9 w-full px-9 text-sm outline outline-gray-200 focus:outline-gray-900 rounded-md" placeholder="Search Tasks..." value={query} />
                </div>
                <div className="space-x-2 ml-3">
                    <button id="btn-all" onClick={handleClick} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ${isSelected == "btn-all" ? "bg-blue-600 text-white hover:bg-blue-700" : "outline outline-gray-200 hover:bg-gray-300"}  disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}>All</button>
                    <button id="btn-active" onClick={handleClick} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ${isSelected == "btn-active" ? "bg-blue-600 text-white hover:bg-blue-700" : "outline outline-gray-200 hover:bg-gray-300"}  disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}>Active</button>
                    <button id="btn-done" onClick={handleClick} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ${isSelected == "btn-done" ? "bg-blue-600 text-white hover:bg-blue-700" : "outline outline-gray-200 hover:bg-gray-300"}  disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3`}>Done</button>
                </div>
            </div>
        </>
    )
}