
import type { TargetedEvent } from "preact/compat";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

export function useForm(initializeData: Record<string, string>, initializeSuccess: boolean = false) {

    const [data, setData] = useState<Record<string, string>>(initializeData);
    const [error, setError] = useState<Record<string, string> | null>(null);
    const [isSuccess, setIsSuccess] = useState(initializeSuccess)
    const timeoutRef = useRef<number>(0);

    const formkeys = Object.keys(initializeData);

    const handleChange = useCallback((e: TargetedEvent<HTMLInputElement, Event>) => {
        const { name, value, ariaRequired: required } = e.currentTarget;
        

        const fieldName = `${name.charAt(0).toUpperCase()}${name.substring(1, name.length)}`

        required && !value
            ? setError(x => ({ ...x, [name]: `${fieldName} field is required` }))
            : setError(x => ({ ...x, [name]: "" }));

        setData(x => ({ ...x, [name]: value }));

    }, []);

    useEffect(() => {

        let errorKeys = Object.keys(error ?? {});
        
        timeoutRef.current = setTimeout(() => {
            if (error && formkeys.every(x=> errorKeys?.includes(x))) {
                setIsSuccess(!Object.values(error).some(p => p))
            }

        }, 300);

    }, [error])


    return {
        formData: data,
        error,
        isSuccess,
        handleChange
    }
}