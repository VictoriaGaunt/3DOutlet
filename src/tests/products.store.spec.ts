import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useProductsStore } from '@/stores/products.store'
import { productsApi } from '@/api/products.api'
import { testProduct, secondTestProduct } from './helpers'

vi.mock('@/api/products.api', () => ({
    productsApi: {
        getProducts: vi.fn(),
        getProductById: vi.fn(),
    },
}))

describe('products.store', () => {
    const mockedProductsApi = vi.mocked(productsApi)

    beforeEach(() => {
        mockedProductsApi.getProducts.mockReset()
        mockedProductsApi.getProductById.mockReset()
    })

    it('fetches products list', async () => {
        mockedProductsApi.getProducts.mockResolvedValue({
            items: [testProduct, secondTestProduct],
            total: 2,
            page: 1,
            limit: 12,
        })

        const store = useProductsStore()
        await store.fetchProducts()

        expect(store.state.items).toHaveLength(2)
        expect(store.state.total).toBe(2)
        expect(store.hasItems.value).toBe(true)
    })

    it('fetches product by id', async () => {
        mockedProductsApi.getProductById.mockResolvedValue(testProduct)

        const store = useProductsStore()
        await store.fetchProductById(testProduct.id)

        expect(store.state.selectedProduct?.id).toBe(testProduct.id)
    })

    it('handles api error', async () => {
        mockedProductsApi.getProducts.mockRejectedValue(new Error('API error'))

        const store = useProductsStore()
        await store.fetchProducts()

        expect(store.state.error).toBe('API error')
        expect(store.state.items).toEqual([])
    })
})