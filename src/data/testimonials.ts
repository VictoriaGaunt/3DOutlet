export interface Testimonial {
    id: number
    name: string
    company?: string
    role?: string
    rating: number
    text: string
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Алексей Морозов',
        company: 'PrintLab Studio',
        role: 'Технический директор',
        rating: 5,
        text:
            'Заказывали оборудование для мастерской. Помогли подобрать модель под наши задачи, все приехало быстро, запуск прошел без проблем.',
    },
    {
        id: 2,
        name: 'Екатерина Власова',
        company: 'Art Prototype',
        role: 'Дизайнер',
        rating: 5,
        text:
            'Понравилось качество консультации и удобство подбора расходников. Хороший выбор материалов и понятная коммуникация на каждом этапе.',
    },
    {
        id: 3,
        name: 'Игорь Нестеров',
        company: 'Fab Production',
        role: 'Инженер-конструктор',
        rating: 4,
        text:
            'Брали принтер и комплектующие для небольшого производства. Отдельный плюс за помощь с настройкой и рекомендации по дальнейшей эксплуатации.',
    },
]

export default testimonials