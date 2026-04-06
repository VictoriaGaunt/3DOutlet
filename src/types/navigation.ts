export interface NavigationItem {
    title: string
    description: string
    href?: string
}

export interface NavigationGroup {
    key: string
    title: string
    items: NavigationItem[]
}

export interface HeaderNavigationData {
    contactItems: NavigationItem[]
    catalogItems: NavigationItem[]
    softwareItems: NavigationItem[]
}