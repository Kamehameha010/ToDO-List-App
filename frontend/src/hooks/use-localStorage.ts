
type StorageHookType = {
    setItem(key: string, value: any): void
    removeItem(key: string): void
    getItem(key: string): any
    clearStorage(): void
}


export function useLocalStorage(): StorageHookType {

    
    const setItem = (key: string, value: any) => {
        let serialize = value;
        debugger;
        if (typeof value === "object" || Array.isArray(value)) {
            serialize = JSON.stringify(value);
        }
        localStorage.setItem(key, serialize);
    }

    const getItem = (key: string) => {
        const data = localStorage.getItem(key);
        if (data) {
            try {
                return JSON.parse(data)
            } catch (error) {
                return data
            }
            return '';
        }
    }

    const removeItem = (key: string) => {

        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
    }

    const clearStorage = () => localStorage.clear();

    return {
        setItem,
        getItem,
        removeItem,
        clearStorage
    }

}