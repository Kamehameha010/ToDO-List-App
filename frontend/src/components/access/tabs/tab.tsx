
import type { PropsWithChildren } from "preact/compat"

export default function Tab(props: PropsWithChildren) {
    return <>
        <div data-testid="Tab" className="flex h-12 bg-gray-200 rounded-xs justify-center items-center mt-4">
            {
                props.children
            }
        </div>
    </>
}
