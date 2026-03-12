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

    <ModalCard
        :is-open="modal.isOpen"
        :title="modal.title"
        :description="modal.description"
        @close="closeModal"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProductCard from '@/ui/ProductCard.vue'
import ModalCard from '../ModalCard.vue'

const modal = ref({
  isOpen: false,
  title: '',
  description: '',
})

const base = import.meta.env.BASE_URL
const asset = (name) => `${base}${name}`

const page = ref(0)

const icons = {
  arrowUpRight: asset('img8.png'),
}

const products = [
  {
    id: 1,
    category: '3D принтер',
    title: 'BAMBU LAB A1 MINI (EU)',
    level: 'начальный уровень',
    rating: '4.6',
    reviews: '1890',
    badge: 'хит',
    image: asset('ProductCard1.png'),
    printType: 'FDM',
    printArea: '256x256x256',
    price: 134000,
  },
  {
    id: 2,
    category: '3D принтер',
    title: 'BAMBU LAB P1S COMBO',
    level: 'полупрофессиональный',
    rating: '4.8',
    reviews: '1240',
    badge: 'хит',
    image: asset('ProductCard1.png'),
    printType: 'FDM',
    printArea: '256x256x256',
    price: 189000,
  },
  {
    id: 3,
    category: '3D принтер',
    title: 'BAMBU LAB X1 CARBON',
    level: 'профессиональный уровень',
    rating: '4.9',
    reviews: '980',
    badge: 'топ',
    image: asset('ProductCard1.png'),
    printType: 'FDM',
    printArea: '256x256x256',
    price: 259000,
  },
  {
    id: 4,
    category: '3D принтер',
    title: 'BAMBU LAB A1 COMBO',
    level: 'дом и мастерская',
    rating: '4.7',
    reviews: '1560',
    badge: 'нов.',
    image: asset('ProductCard1.png'),
    printType: 'FDM',
    printArea: '256x256x256',
    price: 159000,
  },
]

const visibleProducts = computed(() => {
  return products.slice(page.value * 4, page.value * 4 + 4)
})

function openProductModal(product) {
  modal.value = {
    isOpen: true,
    title: product.title,
    description: `Здесь позже будет подробная карточка товара ${product.title}, характеристики, фото и дополнительные параметры.`,
  }
}

function closeModal() {
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