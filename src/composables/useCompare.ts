import { computed } from 'vue'
import { useCompareStore } from '@/stores/compare.store'
import type { Product } from '@/types'

export function useCompare() {
    const compareStore = useCompareStore()

    const items = computed(() => compareStore.items.value)
    const totalCount = computed(() => compareStore.totalCount.value)
    const isEmpty = computed(() => compareStore.isEmpty.value)

    function add(product: Product): void {
        compareStore.add(product)
    }

    function remove(productId: Product['id']): void {
        compareStore.remove(productId)
    }

    function toggle(product: Product): void {
        compareStore.toggle(product)
    }

    function hasProduct(productId: Product['id']): boolean {
        return compareStore.hasProduct(productId)
    }

    function clear(): void {
        compareStore.clear()
    }

    return {
        items,
        totalCount,
        isEmpty,
        add,
        remove,
        toggle,
        hasProduct,
        clear,
    }
}