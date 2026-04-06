import type { PromoSlide } from '../types'

const base = import.meta.env.BASE_URL

const asset = (name: string): string => `${base}${name}`

export const promoSlides: PromoSlide[] = [
    {
        id: 1,
        title: '1 КГ ПЛАСТИКА<br>В ПОДАРОК! <span class="promo-accent">*</span>',
        subtitle: 'БЕСПЛАТНАЯ ДОСТАВКА ПРИ ПОКУПКЕ<br>ОТ 25 000 РУБЛЕЙ',
        buttonText: 'КУПИТЬ СЕЙЧАС',
        note: 'При покупке принтера Bambu Lab',
        image: asset('carusel1.png'),
        imageAlt: 'Промо изображение 1',
    },
    {
        id: 2,
        title: 'СОВРЕМЕННЫЕ<br>3D-РЕШЕНИЯ',
        subtitle: 'НАДЁЖНОЕ ОБОРУДОВАНИЕ И МАТЕРИАЛЫ<br>ДЛЯ БИЗНЕСА И ТВОРЧЕСТВА',
        buttonText: 'ПОДРОБНЕЕ',
        note: 'Специальные условия на популярные позиции',
        image: asset('carusel2.png'),
        imageAlt: 'Промо изображение 2',
    },
    {
        id: 3,
        title: 'ПРОФЕССИОНАЛЬНОЕ<br>ОБОРУДОВАНИЕ',
        subtitle: 'ПОДБОР ТЕХНИКИ И КОМПЛЕКТУЮЩИХ<br>ПОД ВАШИ ЗАДАЧИ',
        buttonText: 'В КАТАЛОГ',
        note: 'Актуальные предложения уточняйте у менеджера',
        image: asset('carusel3.png'),
        imageAlt: 'Промо изображение 3',
    },
    {
        id: 4,
        title: 'ПРОГРАММНОЕ<br>ОБЕСПЕЧЕНИЕ',
        subtitle: 'ЛИЦЕНЗИИ, ПЛАГИНЫ И СЕРВИСЫ<br>ДЛЯ 3D-ПРОЕКТОВ',
        buttonText: 'СМОТРЕТЬ',
        note: 'Поддержка и консультации по подбору решений',
        image: asset('carusel4.png'),
        imageAlt: 'Промо изображение 4',
    },
    {
        id: 5,
        title: 'СКИДКИ НА<br>КОМПЛЕКТУЮЩИЕ',
        subtitle: 'ПОЛЕЗНЫЕ АКСЕССУАРЫ И ЗАПЧАСТИ<br>ДЛЯ СТАБИЛЬНОЙ РАБОТЫ',
        buttonText: 'ВЫБРАТЬ',
        note: 'Количество акционных товаров ограничено',
        image: asset('carusel5.png'),
        imageAlt: 'Промо изображение 5',
    },
    {
        id: 6,
        title: 'ВСЁ ДЛЯ<br>3D-ПЕЧАТИ',
        subtitle: 'ОТ БАЗОВЫХ РЕШЕНИЙ ДО ПРОФ-СЕГМЕНТА<br>В ОДНОМ МЕСТЕ',
        buttonText: 'ОТКРЫТЬ',
        note: 'Доступны индивидуальные предложения для юр. лиц',
        image: asset('carusel6.png'),
        imageAlt: 'Промо изображение 6',
    },
]

export default promoSlides