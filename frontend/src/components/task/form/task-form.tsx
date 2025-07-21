import { Plus } from 'lucide-preact'
import { useTask } from '../../../hooks/task/use-task'
import { useForm } from '../../../hooks/form/use-form';
import type { Task } from '../../../services/task/types';
import type { TargetedEvent } from 'preact/compat';

export function TaskForm() {

    const { formData, handleChange } = useForm({ title: "", priority: "low", description: "" })
    const { newTask } = useTask();

    const handleSubmit = async (e: TargetedEvent<HTMLFormElement, Event>) => {

        e.preventDefault();

        const task = { ...formData, status: "active" };

        const response = await newTask(task as Task);

        if (response) {
            console.log(response.message);
        }

        
    }

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <h1 className="text-xl text-gray-900 font-semibold">Create New Task</h1>
                <div className="flex flex-col space-y-4">
                    <input
                        className="text-sm h-10 px-3 py-2 outline outline-gray-200 rounded-md placeholder:text-gray-600 focus:outline-gray-500"
                        name="title"
                        type="text"
                        placeholder="Task Summary"
                        onChange={handleChange}
                        required />
                    <textarea
                        className="text-sm h-15 px-3 py-2 outline outline-gray-200 rounded-md placeholder:text-gray-400 focus:outline-gray-500"
                        name="description"
                        placeholder="Description (optional)"
                        onChange={handleChange}></textarea>
                </div>
                <div className="flex justify-between">
                    <select
                        className="text-sm h-10 pl-3 pr-5 py-1.5 outline outline-gray-200 rounded-md cursor-pointer"
                        name="priority"
                        onChange={handleChange}
                    >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low" selected>Low Priority</option>
                    </select>

                    <button
                        className="inline-flex items-center justify-between bg-blue-700/90 text-white h-10 w-36 px-4 py-1.5 rounded-md focus:outline-gray-500 cursor-pointer"
                        type="submit">
                        <Plus className="size-4" />
                        Add Task
                    </button>
                </div>

            </form>
        </>
    )
}