<template>
  <div class="product-info">
    <span class="product-info__category">{{ product.category }}</span>

    <div class="product-info__title-row">
      <h1 class="product-info__title">{{ product.title }}</h1>
      <span v-if="product.badge" class="product-info__badge">{{ product.badge }}</span>
    </div>

    <p class="product-info__level">{{ product.level }}</p>

    <div class="product-info__rating">
      Рейтинг: {{ product.rating }} · Отзывы: {{ product.reviews }}
    </div>

    <div class="product-info__price">{{ formattedPrice }} ₽</div>

    <div class="product-info__specs">
      <div class="product-info__spec">
        <span class="product-info__spec-label">Тип печати</span>
        <span class="product-info__spec-value">{{ product.printType }}</span>
      </div>

      <div class="product-info__spec">
        <span class="product-info__spec-label">Поле печати</span>
        <span class="product-info__spec-value">{{ product.printArea }}</span>
      </div>
    </div>

    <div class="product-info__description-block">
      <h2 class="product-info__section-title">Описание</h2>
      <p class="product-info__description">{{ description }}</p>
    </div>

    <div class="product-info__included-block">
      <h2 class="product-info__section-title">Что входит в комплект</h2>
      <ul class="product-info__included">
        <li
            v-for="item in included"
            :key="item"
            class="product-info__included-item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types'

interface Props {
  product: Product
  description: string
  included: string[]
  formattedPrice: string
}

defineProps<Props>()
</script>

<style scoped>
.product-info__category {
  color: #7b8189;
  font-size: 14px;
}

.product-info__title-row {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.product-info__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(28px, 3vw, 48px);
  line-height: 1.02;
  font-weight: 800;
}

.product-info__badge {
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

.product-info__level {
  margin: 12px 0 0;
  color: #636a73;
  font-size: 16px;
  line-height: 1.5;
}

.product-info__rating {
  margin-top: 16px;
  color: #1d232b;
  font-size: 15px;
}

.product-info__price {
  margin-top: 20px;
  color: #1d232b;
  font-size: 34px;
  font-weight: 800;
}

.product-info__specs {
  margin-top: 20px;
  display: grid;
  gap: 12px;
}

.product-info__spec {
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8f8f8;
}

.product-info__spec-label {
  color: #7b8189;
  font-size: 13px;
}

.product-info__spec-value {
  color: #1d232b;
  font-size: 16px;
  font-weight: 700;
}

.product-info__description-block,
.product-info__included-block {
  margin-top: 20px;
}

.product-info__section-title {
  margin: 0 0 10px;
  color: #1d232b;
  font-size: 18px;
  font-weight: 800;
}

.product-info__description {
  margin: 0;
  color: #4d5560;
  font-size: 15px;
  line-height: 1.6;
}

.product-info__included {
  margin: 0;
  padding-left: 18px;
  color: #4d5560;
  font-size: 15px;
  line-height: 1.6;
}
</style>