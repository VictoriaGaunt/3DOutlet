import { computed, reactive, watch } from 'vue'
import { CART_STORAGE_KEY } from '@/constants/storageKeys'
import type { CartItem, CartState, Product } from '@/types'

function getDefaultState(): CartState {
    return {
        items: {},
    }
}

function readCartState(): CartState {
    if (typeof window === 'undefined') {
        return getDefaultState()
    }

    try {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY)

        if (!raw) {
            return getDefaultState()
        }

        const parsed = JSON.parse(raw) as Partial<CartState>

        if (!parsed || typeof parsed !== 'object' || !parsed.items || typeof parsed.items !== 'object') {
            return getDefaultState()
        }

        const normalizedItems: Record<string, CartItem> = {}

        Object.entries(parsed.items).forEach(([key, value]) => {
            if (!value || typeof value !== 'object') return

            const item = value as Partial<CartItem>

            if (
                item.id === undefined ||
                typeof item.title !== 'string' ||
                typeof item.price !== 'number' ||
                typeof item.image !== 'string' ||
                typeof item.qty !== 'number'
            ) {
                return
            }

            if (item.qty <= 0) {
                return
            }

            normalizedItems[key] = {
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                qty: item.qty,
            }
        })

        return {
            items: normalizedItems,
        }
    } catch {
        return getDefaultState()
    }
}

const cartState = reactive<CartState>(readCartState())

function persistCartState(): void {
    if (typeof window === 'undefined') return

    try {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState))
    } catch {
        // ignore localStorage quota/private mode errors
    }
}

watch(
    cartState,
    () => {
        persistCartState()
    },
    { deep: true },
)

function getItemKey(productId: Product['id']): string {
    return String(productId)
}

function ensureCartItem(product: Product): CartItem {
    const key = getItemKey(product.id)

    if (!cartState.items[key]) {
        cartState.items[key] = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 0,
        }
    }

    return cartState.items[key]
}

function addToCart(product: Product, qty = 1): void {
    const item = ensureCartItem(product)
    item.qty += Math.max(1, qty)
}

function removeFromCart(productId: Product['id']): void {
    const key = getItemKey(productId)
    const item = cartState.items[key]

    if (!item) return

    item.qty -= 1

    if (item.qty <= 0) {
        delete cartState.items[key]
    }
}

function removeItem(productId: Product['id']): void {
    delete cartState.items[getItemKey(productId)]
}

function setQty(product: Product, qty: number): void {
    const key = getItemKey(product.id)

    if (qty <= 0) {
        delete cartState.items[key]
        return
    }

    const item = ensureCartItem(product)
    item.qty = qty
}

function getQty(productId: Product['id']): number {
    return cartState.items[getItemKey(productId)]?.qty ?? 0
}

function hasProduct(productId: Product['id']): boolean {
    return getQty(productId) > 0
}

function clearCart(): void {
    Object.keys(cartState.items).forEach((key) => {
        delete cartState.items[key]
    })
}

const items = computed<CartItem[]>(() => Object.values(cartState.items))

const totalCount = computed<number>(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0)
})

const totalPrice = computed<number>(() => {
    return items.value.reduce((sum, item) => sum + item.qty * item.price, 0)
})

const isEmpty = computed<boolean>(() => items.value.length === 0)

function formatPrice(value: number): string {
    return new Intl.NumberFormat('ru-RU').format(value)
}

export function useCartStore() {
    return {
        state: cartState,
        items,
        totalCount,
        totalPrice,
        isEmpty,
        addToCart,
        removeFromCart,
        removeItem,
        setQty,
        getQty,
        hasProduct,
        clearCart,
        formatPrice,
    }
}