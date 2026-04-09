import { describe, expect, it } from 'vitest'
import { useFavoritesStore } from '@/stores/favorites.store'
import { testProduct } from './helpers'

describe('favorites.store', () => {
    it('adds and removes favorites', () => {
        const store = useFavoritesStore()

        store.clear()
        store.add(testProduct)

        expect(store.hasProduct(testProduct.id)).toBe(true)
        expect(store.totalCount.value).toBe(1)

        store.remove(testProduct.id)

        expect(store.hasProduct(testProduct.id)).toBe(false)
        expect(store.totalCount.value).toBe(0)
    })
})