import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Clean up the timeout if the value or delay changes
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}