export function formatPrice(value: number, withCurrency = true): string {
    const formatted = new Intl.NumberFormat('ru-RU').format(value)

    return withCurrency ? `${formatted} ₽` : formatted
}

export function formatPriceWithRub(value: number): string {
    return `${new Intl.NumberFormat('ru-RU').format(value)} руб.`
}

export function calculateItemTotal(price: number, qty: number): number {
    return price * qty
}

export function calculateCartTotal(items: Array<{ price: number; qty: number }>): number {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}