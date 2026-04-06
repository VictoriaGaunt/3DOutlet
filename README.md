# 3DOutlet

Frontend-проект интернет-витрины для 3D-оборудования, расходников и комплектующих.  
Проект выполнен на **Vue 3 + Vite + TypeScript** и адаптирован под деплой на **GitHub Pages**.

## Демо

После деплоя проект доступен по адресу:

`https://victoriagaunt.github.io/3DOutlet/`

## Стек

- Vue 3
- Vite
- TypeScript
- Vue Router
- @vueuse/motion
- Tailwind CSS v4
- PostCSS

## Что реализовано

- адаптивная главная страница
- верхний хедер с desktop/mobile логикой
- promo slider
- блок категорий
- блок преимуществ
- популярные товары
- секция «Почему нас выбирают»
- отзывы
- блок компаний-партнёров
- telegram promo
- footer
- модальные окна для временных сценариев
- базовая логика корзины
- страницы:
  - Home
  - Catalog
  - Product
  - Cart
  - 404

## Архитектура проекта

```text
src/
├─ api/
├─ app/
│  └─ router/
├─ components/
│  ├─ header/
│  ├─ sections/
│  └─ ui/
├─ composables/
├─ data/
├─ pages/
├─ shared/
├─ stores/
├─ types/
└─ utils/