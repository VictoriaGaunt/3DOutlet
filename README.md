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
````

## Основные директории

* `app/` — точка входа приложения и router
* `pages/` — страницы приложения
* `components/header/` — составной хедер
* `components/sections/` — секции главной страницы
* `components/ui/` — переиспользуемые UI-компоненты
* `data/` — локальные данные проекта
* `stores/` — простые store/composable-решения
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

### 4. Собрать production build

```bash
npm run build
```

### 5. Предпросмотр production build

```bash
npm run preview
```

## Скрипты

```json
{
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  "type-check": "vue-tsc --noEmit"
}
```

## GitHub Pages

Проект настроен под GitHub Pages через `base` в `vite.config.ts`:

```ts
base: '/3DOutlet/'
```

## Особенности реализации

* проект переведен с JavaScript на TypeScript
* удалены дублирующиеся старые компоненты
* унифицирована структура секций и UI
* заменены старые модалки на единый `AppModal`
* проект приведён к более чистой компонентной структуре
* сборка и `type-check` проходят успешно

## Статус проекта

Проект находится в состоянии **рабочего frontend MVP / portfolio case**.

## Автор

Victoria Gaunt

```
```
