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
- Vitest
- Vue Test Utils
- jsdom
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
- единый `AppModal`
- overlay-страница товара
- каталог с:
  - поиском
  - фильтром по категории
  - сортировкой
- корзина с persistence через `localStorage`
- избранное с persistence через `localStorage`
- сравнение товаров с persistence через `localStorage`
- mock/API-слой с режимами `mock` / `remote`
- базовые accessibility-улучшения:
  - `aria-*` атрибуты
  - keyboard navigation
  - focus management в модалке
  - закрытие модалки по `Escape`
- тесты для ключевых сценариев

## Страницы

- `/` — Home
- `/catalog` — Catalog
- `/product/:id` — Product overlay page
- `/cart` — Cart
- `/favorites` — Favorites
- `/compare` — Compare
- `*` — 404

## Архитектура проекта

```text
src/
├─ api/
├─ app/
│  └─ router/
├─ components/
│  ├─ cart/
│  ├─ header/
│  ├─ product/
│  ├─ sections/
│  └─ ui/
├─ composables/
├─ constants/
├─ data/
├─ pages/
├─ shared/
├─ stores/
├─ tests/
├─ types/
└─ utils/
````

## Основные директории

* `app/` — точка входа приложения и router
* `api/` — HTTP-слой и API-модули
* `pages/` — страницы приложения
* `components/header/` — составной хедер
* `components/sections/` — секции главной страницы
* `components/product/` — компоненты товарной страницы
* `components/ui/` — переиспользуемые UI-компоненты
* `composables/` — composable-логика
* `constants/` — ключи и константы приложения
* `data/` — локальные mock-данные
* `stores/` — состояние приложения
* `shared/` — shared-обёртки и совместимые точки импорта
* `tests/` — Vitest тесты
* `types/` — TypeScript-типы
* `utils/` — вспомогательные функции

## Установка и запуск

### 1. Установить зависимости

```bash
npm install
```

### 2. Запустить локально

```bash
npm run dev
```

### 3. Проверить типы

```bash
npm run type-check
```

### 4. Запустить тесты

```bash
npm run test
```

### 5. Запустить тесты в watch-режиме

```bash
npm run test:watch
```

### 6. Собрать production build

```bash
npm run build
```

### 7. Предпросмотр production build

```bash
npm run preview
```

## Скрипты

```json
{
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  "type-check": "vue-tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:ui": "vitest --ui"
}
```

## API-режимы

Проект поддерживает двухрежимную схему работы данных:

* `mock` — чтение из локальных `src/data/*`
* `remote` — чтение с backend API

Пример переменной окружения:

```env
VITE_API_MODE=mock
```

Планируемые/используемые endpoints:

* `GET /api/products`
* `GET /api/products/:id`
* `GET /api/categories`
* `GET /api/testimonials`
* `GET /api/companies`
* `GET /api/promo-slides`

## Тестирование

Проект покрыт базовыми тестами на критичные сценарии:

* корзина
* `localStorage` persistence
* `products store`
* `useProducts`
* карточка товара
* каталог

  * фильтрация
  * сортировка
  * загрузка данных

Стек тестирования:

* Vitest
* @vue/test-utils
* jsdom

## GitHub Pages

Проект настроен под GitHub Pages через `base` в `vite.config.ts`:

```ts
base: '/3DOutlet/'
```

## Особенности реализации

* проект переведён с JavaScript на TypeScript
* удалены дублирующиеся старые компоненты
* унифицирована структура секций и UI
* старые модалки заменены на единый `AppModal`
* добавлен API abstraction layer
* реализован overlay-flow для страницы товара
* реализованы `favorites` и `compare`
* добавлен persistence для пользовательского состояния
* добавлены тесты на критичные бизнес-сценарии
* улучшена accessibility-база для меню, dropdown и modal

## Текущее состояние проекта

Сейчас проект — это

* UI-архитектура
* состояние приложения
* каталог
* карточки товаров
* persistence
* тесты
* подготовленный API-слоем для перехода на backend

## Roadmap

Следующие этапы развития:

1. подключить backend для content entities:

  * promo slides
  * testimonials
  * trusted companies
  * categories

2. сделать простую admin panel:

  * list
  * create
  * edit
  * toggle active
  * sort order

3. перевести `products` на backend

4. вынести:

  * product descriptions
  * gallery
  * included items
  * filters metadata

## Автор

Victoria Gaunt