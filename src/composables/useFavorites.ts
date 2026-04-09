import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites.store'
import type { Product } from '@/types'

export function useFavorites() {
    const favoritesStore = useFavoritesStore()

    const items = computed(() => favoritesStore.items.value)
    const totalCount = computed(() => favoritesStore.totalCount.value)
    const isEmpty = computed(() => favoritesStore.isEmpty.value)

    function add(product: Product): void {
        favoritesStore.add(product)
    }

    function remove(productId: Product['id']): void {
        favoritesStore.remove(productId)
    }

    function toggle(product: Product): void {
        favoritesStore.toggle(product)
    }

    function hasProduct(productId: Product['id']): boolean {
        return favoritesStore.hasProduct(productId)
    }

    function clear(): void {
        favoritesStore.clear()
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