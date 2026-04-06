import { computed, reactive } from 'vue'
import type { CartItem, CartState, Product } from '../types'

const state = reactive<CartState>({
    items: {},
})

function ensureProduct(product: Product): CartItem {
    const key = String(product.id)

    if (!state.items[key]) {
        state.items[key] = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 0,
        }
    }

    return state.items[key]
}

function addToCart(product: Product): void {
    const item = ensureProduct(product)
    item.qty += 1
}

function removeFromCart(productId: Product['id']): void {
    const key = String(productId)
    const item = state.items[key]

    if (!item) return

    item.qty -= 1

    if (item.qty <= 0) {
        delete state.items[key]
    }
}

function setQty(product: Product, qty: number): void {
    const key = String(product.id)

    if (qty <= 0) {
        delete state.items[key]
        return
    }

    const item = ensureProduct(product)
    item.qty = qty
}

function clearCart(): void {
    Object.keys(state.items).forEach((key) => {
        delete state.items[key]
    })
}

function getQty(productId: Product['id']): number {
    return state.items[String(productId)]?.qty ?? 0
}

const cartItems = computed<CartItem[]>(() => Object.values(state.items))

const totalCount = computed<number>(() => {
    return cartItems.value.reduce((sum, item) => sum + item.qty, 0)
})

const totalPrice = computed<number>(() => {
    return cartItems.value.reduce((sum, item) => sum + item.qty * item.price, 0)
})

function formatPrice(value: number): string {
    return new Intl.NumberFormat('ru-RU').format(value)
}

export function useCartStore() {
    return {
        state,
        cartItems,
        totalCount,
        totalPrice,
        addToCart,
        removeFromCart,
        setQty,
        clearCart,
        getQty,
        formatPrice,
    }
}