import type { Product } from './product'

export interface CartItem {
    id: Product['id']
    title: Product['title']
    price: Product['price']
    image: Product['image']
    qty: number
}

export interface CartState {
    items: Record<string, CartItem>
}

export interface AddToCartPayload {
    product: Product
    qty?: number
}

export interface UpdateCartItemPayload {
    productId: Product['id']
    qty: number
}