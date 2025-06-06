
import type { TargetedEvent } from "preact/compat";
import { useCallback, useState } from "preact/hooks"

export function useForm(initialize: Record<string, string>){

    const [data, setData] = useState<Record<string, string>>(initialize);

    const handleChange = useCallback((e: TargetedEvent<HTMLInputElement, Event>) => {

        const { name, value } = e.currentTarget;
        setData(x => ({ ...x, [name]: value }));

    }, []);


    return {
        formData: data,
        handleChange
    }
}