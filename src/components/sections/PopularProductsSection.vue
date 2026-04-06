<template>
  <section class="popular-products">
    <div class="popular-products__inner">
      <div class="popular-products__head">
        <h2 class="popular-products__title">
          <span>ПОПУЛЯРНЫЕ МОДЕЛИ</span>
          <img :src="icons.arrowUpRight" alt="arrow" class="popular-products__title-icon" />
        </h2>
      </div>

      <div class="popular-products__grid">
        <ProductCard
            v-for="product in visibleProducts"
            :key="product.id"
            :product="product"
            @open="openProductModal"
        />
      </div>
    </div>

    <AppModal
        :is-open="modal.isOpen"
        :title="modal.title"
        :description="modal.description"
        @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from '../ui/ProductCard.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { products } from '@/data/products'
import { asset } from '@/utils/asset'
import type { Product } from '@/types'

interface ModalState {
  isOpen: boolean
  title: string
  description: string
}

const modal = ref<ModalState>({
  isOpen: false,
  title: '',
  description: '',
})

const page = ref(0)

const icons = {
  arrowUpRight: asset('img8.png'),
}

const visibleProducts = computed(() => {
  return products.slice(page.value * 4, page.value * 4 + 4)
})

function openProductModal(product: Product): void {
  modal.value = {
    isOpen: true,
    title: product.title,
    description: `Здесь позже будет подробная карточка товара ${product.title}, характеристики, фото и дополнительные параметры.`,
  }
}

function closeModal(): void {
  modal.value.isOpen = false
}
</script>

<style scoped>
.popular-products {
  width: 100%;
  padding: 28px 20px 0;
  background: #f3f3f3;
}

.popular-products__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.popular-products__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.popular-products__title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1d232b;
  font-size: clamp(28px, 2.8vw, 54px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.popular-products__title-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.popular-products__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 1100px) {
  .popular-products__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .popular-products {
    padding: 22px 14px 0;
  }

  .popular-products__head {
    margin-bottom: 14px;
    align-items: flex-start;
  }

  .popular-products__title {
    font-size: clamp(22px, 7vw, 32px);
  }

  .popular-products__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>