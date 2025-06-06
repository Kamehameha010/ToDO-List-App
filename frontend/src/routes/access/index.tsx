import { createFileRoute } from '@tanstack/react-router'

//@ts-ignore
export const Route = createFileRoute('/access/')({
  component: Index,
})

export function Index() {

    return <>
        <div>

            <h1>Welcoeme</h1>
            <p>Sign in your account or create new one</p>

            



        </div>
    </>

}


