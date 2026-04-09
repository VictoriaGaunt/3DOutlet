import { httpClient } from './http'
import { products as mockProducts } from '@/data/products'
import type { Product, ProductFilterParams, ProductListResponse } from '@/types'

const PRODUCTS_API_PATH = '/api/products'

type ApiMode = 'mock' | 'remote'

function getApiMode(): ApiMode {
    const mode = import.meta.env.VITE_API_MODE?.trim().toLowerCase()
    return mode === 'remote' ? 'remote' : 'mock'
}

function normalizeSearch(value?: string): string {
    return (value ?? '').trim().toLowerCase()
}

function sortProducts(
    items: Product[],
    sortBy?: ProductFilterParams['sortBy'],
    order: ProductFilterParams['order'] = 'asc',
): Product[] {
    if (!sortBy) {
        return items
    }

    const sorted = [...items].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price
        }

        if (sortBy === 'title') {
            return a.title.localeCompare(b.title, 'ru')
        }

        if (sortBy === 'rating') {
            return Number(a.rating) - Number(b.rating)
        }

        return 0
    })

    return order === 'desc' ? sorted.reverse() : sorted
}

function buildMockProductsResponse(
    params: ProductFilterParams = {},
): ProductListResponse {
    const page = Number(params.page ?? 1)
    const limit = Number(params.limit ?? 12)
    const search = normalizeSearch(params.search)
    const category = params.category?.trim()
    const minPrice =
        typeof params.minPrice === 'number' ? params.minPrice : undefined
    const maxPrice =
        typeof params.maxPrice === 'number' ? params.maxPrice : undefined

    let items = [...mockProducts]

    if (search) {
        items = items.filter((product) => {
            const title = product.title.toLowerCase()
            const type = product.printType.toLowerCase()
            const productCategory = product.category.toLowerCase()

            return (
                title.includes(search) ||
                type.includes(search) ||
                productCategory.includes(search)
            )
        })
    }

    if (category && category !== 'all') {
        items = items.filter((product) => product.category === category)
    }

    if (minPrice !== undefined) {
        items = items.filter((product) => product.price >= minPrice)
    }

    if (maxPrice !== undefined) {
        items = items.filter((product) => product.price <= maxPrice)
    }

    items = sortProducts(items, params.sortBy, params.order)

    const total = items.length
    const safePage = Math.max(1, page)
    const safeLimit = Math.max(1, limit)
    const start = (safePage - 1) * safeLimit
    const end = start + safeLimit

    return {
        items: items.slice(start, end),
        total,
        page: safePage,
        limit: safeLimit,
    }
}

async function getMockProducts(
    params: ProductFilterParams = {},
): Promise<ProductListResponse> {
    return Promise.resolve(buildMockProductsResponse(params))
}

async function getMockProductById(id: Product['id']): Promise<Product> {
    const product = mockProducts.find((item) => item.id === id)

    if (!product) {
        throw new Error(`Товар с id=${id} не найден`)
    }

    return Promise.resolve(product)
}

export const productsApi = {
    async getProducts(
        params: ProductFilterParams = {},
    ): Promise<ProductListResponse> {
        if (getApiMode() === 'mock') {
            return getMockProducts(params)
        }

        return httpClient.get<ProductListResponse>(PRODUCTS_API_PATH, params)
    },

    async getProductById(id: Product['id']): Promise<Product> {
        if (getApiMode() === 'mock') {
            return getMockProductById(id)
        }

        return httpClient.get<Product>(`${PRODUCTS_API_PATH}/${id}`)
    },
}