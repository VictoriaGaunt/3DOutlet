<template>
  <AppContainer tag="article" variant="card" hoverable class="product-card">
    <div class="product-card__top">
      <div class="product-card__meta">
        <span class="product-card__category">{{ product.category }}</span>

        <div class="product-card__stats">
          <span class="product-card__rating">
            <img :src="icons.star" alt="rating" class="product-card__stat-icon" />
            {{ product.rating }}
          </span>

          <span class="product-card__reviews">
            <img :src="icons.reviews" alt="reviews" class="product-card__stat-icon" />
            {{ product.reviews }}
          </span>
        </div>
      </div>

      <div class="product-card__title-row">
        <h3 class="product-card__title">{{ product.title }}</h3>

        <AppBadge
            v-if="product.badge"
            :label="product.badge"
            variant="info"
            size="sm"
        />
      </div>

      <div class="product-card__level">{{ product.level }}</div>
    </div>

    <button
        class="product-card__image-wrap"
        type="button"
        :aria-label="product.title"
        @click="emit('open', product)"
    >
      <img :src="product.image" :alt="product.title" class="product-card__image" />
    </button>

    <div class="product-card__specs">
      <div class="product-card__spec">
        <span class="product-card__spec-label">тип печати:</span>
        <span class="product-card__spec-value">{{ product.printType }}</span>
      </div>

      <div class="product-card__spec">
        <span class="product-card__spec-label">поле печати:</span>
        <span class="product-card__spec-value">{{ product.printArea }}</span>
      </div>
    </div>

    <div class="product-card__bottom">
      <AppButton
          v-if="qty === 0"
          variant="primary"
          block
          custom-class="product-card__buy-btn"
          @click="handleAdd"
      >
        <span class="product-card__buy-left">
          <img :src="icons.cart" alt="cart" class="product-card__buy-icon" />
          <span>В корзину</span>
        </span>

        <span class="product-card__buy-price">{{ formattedPrice }} ₽</span>
      </AppButton>

      <div v-else class="product-card__counter">
        <button
            class="product-card__counter-btn"
            type="button"
            aria-label="Уменьшить количество"
            @click="handleRemove"
        >
          −
        </button>

        <button
            class="product-card__counter-main"
            type="button"
            @click="emit('open', product)"
        >
          <span class="product-card__counter-text">В корзине</span>
          <span class="product-card__counter-dot">•</span>
          <span class="product-card__counter-qty">{{ qty }} шт</span>
        </button>

        <button
            class="product-card__counter-btn"
            type="button"
            aria-label="Увеличить количество"
            @click="handleAdd"
        >
          +
        </button>
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppBadge from './AppBadge.vue'
import AppButton from './AppButton.vue'
import AppContainer from './AppContainer.vue'
import { useCartStore } from '@/shared/cartStore'
import { asset } from '@/utils/asset'
import type { Product } from '@/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'open', product: Product): void
}>()

const icons = {
  star: asset('ProductCard3.png'),
  reviews: asset('ProductCard4.png'),
  cart: asset('ProductCard2.png'),
}

const { addToCart, removeFromCart, getQty, formatPrice } = useCartStore()

const qty = computed<number>(() => getQty(props.product.id))
const formattedPrice = computed<string>(() => formatPrice(props.product.price))

function handleAdd(): void {
  addToCart(props.product)
}

function handleRemove(): void {
  removeFromCart(props.product.id)
}
</script>

<style scoped>
.product-card {
  min-height: 100%;
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
}

.product-card__top {
  min-height: 72px;
}

.product-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.product-card__category {
  color: #8c9199;
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  text-transform: lowercase;
}

.product-card__stats {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.product-card__rating,
.product-card__reviews {
  color: #1d232b;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.product-card__stat-icon {
  width: 12px;
  height: 12px;
  object-fit: contain;
}

.product-card__title-row {
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.product-card__title {
  margin: 0;
  color: #1d232b;
  font-size: 16px;
  line-height: 1.05;
  font-weight: 800;
  text-transform: uppercase;
  max-width: calc(100% - 48px);
}

.product-card__level {
  margin-top: 6px;
  color: #a3a8b0;
  font-size: 12px;
  line-height: 1.1;
  font-weight: 400;
}

.product-card__image-wrap {
  margin-top: 10px;
  width: 100%;
  min-height: 165px;
  border: 0;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.product-card__image {
  width: 100%;
  max-width: 190px;
  height: 160px;
  object-fit: contain;
  display: block;
  transition: transform 0.25s ease;
}

.product-card:hover .product-card__image {
  transform: scale(1.03);
}

.product-card__specs {
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 16px;
}

.product-card__spec {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-card__spec-label {
  color: #1d232b;
  font-size: 12px;
  line-height: 1.1;
  font-weight: 700;
  text-transform: lowercase;
}

.product-card__spec-value {
  color: #585e66;
  font-size: 13px;
  line-height: 1.15;
  font-weight: 400;
}

.product-card__bottom {
  margin-top: auto;
  padding-top: 12px;
}

:deep(.product-card__buy-btn) {
  justify-content: space-between;
  gap: 16px;
  box-shadow: none;
}

.product-card__buy-left {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.product-card__buy-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.product-card__buy-left span,
.product-card__buy-price {
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
}

.product-card__counter {
  width: 100%;
  min-height: 42px;
  border: 1.5px solid rgba(17, 17, 17, 0.18);
  border-radius: 12px;
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  overflow: hidden;
  background: #ffffff;
}

.product-card__counter-btn,
.product-card__counter-main {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.product-card__counter-btn {
  font-size: 22px;
  line-height: 1;
  color: #1d232b;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.product-card__counter-btn:hover {
  background: rgba(255, 91, 0, 0.08);
  color: #ff5b00;
}

.product-card__counter-main {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 8px;
}

.product-card__counter-text,
.product-card__counter-qty,
.product-card__counter-dot {
  color: #1d232b;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .product-card {
    padding: 12px 12px 10px;
  }

  .product-card__image-wrap {
    min-height: 145px;
  }

  .product-card__image {
    max-width: 170px;
    height: 138px;
  }

  .product-card__specs {
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
  }

  .product-card__buy-left span,
  .product-card__buy-price,
  .product-card__counter-text,
  .product-card__counter-qty,
  .product-card__counter-dot {
    font-size: 11px;
  }
}
</style>