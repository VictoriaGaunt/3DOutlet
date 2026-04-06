export interface SeoMetaOptions {
    title?: string
    description?: string
    keywords?: string[]
}

const DEFAULT_TITLE = '3DOutlet'
const DEFAULT_DESCRIPTION = '3D-принтеры, материалы, комплектующие и программное обеспечение для 3D-печати.'

function getOrCreateMeta(name: string): HTMLMetaElement {
    let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
    }

    return tag
}

export function setDocumentTitle(title?: string): void {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE
}

export function setMetaDescription(description?: string): void {
    const meta = getOrCreateMeta('description')
    meta.setAttribute('content', description ?? DEFAULT_DESCRIPTION)
}

export function setMetaKeywords(keywords?: string[]): void {
    if (!keywords || keywords.length === 0) return

    const meta = getOrCreateMeta('keywords')
    meta.setAttribute('content', keywords.join(', '))
}

export function applySeoMeta(options: SeoMetaOptions): void {
    setDocumentTitle(options.title)
    setMetaDescription(options.description)
    setMetaKeywords(options.keywords)
}