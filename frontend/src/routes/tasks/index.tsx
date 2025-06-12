import { createFileRoute } from "@tanstack/react-router"

//@ts-ignore
export const TaskRoute = createFileRoute('/tasks/')({
  component: Index,
})

function Index() {

    return <>
        <div>

            <h1>fljdkf</h1>

        </div>
    </>

}
