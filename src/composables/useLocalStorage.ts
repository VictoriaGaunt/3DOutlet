import { ref, watch, type Ref } from 'vue'

interface UseLocalStorageOptions<T> {
    serializer?: {
        read: (value: string) => T
        write: (value: T) => string
    }
    deep?: boolean
}

function getDefaultValue<T>(initialValue: T): T {
    if (Array.isArray(initialValue)) {
        return [...initialValue] as T
    }

    if (initialValue !== null && typeof initialValue === 'object') {
        return { ...(initialValue as Record<string, unknown>) } as T
    }

    return initialValue
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    options: UseLocalStorageOptions<T> = {},
): Ref<T> {
    const serializer = options.serializer ?? {
        read: JSON.parse as (value: string) => T,
        write: JSON.stringify as (value: T) => string,
    }

    const storedValue = ref<T>(getDefaultValue(initialValue)) as Ref<T>

    if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem(key)

        if (raw !== null) {
            try {
                storedValue.value = serializer.read(raw)
            } catch {
                storedValue.value = getDefaultValue(initialValue)
            }
        }
    }

    watch(
        storedValue,
        (value) => {
            if (typeof window === 'undefined') return

            try {
                if (value === null || value === undefined) {
                    window.localStorage.removeItem(key)
                    return
                }

                window.localStorage.setItem(key, serializer.write(value))
            } catch {
                // игнорируем quota / parse / private mode ошибки
            }
        },
        {
            deep: options.deep ?? true,
        },
    )

    return storedValue
}