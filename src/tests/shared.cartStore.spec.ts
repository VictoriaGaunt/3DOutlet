import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useCartStore } from '@/shared/cartStore'
import { testProduct } from './helpers'

describe('shared/cartStore', () => {
    it('adds product to cart', () => {
        const store = useCartStore()

        store.clearCart()
        store.addToCart(testProduct)

        expect(store.getQty(testProduct.id)).toBe(1)
        expect(store.totalCount.value).toBe(1)
        expect(store.totalPrice.value).toBe(testProduct.price)
    })

    it('removes product from cart', () => {
        const store = useCartStore()

        store.clearCart()
        store.addToCart(testProduct)
        store.removeFromCart(testProduct.id)

        expect(store.getQty(testProduct.id)).toBe(0)
        expect(store.isEmpty.value).toBe(true)
    })

    it('persists cart to localStorage', async () => {
        const store = useCartStore()

        store.clearCart()
        store.addToCart(testProduct)

        await nextTick()

        const raw = localStorage.getItem('3doutlet-cart')
        expect(raw).toBeTruthy()
        expect(raw).toContain(testProduct.title)
    })
})