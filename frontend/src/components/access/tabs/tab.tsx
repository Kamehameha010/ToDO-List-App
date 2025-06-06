
import type { JSX } from "preact/jsx-runtime"
import  type { TabItem, TabKeys } from "./types"




const tabs: TabItem[] = [
    {
        id: "tab1",
        label: "Sign In"
    },
    {
        id: "tab2",
        label: "Sign Up"
    }
]


const tanElement: Record<TabKeys, JSX.Element > = {
    tab1: <></>,
    tab2: <></>
}

export default function Tab() {
    return <>

    
    </>
}
