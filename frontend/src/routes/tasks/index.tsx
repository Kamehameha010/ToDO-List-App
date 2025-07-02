import { createFileRoute } from "@tanstack/react-router"
import { TaskOverview } from "../../components/task/container/task-overview"
import { TaskFilterBar } from "../../components/task/filter/task-filter-bar"
import { TaskForm } from "../../components/task/form/task-form"
import { TaskHeader } from "../../components/task/header/task-header"
import { TaskList } from "../../components/task/container/task-list"
//@ts-ignore
export const TaskRoute = createFileRoute('/tasks/')({
    component: Index,
})

export function Index() {

    return <>
        <div className="min-h-screen bg-gray-50/50 space-y-6">
            <TaskHeader />

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-6">
                <TaskOverview />

                <section className="mt-10 outline outline-gray-200 p-6 rounded-md">
                    <TaskForm />
                </section>

                <section className="mt-10 outline outline-gray-200 p-6 rounded-md space-y-4">
                    <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
                    <TaskFilterBar/>

                    <div>
                        <TaskList />
                    </div>

                </section>
            </div>
        </div>
    </>

}
