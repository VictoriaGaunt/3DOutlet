import type { HttpQueryParams } from '@/api/http'

export type ProductId = number

export type ProductBadge = 'хит' | 'топ' | 'нов.' | string
export type ProductSortBy = 'price' | 'title' | 'rating'
export type SortOrder = 'asc' | 'desc'

export interface Product {
    id: ProductId
    category: string
    title: string
    level: string
    rating: string
    reviews: string
    badge?: ProductBadge
    image: string
    images?: string[]
    printType: string
    printArea: string
    price: number
    description?: string
    included?: string[]
}

export interface ProductFilterParams extends HttpQueryParams {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: ProductSortBy
    order?: SortOrder
    minPrice?: number
    maxPrice?: number
}

export interface ProductListResponse {
    items: Product[]
    total: number
    page: number
    limit: number
}