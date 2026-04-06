import { ref, type Ref } from 'vue'

export type ActiveButtonId = string | number | null

const activeButtonId: Ref<ActiveButtonId> = ref(null)

export function useActiveButton() {
    const setActiveButton = (id: ActiveButtonId): void => {
        activeButtonId.value = id
    }

    const clearActiveButton = (): void => {
        activeButtonId.value = null
    }

    return {
        activeButtonId,
        setActiveButton,
        clearActiveButton,
    }
}