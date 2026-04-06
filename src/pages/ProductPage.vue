<template>
  <main class="product-page">
    <section class="product-page__content">
      <div class="product-page__container">
        <div v-if="product" class="product-page__layout">
          <div class="product-page__gallery">
            <img
                :src="product.image"
                :alt="product.title"
                class="product-page__image"
            />
          </div>

          <div class="product-page__info">
            <span class="product-page__category">{{ product.category }}</span>

            <div class="product-page__title-row">
              <h1 class="product-page__title">{{ product.title }}</h1>
              <span v-if="product.badge" class="product-page__badge">{{ product.badge }}</span>
            </div>

            <p class="product-page__level">{{ product.level }}</p>

            <div class="product-page__rating">
              Рейтинг: {{ product.rating }} · Отзывы: {{ product.reviews }}
            </div>

            <div class="product-page__specs">
              <div class="product-page__spec">
                <span class="product-page__spec-label">Тип печати</span>
                <span class="product-page__spec-value">{{ product.printType }}</span>
              </div>

              <div class="product-page__spec">
                <span class="product-page__spec-label">Поле печати</span>
                <span class="product-page__spec-value">{{ product.printArea }}</span>
              </div>
            </div>

            <div class="product-page__price">{{ formatPrice(product.price) }}</div>

            <div class="product-page__actions">
              <button
                  type="button"
                  class="product-page__button"
                  @click="add(product)"
              >
                В корзину
              </button>

              <RouterLink to="/catalog" class="product-page__link">
                Назад в каталог
              </RouterLink>
            </div>
          </div>
        </div>

        <div v-else class="product-page__not-found">
          <h1 class="product-page__not-found-title">Товар не найден</h1>
          <RouterLink to="/catalog" class="product-page__link">
            Перейти в каталог
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { products } from '@/data/products'
import { useCart } from '@/composables/useCart'

const route = useRoute()
const { add, formatPrice } = useCart()

const productId = computed<number>(() => Number(route.params.id))
const product = computed(() => {
  return products.find((item) => item.id === productId.value) ?? null
})
</script>

<style scoped>
.product-page {
  min-height: 100vh;
  background: #f3f3f3;
}

.product-page__content {
  padding: 32px 20px;
}

.product-page__container {
  max-width: 1280px;
  margin: 0 auto;
}

.product-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 520px) minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.product-page__gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  border-radius: 24px;
  background: #f8f8f8;
}

.product-page__image {
  width: 100%;
  max-width: 420px;
  height: 360px;
  object-fit: contain;
}

.product-page__category {
  color: #7b8189;
  font-size: 14px;
}

.product-page__title-row {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.product-page__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(28px, 3vw, 48px);
  line-height: 1.02;
  font-weight: 800;
}

.product-page__badge {
  min-width: 40px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #e7f4ff;
  color: #1683c7;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.product-page__level {
  margin: 12px 0 0;
  color: #636a73;
  font-size: 16px;
  line-height: 1.5;
}

.product-page__rating {
  margin-top: 16px;
  color: #1d232b;
  font-size: 15px;
}

.product-page__specs {
  margin-top: 20px;
  display: grid;
  gap: 12px;
}

.product-page__spec {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8f8f8;
}

.product-page__spec-label {
  color: #7b8189;
  font-size: 13px;
}

.product-page__spec-value {
  color: #1d232b;
  font-size: 16px;
  font-weight: 700;
}

.product-page__price {
  margin-top: 24px;
  color: #1d232b;
  font-size: 34px;
  font-weight: 800;
}

.product-page__actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.product-page__button,
.product-page__link {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.product-page__button {
  border: 0;
  background: #ff5b00;
  color: #ffffff;
  cursor: pointer;
}

.product-page__link {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
}

.product-page__not-found {
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  text-align: center;
}

.product-page__not-found-title {
  margin: 0 0 18px;
  color: #1d232b;
  font-size: 30px;
  font-weight: 800;
}

@media (max-width: 900px) {
  .product-page__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .product-page__content {
    padding-left: 14px;
    padding-right: 14px;
  }

  .product-page__layout {
    padding: 16px;
    border-radius: 20px;
  }

  .product-page__gallery {
    min-height: 280px;
  }

  .product-page__image {
    height: 240px;
  }
}
</style>