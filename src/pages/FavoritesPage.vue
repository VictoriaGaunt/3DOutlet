<template>
  <main class="favorites-page">
    <section class="favorites-page__hero">
      <div class="favorites-page__container">
        <h1 class="favorites-page__title">Избранное</h1>
        <p class="favorites-page__subtitle">
          Сохраненные товары для быстрого доступа
        </p>
      </div>
    </section>

    <section class="favorites-page__content">
      <div class="favorites-page__container">
        <div v-if="isEmpty" class="favorites-page__empty">
          В избранном пока нет товаров.
        </div>

        <div v-else class="favorites-page__grid">
          <article
              v-for="product in items"
              :key="product.id"
              class="favorites-page__card"
          >
            <img
                :src="product.image"
                :alt="product.title"
                class="favorites-page__image"
            />

            <div class="favorites-page__body">
              <span class="favorites-page__category">{{ product.category }}</span>
              <h2 class="favorites-page__name">{{ product.title }}</h2>
              <p class="favorites-page__level">{{ product.level }}</p>
              <div class="favorites-page__price">{{ formatPrice(product.price) }} ₽</div>

              <div class="favorites-page__actions">
                <RouterLink
                    :to="`/product/${product.id}`"
                    class="favorites-page__link"
                >
                  Открыть
                </RouterLink>

                <button
                    type="button"
                    class="favorites-page__button"
                    @click="add(product)"
                >
                  В корзину
                </button>

                <button
                    type="button"
                    class="favorites-page__ghost"
                    @click="remove(product.id)"
                >
                  Удалить
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { useCart } from '@/composables/useCart'

const { items, isEmpty, remove } = useFavorites()
const { add, formatPrice } = useCart()
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: #f3f3f3;
}

.favorites-page__hero {
  padding: 32px 20px 12px;
}

.favorites-page__content {
  padding: 12px 20px 32px;
}

.favorites-page__container {
  max-width: 1280px;
  margin: 0 auto;
}

.favorites-page__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1;
  font-weight: 800;
}

.favorites-page__subtitle {
  margin: 12px 0 0;
  color: #5d636b;
  font-size: 16px;
  line-height: 1.5;
}

.favorites-page__empty {
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  color: #5d636b;
  text-align: center;
}

.favorites-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.favorites-page__card {
  display: flex;
  flex-direction: column;
  padding: 18px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.favorites-page__image {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.favorites-page__body {
  margin-top: 12px;
}

.favorites-page__category {
  color: #7e848c;
  font-size: 13px;
}

.favorites-page__name {
  margin: 8px 0 0;
  color: #1d232b;
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
}

.favorites-page__level {
  margin: 8px 0 0;
  color: #737982;
  font-size: 14px;
  line-height: 1.4;
}

.favorites-page__price {
  margin-top: 14px;
  color: #1d232b;
  font-size: 24px;
  font-weight: 800;
}

.favorites-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.favorites-page__link,
.favorites-page__button,
.favorites-page__ghost {
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.favorites-page__link,
.favorites-page__ghost {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
}

.favorites-page__button {
  border: 0;
  background: #ff5b00;
  color: #ffffff;
  cursor: pointer;
}

.favorites-page__ghost {
  cursor: pointer;
}

@media (max-width: 980px) {
  .favorites-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .favorites-page__hero,
  .favorites-page__content {
    padding-left: 14px;
    padding-right: 14px;
  }

  .favorites-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>