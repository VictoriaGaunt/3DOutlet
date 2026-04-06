import { onBeforeUnmount, onMounted, type Ref } from 'vue'

type MaybeElement = HTMLElement | null
type TargetRef = Ref<MaybeElement>

export function useClickOutside(
    target: TargetRef,
    handler: (event: MouseEvent | TouchEvent) => void,
): void {
    const listener = (event: MouseEvent | TouchEvent): void => {
        const element = target.value
        const eventTarget = event.target as Node | null

        if (!element || !eventTarget) return
        if (element === eventTarget || element.contains(eventTarget)) return

        handler(event)
    }

    onMounted(() => {
        document.addEventListener('click', listener)
        document.addEventListener('touchstart', listener)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', listener)
        document.removeEventListener('touchstart', listener)
    })
}