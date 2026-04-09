<template>
  <AppContainer tag="article" variant="card" hoverable class="product-card">
    <div class="product-card__top">
      <div class="product-card__meta">
        <span class="product-card__category">{{ product.category }}</span>

        <div class="product-card__stats">
          <button
              type="button"
              class="product-card__action-icon"
              :class="{ 'is-active': isFavorite }"
              :aria-label="isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'"
              :aria-pressed="isFavorite ? 'true' : 'false'"
              @click.stop="toggleFavorite(product)"
          >
            <img :src="icons.heart" alt="" aria-hidden="true" class="product-card__stat-icon" />
          </button>

          <button
              type="button"
              class="product-card__action-icon"
              :class="{ 'is-active': isCompared }"
              :aria-label="isCompared ? 'Убрать из сравнения' : 'Добавить в сравнение'"
              :aria-pressed="isCompared ? 'true' : 'false'"
              @click.stop="toggleCompare(product)"
          >
            <img :src="icons.compare" alt="" aria-hidden="true" class="product-card__stat-icon" />
          </button>

          <span class="product-card__rating" :aria-label="`Рейтинг ${product.rating}`">
            <img :src="icons.star" alt="" aria-hidden="true" class="product-card__stat-icon" />
            {{ product.rating }}
          </span>

          <span class="product-card__reviews" :aria-label="`Отзывы ${product.reviews}`">
            <img :src="icons.reviews" alt="" aria-hidden="true" class="product-card__stat-icon" />
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
        :aria-label="`Открыть карточку товара ${product.title}`"
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
          :aria-label="`Добавить ${product.title} в корзину за ${formattedPrice} ₽`"
          @click="handleAdd"
      >
        <span class="product-card__buy-left">
          <img :src="icons.cart" alt="" aria-hidden="true" class="product-card__buy-icon" />
          <span>В корзину</span>
        </span>

        <span class="product-card__buy-price">{{ formattedPrice }} ₽</span>
      </AppButton>

      <div class="product-card__counter">
        <button
            class="product-card__counter-btn"
            type="button"
            :aria-label="`Уменьшить количество ${product.title}`"
            @click="handleRemove"
        >
          −
        </button>

        <button
            class="product-card__counter-main"
            type="button"
            :aria-label="`Открыть карточку товара ${product.title}, в корзине ${qty} шт.`"
            @click="emit('open', product)"
        >
          <span class="product-card__counter-text">В корзине</span>
          <span class="product-card__counter-dot" aria-hidden="true">•</span>
          <span class="product-card__counter-qty">{{ qty }} шт</span>
        </button>

        <button
            class="product-card__counter-btn"
            type="button"
            :aria-label="`Увеличить количество ${product.title}`"
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
import { useFavorites } from '@/composables/useFavorites'
import { useCompare } from '@/composables/useCompare'
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
  heart: asset('img6.png'),
  compare: asset('img4.png'),
}

const { addToCart, removeFromCart, getQty, formatPrice } = useCartStore()
const { toggle: toggleFavoriteItem, hasProduct: hasFavoriteProduct } = useFavorites()
const { toggle: toggleCompareItem, hasProduct: hasCompareProduct } = useCompare()

const qty = computed<number>(() => getQty(props.product.id))
const formattedPrice = computed<string>(() => formatPrice(props.product.price))
const isFavorite = computed<boolean>(() => hasFavoriteProduct(props.product.id))
const isCompared = computed<boolean>(() => hasCompareProduct(props.product.id))

function handleAdd(): void {
  addToCart(props.product)
}

function handleRemove(): void {
  removeFromCart(props.product.id)
}

function toggleFavorite(product: Product): void {
  toggleFavoriteItem(product)
}

function toggleCompare(product: Product): void {
  toggleCompareItem(product)
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
  color: #6d737b;
  font-size: 12px;
  line-height: 1;
  font-weight: 500;
  text-transform: lowercase;
}

.product-card__stats {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.product-card__action-icon {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.product-card__action-icon.is-active {
  background: rgba(255, 91, 0, 0.12);
}

.product-card__action-icon:focus-visible,
.product-card__image-wrap:focus-visible,
.product-card__counter-btn:focus-visible,
.product-card__counter-main:focus-visible {
  outline: 2px solid #ff5b00;
  outline-offset: 2px;
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
  color: #737982;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 500;
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
  color: #4a4f56;
  font-size: 13px;
  line-height: 1.2;
  font-weight: 500;
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

.product-card__counter-btn:hover,
.product-card__counter-btn:focus-visible {
  background: rgba(255, 91, 0, 0.08);
  color: #d45500;
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