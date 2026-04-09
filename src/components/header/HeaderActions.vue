<template>
  <div class="header-actions">
    <button
        class="header-actions__icon-btn header-actions__icon-btn--desktop-only"
        type="button"
        aria-label="Поиск"
        @click="$emit('open-modal', 'Поиск', 'Здесь позже будет поиск по сайту.')"
    >
      <img :src="icons.search" alt="" aria-hidden="true" class="header-actions__icon" />
    </button>

    <RouterLink
        to="/favorites"
        class="header-actions__icon-btn header-actions__icon-btn--desktop-only header-actions__nav-btn"
        aria-label="Избранное"
    >
      <img :src="icons.heart" alt="" aria-hidden="true" class="header-actions__icon" />
      <span v-if="favoritesCount > 0" class="header-actions__badge">
        {{ favoritesCount }}
      </span>
    </RouterLink>

    <RouterLink
        to="/compare"
        class="header-actions__icon-btn header-actions__icon-btn--desktop-only header-actions__nav-btn"
        aria-label="Сравнение"
    >
      <img :src="icons.chart" alt="" aria-hidden="true" class="header-actions__icon" />
      <span v-if="compareCount > 0" class="header-actions__badge">
        {{ compareCount }}
      </span>
    </RouterLink>

    <button class="header-actions__cart" type="button" @click="$emit('open-cart')">
      <img :src="icons.cart" alt="" aria-hidden="true" class="header-actions__cart-icon" />
      <div class="header-actions__cart-info">
        <div class="header-actions__cart-price">{{ cartPriceText }}</div>
        <div class="header-actions__cart-count">{{ cartCountText }}</div>
      </div>
    </button>

    <button
        class="header-actions__icon-btn header-actions__icon-btn--mobile-cart"
        type="button"
        aria-label="Корзина"
        @click="$emit('open-cart')"
    >
      <img :src="icons.cart" alt="" aria-hidden="true" class="header-actions__icon" />
      <span v-if="totalCount > 0" class="header-actions__mobile-badge">
        {{ totalCount }}
      </span>
    </button>

    <button
        class="header-actions__burger"
        type="button"
        aria-label="Открыть меню"
        @click="$emit('toggle-mobile-menu')"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { useCompare } from '@/composables/useCompare'
import { asset } from '@/utils/asset'

interface Props {
  totalCount: number
  totalPrice: number
  formatPrice: (value: number) => string
}

const props = defineProps<Props>()

defineEmits<{
  (e: 'open-modal', title: string, description: string): void
  (e: 'open-cart'): void
  (e: 'toggle-mobile-menu'): void
}>()

const { totalCount: favoritesTotalCount } = useFavorites()
const { totalCount: compareTotalCount } = useCompare()

const icons = {
  search: asset('img7.png'),
  heart: asset('img6.png'),
  chart: asset('img4.png'),
  cart: asset('img5.png'),
}

const cartCountText = computed(() => `${props.totalCount} шт.`)
const cartPriceText = computed(() => `${props.formatPrice(props.totalPrice)} ₽`)
const favoritesCount = computed(() => favoritesTotalCount.value)
const compareCount = computed(() => compareTotalCount.value)
</script>

<style scoped>
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.header-actions__icon-btn {
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.header-actions__nav-btn {
  text-decoration: none;
}

.header-actions__icon-btn:hover {
  background: rgba(240, 127, 23, 0.12);
}

.header-actions__icon-btn:active {
  background: rgba(240, 127, 23, 0.2);
  transform: scale(0.96);
}

.header-actions__icon,
.header-actions__cart-icon {
  display: block;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  object-fit: contain;
}

.header-actions__cart {
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.header-actions__cart:hover {
  background: rgba(240, 127, 23, 0.12);
}

.header-actions__cart:active {
  background: rgba(240, 127, 23, 0.2);
  transform: scale(0.98);
}

.header-actions__cart-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}

.header-actions__cart-price {
  font-size: 14px;
  font-weight: 600;
  color: #1b1b1b;
  white-space: nowrap;
}

.header-actions__cart-count {
  font-size: 12px;
  color: #6f6f75;
  margin-top: 3px;
  white-space: nowrap;
}

.header-actions__icon-btn--mobile-cart {
  display: none;
}

.header-actions__mobile-badge,
.header-actions__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ff5b00;
  color: #ffffff;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-align: center;
}

.header-actions__burger {
  display: none;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background: #ebebee;
  cursor: pointer;
  padding: 0;
  position: relative;
}

.header-actions__burger span {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 2px;
  background: #1b1b1b;
  border-radius: 999px;
}

.header-actions__burger span:nth-child(1) {
  top: 12px;
}

.header-actions__burger span:nth-child(2) {
  top: 19px;
}

.header-actions__burger span:nth-child(3) {
  top: 26px;
}

@media (max-width: 960px) {
  .header-actions__cart,
  .header-actions__icon-btn--desktop-only {
    display: none;
  }

  .header-actions__burger {
    display: inline-flex;
  }

  .header-actions__icon-btn--mobile-cart {
    display: inline-flex;
  }
}

@media (max-width: 640px) {
  .header-actions {
    gap: 8px;
  }

  .header-actions__icon-btn {
    width: 36px;
    height: 36px;
  }

  .header-actions__icon {
    width: 18px;
    height: 18px;
  }
}
</style>