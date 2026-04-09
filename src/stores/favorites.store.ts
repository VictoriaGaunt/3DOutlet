import { computed, reactive, watch } from 'vue'
import type { Product } from '@/types'

const FAVORITES_STORAGE_KEY = '3doutlet-favorites'

interface FavoritesState {
    items: Record<string, Product>
}

function getItemKey(productId: Product['id']): string {
    return String(productId)
}

function getDefaultState(): FavoritesState {
    return {
        items: {},
    }
}

function readFavoritesState(): FavoritesState {
    if (typeof window === 'undefined') {
        return getDefaultState()
    }

    try {
        const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)

        if (!raw) {
            return getDefaultState()
        }

        const parsed = JSON.parse(raw) as Partial<FavoritesState>

        if (!parsed || typeof parsed !== 'object' || !parsed.items || typeof parsed.items !== 'object') {
            return getDefaultState()
        }

        return {
            items: parsed.items as Record<string, Product>,
        }
    } catch {
        return getDefaultState()
    }
}

const favoritesState = reactive<FavoritesState>(readFavoritesState())

watch(
    favoritesState,
    (value) => {
        if (typeof window === 'undefined') return

        try {
            window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(value))
        } catch {
            // ignore localStorage errors
        }
    },
    { deep: true },
)

function add(product: Product): void {
    favoritesState.items[getItemKey(product.id)] = product
}

function remove(productId: Product['id']): void {
    delete favoritesState.items[getItemKey(productId)]
}

function toggle(product: Product): void {
    if (hasProduct(product.id)) {
        remove(product.id)
        return
    }

    add(product)
}

function hasProduct(productId: Product['id']): boolean {
    return Boolean(favoritesState.items[getItemKey(productId)])
}

function clear(): void {
    Object.keys(favoritesState.items).forEach((key) => {
        delete favoritesState.items[key]
    })
}

const items = computed<Product[]>(() => Object.values(favoritesState.items))
const totalCount = computed<number>(() => items.value.length)
const isEmpty = computed<boolean>(() => items.value.length === 0)

export function useFavoritesStore() {
    return {
        state: favoritesState,
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