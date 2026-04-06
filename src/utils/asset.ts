export function asset(name: string): string {
    return `${import.meta.env.BASE_URL}${name}`
}

export function assets(names: string[]): string[] {
    return names.map((name) => asset(name))
}