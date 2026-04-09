<template>
  <section v-if="items.length > 0" class="related-products">
    <h2 class="related-products__title">Похожие товары</h2>

    <div class="related-products__grid">
      <article
          v-for="item in items"
          :key="item.id"
          class="related-products__card"
      >
        <img
            :src="item.image"
            :alt="item.title"
            class="related-products__image"
        />

        <div class="related-products__body">
          <span class="related-products__category">{{ item.category }}</span>
          <h3 class="related-products__name">{{ item.title }}</h3>
          <div class="related-products__price">{{ formatPrice(item.price) }} ₽</div>

          <RouterLink
              :to="`/product/${item.id}`"
              class="related-products__link"
          >
            Открыть
          </RouterLink>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '@/types'

interface Props {
  items: Product[]
  formatPrice: (value: number) => string
}

defineProps<Props>()
</script>

<style scoped>
.related-products {
  margin-top: 28px;
}

.related-products__title {
  margin: 0 0 14px;
  color: #1d232b;
  font-size: 24px;
  font-weight: 800;
}

.related-products__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.related-products__card {
  padding: 16px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.related-products__image {
  width: 100%;
  height: 140px;
  object-fit: contain;
}

.related-products__body {
  margin-top: 10px;
}

.related-products__category {
  color: #7b8189;
  font-size: 12px;
}

.related-products__name {
  margin: 8px 0 0;
  color: #1d232b;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 800;
}

.related-products__price {
  margin-top: 10px;
  color: #1d232b;
  font-size: 20px;
  font-weight: 800;
}

.related-products__link {
  margin-top: 12px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 980px) {
  .related-products__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .related-products__grid {
    grid-template-columns: 1fr;
  }
}
</style>