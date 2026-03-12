import { computed, reactive } from 'vue'

const state = reactive({
    items: {},
})

function ensureProduct(product) {
    if (!state.items[product.id]) {
        state.items[product.id] = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 0,
        }
    }

    return state.items[product.id]
}

function addToCart(product) {
    const item = ensureProduct(product)
    item.qty += 1
}

function removeFromCart(productId) {
    const item = state.items[productId]
    if (!item) return

    item.qty -= 1

    if (item.qty <= 0) {
        delete state.items[productId]
    }
}

function setQty(product, qty) {
    if (qty <= 0) {
        delete state.items[product.id]
        return
    }

    const item = ensureProduct(product)
    item.qty = qty
}

function getQty(productId) {
    return state.items[productId]?.qty ?? 0
}

const cartItems = computed(() => Object.values(state.items))

const totalCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.qty, 0),
)

const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.qty * item.price, 0),
)

function formatPrice(value) {
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
        getQty,
        formatPrice,
    }
}