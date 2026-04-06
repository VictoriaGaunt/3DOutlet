<template>
  <main class="cart-page">
    <section class="cart-page__hero">
      <div class="cart-page__container">
        <h1 class="cart-page__title">Корзина</h1>
        <p class="cart-page__subtitle">
          Проверьте выбранные товары перед оформлением
        </p>
      </div>
    </section>

    <section class="cart-page__content">
      <div class="cart-page__container">
        <div v-if="!isEmpty" class="cart-page__layout">
          <div class="cart-page__items">
            <article
                v-for="item in cartItems"
                :key="item.id"
                class="cart-page__item"
            >
              <img
                  :src="item.image"
                  :alt="item.title"
                  class="cart-page__item-image"
              />

              <div class="cart-page__item-content">
                <h2 class="cart-page__item-title">{{ item.title }}</h2>
                <p class="cart-page__item-price">
                  {{ formatPrice(item.price) }} за шт.
                </p>

                <div class="cart-page__item-controls">
                  <button
                      type="button"
                      class="cart-page__qty-btn"
                      @click="remove(item.id)"
                  >
                    −
                  </button>

                  <span class="cart-page__qty-value">{{ item.qty }}</span>

                  <button
                      type="button"
                      class="cart-page__qty-btn"
                      @click="add(mapCartItemToProduct(item))"
                  >
                    +
                  </button>

                  <button
                      type="button"
                      class="cart-page__remove-btn"
                      @click="removeItem(item.id)"
                  >
                    Удалить
                  </button>
                </div>
              </div>

              <div class="cart-page__item-total">
                {{ formatPrice(item.price * item.qty) }}
              </div>
            </article>
          </div>

          <aside class="cart-page__summary">
            <h2 class="cart-page__summary-title">Итого</h2>

            <div class="cart-page__summary-row">
              <span>Товаров</span>
              <span>{{ totalCount }}</span>
            </div>

            <div class="cart-page__summary-row cart-page__summary-row--total">
              <span>Сумма</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>

            <button
                type="button"
                class="cart-page__checkout-btn"
            >
              Оформить заказ
            </button>

            <button
                type="button"
                class="cart-page__clear-btn"
                @click="clear()"
            >
              Очистить корзину
            </button>
          </aside>
        </div>

        <div v-else class="cart-page__empty">
          <h2 class="cart-page__empty-title">Корзина пуста</h2>
          <p class="cart-page__empty-text">
            Добавьте товары из каталога, чтобы продолжить покупки.
          </p>

          <RouterLink to="/catalog" class="cart-page__empty-link">
            Перейти в каталог
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart'
import type { CartItem, Product } from '@/types'

const {
  cartItems,
  totalCount,
  totalPrice,
  isEmpty,
  add,
  remove,
  removeItem,
  clear,
  formatPrice,
} = useCart()

function mapCartItemToProduct(item: CartItem): Product {
  return {
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.image,
    category: 'Товар',
    level: '',
    rating: '0',
    reviews: '0',
    printType: '',
    printArea: '',
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f3f3f3;
}

.cart-page__hero {
  padding: 32px 20px 12px;
}

.cart-page__container {
  max-width: 1280px;
  margin: 0 auto;
}

.cart-page__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1;
  font-weight: 800;
}

.cart-page__subtitle {
  margin: 12px 0 0;
  color: #5d636b;
  font-size: 16px;
  line-height: 1.5;
}

.cart-page__content {
  padding: 12px 20px 32px;
}

.cart-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
}

.cart-page__items {
  display: grid;
  gap: 14px;
}

.cart-page__item {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 18px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.cart-page__item-image {
  width: 100%;
  max-width: 120px;
  height: 120px;
  object-fit: contain;
}

.cart-page__item-title {
  margin: 0;
  color: #1d232b;
  font-size: 20px;
  line-height: 1.15;
  font-weight: 800;
}

.cart-page__item-price {
  margin: 8px 0 0;
  color: #6d737c;
  font-size: 14px;
}

.cart-page__item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.cart-page__qty-btn,
.cart-page__remove-btn,
.cart-page__checkout-btn,
.cart-page__clear-btn,
.cart-page__empty-link {
  min-height: 42px;
  padding: 0 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}

.cart-page__qty-btn {
  min-width: 42px;
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
  cursor: pointer;
}

.cart-page__qty-value {
  min-width: 24px;
  text-align: center;
  color: #1d232b;
  font-size: 16px;
  font-weight: 700;
}

.cart-page__remove-btn,
.cart-page__clear-btn {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
  cursor: pointer;
}

.cart-page__item-total {
  color: #1d232b;
  font-size: 22px;
  font-weight: 800;
  white-space: nowrap;
}

.cart-page__summary {
  padding: 20px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
  align-self: start;
}

.cart-page__summary-title {
  margin: 0 0 18px;
  color: #1d232b;
  font-size: 24px;
  font-weight: 800;
}

.cart-page__summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #1d232b;
  font-size: 15px;
  padding: 10px 0;
}

.cart-page__summary-row--total {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #ececf1;
  font-size: 18px;
  font-weight: 800;
}

.cart-page__checkout-btn {
  width: 100%;
  margin-top: 18px;
  border: 0;
  background: #ff5b00;
  color: #ffffff;
  cursor: pointer;
}

.cart-page__clear-btn {
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
}

.cart-page__empty {
  padding: 32px;
  border-radius: 24px;
  background: #ffffff;
  text-align: center;
}

.cart-page__empty-title {
  margin: 0;
  color: #1d232b;
  font-size: 28px;
  font-weight: 800;
}

.cart-page__empty-text {
  margin: 12px 0 0;
  color: #5d636b;
  font-size: 15px;
  line-height: 1.5;
}

.cart-page__empty-link {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: 0;
  background: #ff5b00;
  color: #ffffff;
}

@media (max-width: 980px) {
  .cart-page__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .cart-page__item {
    grid-template-columns: 1fr;
  }

  .cart-page__item-total {
    justify-self: start;
  }
}

@media (max-width: 640px) {
  .cart-page__hero,
  .cart-page__content {
    padding-left: 14px;
    padding-right: 14px;
  }
}
</style>