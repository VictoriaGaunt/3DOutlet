<template>
  <div class="product-actions">
    <button
        type="button"
        class="product-actions__primary"
        @click="$emit('add-to-cart')"
    >
      {{ inCartQty > 0 ? `В корзине: ${inCartQty} шт` : 'В корзину' }}
    </button>

    <button
        type="button"
        class="product-actions__secondary"
        :class="{ 'is-active': isFavorite }"
        @click="$emit('toggle-favorite')"
    >
      {{ isFavorite ? 'Убрать из избранного' : 'В избранное' }}
    </button>

    <button
        type="button"
        class="product-actions__secondary"
        :class="{ 'is-active': isCompared }"
        @click="$emit('toggle-compare')"
    >
      {{ isCompared ? 'Убрать из сравнения' : 'В сравнение' }}
    </button>

    <button
        type="button"
        class="product-actions__link"
        @click="$emit('close')"
    >
      Назад
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  inCartQty: number
  isFavorite: boolean
  isCompared: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'add-to-cart'): void
  (e: 'toggle-favorite'): void
  (e: 'toggle-compare'): void
  (e: 'close'): void
}>()
</script>

<style scoped>
.product-actions {
  display: flex;
  gap: 12px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.product-actions__primary,
.product-actions__secondary,
.product-actions__link {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.product-actions__primary {
  border: 0;
  background: #ff5b00;
  color: #ffffff;
}

.product-actions__secondary {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
}

.product-actions__secondary.is-active {
  border-color: #ff5b00;
  color: #ff5b00;
}

.product-actions__link {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
}
</style>