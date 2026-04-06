import { computed, ref } from 'vue'

export interface ModalState {
    isOpen: boolean
    title: string
    description: string
}

const modalState = ref<ModalState>({
    isOpen: false,
    title: '',
    description: '',
})

export function useModal() {
    const isOpen = computed(() => modalState.value.isOpen)
    const title = computed(() => modalState.value.title)
    const description = computed(() => modalState.value.description)

    function open(titleText = '', descriptionText = ''): void {
        modalState.value = {
            isOpen: true,
            title: titleText,
            description: descriptionText,
        }
    }

    function close(): void {
        modalState.value = {
            ...modalState.value,
            isOpen: false,
        }
    }

    function reset(): void {
        modalState.value = {
            isOpen: false,
            title: '',
            description: '',
        }
    }

    function toggle(titleText = '', descriptionText = ''): void {
        if (modalState.value.isOpen) {
            close()
            return
        }

        open(titleText, descriptionText)
    }

    return {
        state: modalState,
        isOpen,
        title,
        description,
        open,
        close,
        reset,
        toggle,
    }
}