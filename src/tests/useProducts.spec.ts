import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useProducts } from '@/composables/useProducts'
import { productsApi } from '@/api/products.api'
import { testProduct } from './helpers'

vi.mock('@/api/products.api', () => ({
    productsApi: {
        getProducts: vi.fn(),
        getProductById: vi.fn(),
    },
}))

describe('useProducts', () => {
    const mockedProductsApi = vi.mocked(productsApi)

    beforeEach(() => {
        mockedProductsApi.getProducts.mockReset()
        mockedProductsApi.getProductById.mockReset()
    })

    it('exposes fetched products', async () => {
        mockedProductsApi.getProducts.mockResolvedValue({
            items: [testProduct],
            total: 1,
            page: 1,
            limit: 12,
        })

        const products = useProducts()
        await products.fetchProducts()

        expect(products.products.value).toHaveLength(1)
        expect(products.total.value).toBe(1)
        expect(products.isEmpty.value).toBe(false)
    })
})