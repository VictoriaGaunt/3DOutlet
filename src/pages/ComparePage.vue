<template>
  <main class="compare-page">
    <section class="compare-page__hero">
      <div class="compare-page__container">
        <h1 class="compare-page__title">Сравнение товаров</h1>
        <p class="compare-page__subtitle">
          Сравните ключевые характеристики выбранных моделей
        </p>
      </div>
    </section>

    <section class="compare-page__content">
      <div class="compare-page__container">
        <div v-if="isEmpty" class="compare-page__empty">
          В сравнении пока нет товаров.
        </div>

        <div v-else class="compare-page__table-wrap">
          <table class="compare-page__table">
            <thead>
            <tr>
              <th>Параметр</th>
              <th v-for="product in items" :key="product.id">
                <div class="compare-page__product-head">
                  <img
                      :src="product.image"
                      :alt="product.title"
                      class="compare-page__image"
                  />
                  <div class="compare-page__name">{{ product.title }}</div>
                  <button
                      type="button"
                      class="compare-page__remove"
                      @click="remove(product.id)"
                  >
                    Удалить
                  </button>
                </div>
              </th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td>Категория</td>
              <td v-for="product in items" :key="`category-${product.id}`">{{ product.category }}</td>
            </tr>
            <tr>
              <td>Цена</td>
              <td v-for="product in items" :key="`price-${product.id}`">{{ formatPrice(product.price) }} ₽</td>
            </tr>
            <tr>
              <td>Уровень</td>
              <td v-for="product in items" :key="`level-${product.id}`">{{ product.level }}</td>
            </tr>
            <tr>
              <td>Тип печати</td>
              <td v-for="product in items" :key="`print-${product.id}`">{{ product.printType }}</td>
            </tr>
            <tr>
              <td>Поле печати</td>
              <td v-for="product in items" :key="`area-${product.id}`">{{ product.printArea }}</td>
            </tr>
            <tr>
              <td>Рейтинг</td>
              <td v-for="product in items" :key="`rating-${product.id}`">{{ product.rating }}</td>
            </tr>
            <tr>
              <td>Отзывы</td>
              <td v-for="product in items" :key="`reviews-${product.id}`">{{ product.reviews }}</td>
            </tr>
            <tr>
              <td>Действия</td>
              <td v-for="product in items" :key="`actions-${product.id}`">
                <div class="compare-page__actions">
                  <RouterLink
                      :to="`/product/${product.id}`"
                      class="compare-page__link"
                  >
                    Открыть
                  </RouterLink>
                  <button
                      type="button"
                      class="compare-page__button"
                      @click="add(product)"
                  >
                    В корзину
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCompare } from '@/composables/useCompare'
import { useCart } from '@/composables/useCart'

const { items, isEmpty, remove } = useCompare()
const { add, formatPrice } = useCart()
</script>

<style scoped>
.compare-page {
  min-height: 100vh;
  background: #f3f3f3;
}

.compare-page__hero {
  padding: 32px 20px 12px;
}

.compare-page__content {
  padding: 12px 20px 32px;
}

.compare-page__container {
  max-width: 1280px;
  margin: 0 auto;
}

.compare-page__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1;
  font-weight: 800;
}

.compare-page__subtitle {
  margin: 12px 0 0;
  color: #5d636b;
  font-size: 16px;
  line-height: 1.5;
}

.compare-page__empty {
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  color: #5d636b;
  text-align: center;
}

.compare-page__table-wrap {
  overflow-x: auto;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.compare-page__table {
  width: 100%;
  border-collapse: collapse;
  min-width: 820px;
}

.compare-page__table th,
.compare-page__table td {
  padding: 16px;
  border-bottom: 1px solid #ececef;
  vertical-align: top;
  text-align: left;
}

.compare-page__product-head {
  display: grid;
  gap: 10px;
}

.compare-page__image {
  width: 100%;
  max-width: 140px;
  height: 120px;
  object-fit: contain;
}

.compare-page__name {
  color: #1d232b;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 800;
}

.compare-page__remove {
  min-height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
  cursor: pointer;
}

.compare-page__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.compare-page__link,
.compare-page__button {
  min-height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.compare-page__link {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
}

.compare-page__button {
  border: 0;
  background: #ff5b00;
  color: #ffffff;
  cursor: pointer;
}

@media (max-width: 640px) {
  .compare-page__hero,
  .compare-page__content {
    padding-left: 14px;
    padding-right: 14px;
  }
}
</style>