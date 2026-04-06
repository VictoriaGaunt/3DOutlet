import { computed } from 'vue'
import { useCartStore } from '../stores/cart.store'
import type { Product } from '../types'

export function useCart() {
    const cartStore = useCartStore()

    const cartItems = computed(() => cartStore.items.value)
    const totalCount = computed(() => cartStore.totalCount.value)
    const totalPrice = computed(() => cartStore.totalPrice.value)
    const isEmpty = computed(() => cartStore.isEmpty.value)

    function add(product: Product, qty = 1): void {
        cartStore.addToCart(product, qty)
    }

    function remove(productId: Product['id']): void {
        cartStore.removeFromCart(productId)
    }

    function removeItem(productId: Product['id']): void {
        cartStore.removeItem(productId)
    }

    function setQty(product: Product, qty: number): void {
        cartStore.setQty(product, qty)
    }

    function getQty(productId: Product['id']): number {
        return cartStore.getQty(productId)
    }

    function hasProduct(productId: Product['id']): boolean {
        return cartStore.hasProduct(productId)
    }

    function clear(): void {
        cartStore.clearCart()
    }

    function formatPrice(value: number): string {
        return cartStore.formatPrice(value)
    }

    return {
        cartItems,
        totalCount,
        totalPrice,
        isEmpty,
        add,
        remove,
        removeItem,
        setQty,
        getQty,
        hasProduct,
        clear,
        formatPrice,
    }
}