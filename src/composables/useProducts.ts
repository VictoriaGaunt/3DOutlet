import { computed } from 'vue'
import { useProductsStore } from '@/stores/products.store'
import type { Product, ProductFilterParams } from '@/types'

export function useProducts() {
    const productsStore = useProductsStore()

    const products = computed(() => productsStore.state.items)
    const selectedProduct = computed(() => productsStore.state.selectedProduct)
    const isLoading = computed(() => productsStore.state.isLoading)
    const error = computed(() => productsStore.state.error)
    const total = computed(() => productsStore.state.total)
    const page = computed(() => productsStore.state.page)
    const limit = computed(() => productsStore.state.limit)
    const filters = computed(() => productsStore.state.filters)

    const hasItems = computed(() => productsStore.hasItems.value)
    const isEmpty = computed(() => productsStore.isEmpty.value)
    const totalPages = computed(() => productsStore.totalPages.value)

    async function fetchProducts(
        filtersValue: ProductFilterParams = {},
    ): Promise<void> {
        await productsStore.fetchProducts(filtersValue)
    }

    async function fetchProductById(id: Product['id']): Promise<void> {
        await productsStore.fetchProductById(id)
    }

    function setSelectedProduct(product: Product | null): void {
        productsStore.setSelectedProduct(product)
    }

    function setFilters(nextFilters: Partial<ProductFilterParams>): void {
        productsStore.setFilters(nextFilters)
    }

    function resetFilters(): void {
        productsStore.resetFilters()
    }

    return {
        products,
        selectedProduct,
        isLoading,
        error,
        total,
        page,
        limit,
        filters,
        hasItems,
        isEmpty,
        totalPages,
        fetchProducts,
        fetchProductById,
        setSelectedProduct,
        setFilters,
        resetFilters,
    }
}