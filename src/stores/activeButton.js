import { ref } from 'vue'

const activeButtonId = ref(null)

export function useActiveButton() {
    const setActiveButton = (id) => {
        activeButtonId.value = id
    }
    const clearActiveButton = () => {
        activeButtonId.value = null
    }
    return {
        activeButtonId,
        setActiveButton,
        clearActiveButton
    }
}