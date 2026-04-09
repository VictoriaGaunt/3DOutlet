import { describe, expect, it } from 'vitest'
import { useCompareStore } from '@/stores/compare.store'
import { testProduct } from './helpers'

describe('compare.store', () => {
    it('adds and removes compare items', () => {
        const store = useCompareStore()

        store.clear()
        store.add(testProduct)

        expect(store.hasProduct(testProduct.id)).toBe(true)
        expect(store.totalCount.value).toBe(1)

        store.remove(testProduct.id)

        expect(store.hasProduct(testProduct.id)).toBe(false)
        expect(store.totalCount.value).toBe(0)
    })
})