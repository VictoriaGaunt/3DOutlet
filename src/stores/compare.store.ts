import { computed, reactive, watch } from 'vue'
import type { Product } from '@/types'

const COMPARE_STORAGE_KEY = '3doutlet-compare'

interface CompareState {
    items: Record<string, Product>
}

function getItemKey(productId: Product['id']): string {
    return String(productId)
}

function getDefaultState(): CompareState {
    return {
        items: {},
    }
}

function readCompareState(): CompareState {
    if (typeof window === 'undefined') {
        return getDefaultState()
    }

    try {
        const raw = window.localStorage.getItem(COMPARE_STORAGE_KEY)

        if (!raw) {
            return getDefaultState()
        }

        const parsed = JSON.parse(raw) as Partial<CompareState>

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

const compareState = reactive<CompareState>(readCompareState())

watch(
    compareState,
    (value) => {
        if (typeof window === 'undefined') return

        try {
            window.localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(value))
        } catch {
            // ignore localStorage errors
        }
    },
    { deep: true },
)

function add(product: Product): void {
    compareState.items[getItemKey(product.id)] = product
}

function remove(productId: Product['id']): void {
    delete compareState.items[getItemKey(productId)]
}

function toggle(product: Product): void {
    if (hasProduct(product.id)) {
        remove(product.id)
        return
    }

    add(product)
}

function hasProduct(productId: Product['id']): boolean {
    return Boolean(compareState.items[getItemKey(productId)])
}

function clear(): void {
    Object.keys(compareState.items).forEach((key) => {
        delete compareState.items[key]
    })
}

const items = computed<Product[]>(() => Object.values(compareState.items))
const totalCount = computed<number>(() => items.value.length)
const isEmpty = computed<boolean>(() => items.value.length === 0)

export function useCompareStore() {
    return {
        state: compareState,
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