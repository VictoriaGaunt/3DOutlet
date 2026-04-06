import { httpClient } from './http'
import type { Product, ProductFilterParams, ProductListResponse } from '@/types'

const PRODUCTS_API_PATH = '/api/products'

export const productsApi = {
    async getProducts(params: ProductFilterParams = {}): Promise<ProductListResponse> {
        return httpClient.get<ProductListResponse>(PRODUCTS_API_PATH, params)
    },

    async getProductById(id: Product['id']): Promise<Product> {
        return httpClient.get<Product>(`${PRODUCTS_API_PATH}/${id}`)
    },
}