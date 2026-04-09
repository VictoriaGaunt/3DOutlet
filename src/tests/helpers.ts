import type { Product } from '@/types'

export const testProduct: Product = {
    id: 1,
    category: '3D принтер',
    title: 'BAMBU LAB A1 MINI (EU)',
    level: 'начальный уровень',
    rating: '4.6',
    reviews: '1890',
    badge: 'хит',
    image: '/ProductCard1.png',
    images: ['/ProductCard1.png', '/ProductCard1.png'],
    printType: 'FDM',
    printArea: '256x256x256',
    price: 134000,
    description: 'Тестовое описание товара',
    included: ['Принтер', 'Кабель', 'Документация'],
}

export const secondTestProduct: Product = {
    id: 2,
    category: 'Филаменты',
    title: 'PLA BASIC WHITE',
    level: 'расходный материал',
    rating: '4.9',
    reviews: '540',
    badge: 'топ',
    image: '/ProductCard2.png',
    printType: 'PLA',
    printArea: '1 кг',
    price: 2500,
    description: 'Тестовый филамент',
    included: ['Катушка PLA'],
}

export const thirdTestProduct: Product = {
    id: 3,
    category: '3D принтер',
    title: 'BAMBU LAB X1 CARBON',
    level: 'профессиональный',
    rating: '4.8',
    reviews: '980',
    badge: 'нов.',
    image: '/ProductCard3.png',
    printType: 'FDM',
    printArea: '256x256x256',
    price: 259000,
    description: 'Профессиональный принтер',
    included: ['Принтер', 'Набор аксессуаров'],
}