import type { HeaderNavigationData, NavigationItem } from '../types'

export const contactItems: NavigationItem[] = [
    {
        title: 'Позвонить',
        description: 'Позже здесь будет быстрый переход к звонку.',
    },
    {
        title: 'Написать в Telegram',
        description: 'Позже здесь будет ссылка на Telegram.',
    },
    {
        title: 'Оставить заявку',
        description: 'Позже здесь будет форма заявки.',
    },
]

export const catalogItems: NavigationItem[] = [
    {
        title: '3D-принтеры',
        description: 'Раздел с 3D-принтерами.',
        href: '#catalog',
    },
    {
        title: 'Филаменты',
        description: 'Раздел с материалами для печати.',
        href: '#catalog',
    },
    {
        title: 'Комплектующие',
        description: 'Раздел с комплектующими.',
        href: '#catalog',
    },
]

export const softwareItems: NavigationItem[] = [
    {
        title: 'Лицензии',
        description: 'Раздел с лицензиями.',
    },
    {
        title: 'Плагины',
        description: 'Раздел с плагинами.',
    },
    {
        title: 'Сервисы',
        description: 'Раздел с программными сервисами.',
    },
]

export const headerNavigationData: HeaderNavigationData = {
    contactItems,
    catalogItems,
    softwareItems,
}

export default headerNavigationData