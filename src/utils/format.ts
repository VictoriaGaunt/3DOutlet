export function formatNumber(value: number): string {
    return new Intl.NumberFormat('ru-RU').format(value)
}

export function formatText(value: string): string {
    return value.trim()
}

export function formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '')

    if (digits.length === 11 && digits.startsWith('7')) {
        return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
    }

    return phone
}

export function truncateText(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
        return value
    }

    return `${value.slice(0, maxLength).trimEnd()}…`
}

export function formatRating(value: string | number): string {
    return String(value).replace(',', '.')
}