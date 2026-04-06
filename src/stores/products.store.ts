import { computed, reactive } from 'vue'
import type { Product, ProductFilterParams } from '../types'
import { productsApi } from '../api/products.api'

interface ProductsState {
    items: Product[]
    selectedProduct: Product | null
    isLoading: boolean
    error: string | null
    total: number
    page: number
    limit: number
    filters: ProductFilterParams
}

const productsState = reactive<ProductsState>({
    items: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
    filters: {},
})

function setLoading(value: boolean): void {
    productsState.isLoading = value
}

function setError(message: string | null): void {
    productsState.error = message
}

function setFilters(filters: Partial<ProductFilterParams>): void {
    productsState.filters = {
        ...productsState.filters,
        ...filters,
    }
}

function resetFilters(): void {
    productsState.filters = {}
}

async function fetchProducts(filters: ProductFilterParams = {}): Promise<void> {
    try {
        setLoading(true)
        setError(null)

        setFilters(filters)

        const response = await productsApi.getProducts(productsState.filters)

        productsState.items = response.items
        productsState.total = response.total
        productsState.page = response.page
        productsState.limit = response.limit
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Не удалось загрузить товары'
        setError(message)
    } finally {
        setLoading(false)
    }
}

async function fetchProductById(id: Product['id']): Promise<void> {
    try {
        setLoading(true)
        setError(null)

        const product = await productsApi.getProductById(id)
        productsState.selectedProduct = product
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Не удалось загрузить товар'
        setError(message)
    } finally {
        setLoading(false)
    }
}

function setSelectedProduct(product: Product | null): void {
    productsState.selectedProduct = product
}

const hasItems = computed<boolean>(() => productsState.items.length > 0)

const isEmpty = computed<boolean>(() => {
    return !productsState.isLoading && productsState.items.length === 0
})

const totalPages = computed<number>(() => {
    if (!productsState.limit) return 1
    return Math.max(1, Math.ceil(productsState.total / productsState.limit))
})

export function useProductsStore() {
    return {
        state: productsState,
        hasItems,
        isEmpty,
        totalPages,
        setLoading,
        setError,
        setFilters,
        resetFilters,
        fetchProducts,
        fetchProductById,
        setSelectedProduct,
    }
}