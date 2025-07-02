import { Plus } from 'lucide-preact'
export function TaskForm() {
    return (
        <>
            <form className="space-y-6">
                <h1 className="text-xl text-gray-900 font-semibold">Create New Task</h1>
                <div className="flex flex-col space-y-4">
                    <input className="text-sm h-10 px-3 py-2 outline outline-gray-200 rounded-md placeholder:text-gray-600 focus:outline-gray-500" name="title" type="text" placeholder="Task Summary" />
                    <textarea className="text-sm h-15 px-3 py-2 outline outline-gray-200 rounded-md placeholder:text-gray-400 focus:outline-gray-500" name="desciption" id="" placeholder="Description (optional)"></textarea>
                </div>
                <div className="flex justify-between">

                    <select className="text-sm h-10 pl-3 pr-5 py-1.5 outline outline-gray-200 rounded-md " name="priority" id="task-priority">
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>

                    <button className="inline-flex items-center justify-between bg-blue-700/90 text-white h-10 w-36 px-4 py-1.5 rounded-md focus:outline-gray-500" type="submit">
                        <Plus className="size-4" />
                        Add Task
                    </button>
                </div>

            </form>
        </>
    )
}