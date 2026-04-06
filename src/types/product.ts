import type { HttpQueryParams } from '@/api/http'

export type ProductId = number

export type ProductBadge = 'хит' | 'топ' | 'нов.' | string

export interface Product {
    id: ProductId
    category: string
    title: string
    level: string
    rating: string
    reviews: string
    badge?: ProductBadge
    image: string
    printType: string
    printArea: string
    price: number
}

export interface ProductFilterParams extends HttpQueryParams {
    page?: number
    limit?: number
    category?: string
    search?: string
    sortBy?: 'price' | 'title' | 'rating'
    order?: 'asc' | 'desc'
}

export interface ProductListResponse {
    items: Product[]
    total: number
    page: number
    limit: number
}