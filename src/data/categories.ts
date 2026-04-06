import type { Category } from '../types'

const base = import.meta.env.BASE_URL

const asset = (name: string): string => `${base}${name}`

export const categories: Category[] = [
    {
        id: 1,
        title: '3D ПРИНТЕРЫ',
        description: 'Мощные инструменты для изготовления 3D-моделей',
        image: asset('categories2.png'),
        modalTitle: '3D Принтеры',
        modalDescription:
            'Здесь позже будет каталог 3D-принтеров, фильтры, карточки товаров и подробная информация по моделям.',
    },
    {
        id: 2,
        title: 'ФИЛАМЕНТЫ',
        description: 'Высококачественные материалы для 3D-печати',
        image: asset('categories3.png'),
        modalTitle: 'Филаменты',
        modalDescription:
            'Здесь позже будет раздел с филаментами: типы пластиков, цвета, характеристики и наличие.',
    },
    {
        id: 3,
        title: 'АКСЕССУАРЫ',
        description: 'Обновите свой принтер с помощью современных деталей',
        image: asset('categories4.png'),
        modalTitle: 'Аксессуары',
        modalDescription:
            'Здесь позже будет раздел с аксессуарами, комплектующими и дополнительным оборудованием.',
    },
    {
        id: 4,
        title: 'АКЦИИ',
        description: 'Уникальные акции и скидки',
        image: asset('categories5.png'),
        modalTitle: 'Акции',
        modalDescription:
            'Здесь позже будут размещены акционные предложения, скидки и специальные условия покупки.',
    },
]

export default categories