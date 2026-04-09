<template>
  <main class="product-page">
    <div class="product-page__backdrop" @click="handleClose"></div>

    <section class="product-page__content">
      <div class="product-page__container">
        <div v-if="isLoading" class="product-page__status">
          Загрузка товара...
        </div>

        <div v-else-if="error" class="product-page__status product-page__status--error">
          {{ error }}
        </div>

        <div v-else-if="product" class="product-page__panel">
          <button
              type="button"
              class="product-page__close"
              aria-label="Закрыть"
              @click="handleClose"
          >
            ×
          </button>

          <div class="product-page__layout">
            <ProductGallery
                :images="galleryImages"
                :title="product.title"
            />

            <div class="product-page__info">
              <ProductInfo
                  :product="product"
                  :description="productDescription"
                  :included="includedItems"
                  :formatted-price="formatPrice(product.price)"
              />

              <ProductActions
                  :in-cart-qty="inCartQty"
                  :is-favorite="isFavorite"
                  :is-compared="isCompared"
                  @add-to-cart="handleAddToCart"
                  @toggle-favorite="toggleFavorite"
                  @toggle-compare="toggleCompare"
                  @close="handleClose"
              />
            </div>
          </div>

          <RelatedProducts
              :items="relatedProducts"
              :format-price="formatPrice"
          />
        </div>

        <div v-else class="product-page__not-found">
          <h1 class="product-page__not-found-title">Товар не найден</h1>
          <button
              type="button"
              class="product-page__back-button"
              @click="handleClose"
          >
            Назад
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ProductGallery from '@/components/product/ProductGallery.vue'
import ProductInfo from '@/components/product/ProductInfo.vue'
import ProductActions from '@/components/product/ProductActions.vue'
import RelatedProducts from '@/components/product/RelatedProducts.vue'
import { useProducts } from '@/composables/useProducts'
import { useCart } from '@/composables/useCart'
import type { Product } from '@/types'

interface Props {
  id: number
}

const props = defineProps<Props>()

const FAVORITES_STORAGE_KEY = '3doutlet-favorites'
const COMPARE_STORAGE_KEY = '3doutlet-compare'

const router = useRouter()

const {
  selectedProduct,
  products,
  isLoading,
  error,
  fetchProductById,
  fetchProducts,
} = useProducts()
const { add, getQty, formatPrice } = useCart()

const favoriteIds = ref<number[]>([])
const compareIds = ref<number[]>([])

const product = computed<Product | null>(() => selectedProduct.value)

const galleryImages = computed<string[]>(() => {
  if (!product.value) return []
  return product.value.images?.length ? product.value.images : [product.value.image]
})

const productDescription = computed<string>(() => {
  if (!product.value) return ''

  if (product.value.description) {
    return product.value.description
  }

  return `${product.value.title} — решение для задач 3D-печати и прототипирования. Подходит для сценариев "${product.value.level}", поддерживает технологию ${product.value.printType} и рабочую область ${product.value.printArea}.`
})

const includedItems = computed<string[]>(() => {
  if (!product.value) return []

  if (product.value.included?.length) {
    return product.value.included
  }

  return [
    product.value.title,
    'Базовый комплект для запуска',
    'Кабель питания и документация',
  ]
})

const inCartQty = computed<number>(() => {
  if (!product.value) return 0
  return getQty(product.value.id)
})

const isFavorite = computed<boolean>(() => {
  if (!product.value) return false
  return favoriteIds.value.includes(product.value.id)
})

const isCompared = computed<boolean>(() => {
  if (!product.value) return false
  return compareIds.value.includes(product.value.id)
})

const relatedProducts = computed<Product[]>(() => {
  if (!product.value) return []

  return products.value
      .filter((item) => item.id !== product.value?.id)
      .slice(0, 4)
})

function readStoredIds(key: string): number[] {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((item): item is number => typeof item === 'number')
  } catch {
    return []
  }
}

function writeStoredIds(key: string, ids: number[]): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(ids))
  } catch {
    // ignore
  }
}

function loadStorageState(): void {
  favoriteIds.value = readStoredIds(FAVORITES_STORAGE_KEY)
  compareIds.value = readStoredIds(COMPARE_STORAGE_KEY)
}

function toggleFavorite(): void {
  if (!product.value) return

  const id = product.value.id

  favoriteIds.value = favoriteIds.value.includes(id)
      ? favoriteIds.value.filter((item) => item !== id)
      : [...favoriteIds.value, id]

  writeStoredIds(FAVORITES_STORAGE_KEY, favoriteIds.value)
}

function toggleCompare(): void {
  if (!product.value) return

  const id = product.value.id

  compareIds.value = compareIds.value.includes(id)
      ? compareIds.value.filter((item) => item !== id)
      : [...compareIds.value, id]

  writeStoredIds(COMPARE_STORAGE_KEY, compareIds.value)
}

function handleAddToCart(): void {
  if (!product.value) return
  add(product.value)
}

function handleClose(): void {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/catalog')
}

async function loadProductPage(id: number): Promise<void> {
  if (!id || Number.isNaN(id)) {
    return
  }

  await fetchProductById(id)

  if (selectedProduct.value) {
    await fetchProducts({
      page: 1,
      limit: 5,
      category: selectedProduct.value.category,
      sortBy: 'rating',
      order: 'desc',
    })
  }
}

onMounted(async () => {
  loadStorageState()
  await loadProductPage(props.id)
})

watch(
    () => props.id,
    async (nextId) => {
      await loadProductPage(nextId)
    },
)
</script>

<style scoped>
.product-page {
  position: fixed;
  inset: 0;
  z-index: 80;
}

.product-page__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.44);
  backdrop-filter: blur(3px);
}

.product-page__content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 28px 20px;
  overflow-y: auto;
}

.product-page__container {
  max-width: 1280px;
  margin: 0 auto;
}

.product-page__panel {
  position: relative;
  padding: 24px;
  border-radius: 28px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
  box-shadow: 0 24px 60px rgba(17, 17, 17, 0.16);
}

.product-page__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 12px;
  background: #f3f4f6;
  color: #1d232b;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.product-page__layout {
  display: grid;
  grid-template-columns: minmax(0, 520px) minmax(0, 1fr);
  gap: 24px;
}

.product-page__info {
  min-width: 0;
}

.product-page__status,
.product-page__not-found {
  padding: 40px;
  border-radius: 24px;
  background: #ffffff;
  text-align: center;
}

.product-page__status--error {
  color: #c0392b;
}

.product-page__not-found-title {
  margin: 0 0 18px;
  color: #1d232b;
  font-size: 30px;
  font-weight: 800;
}

.product-page__back-button {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 900px) {
  .product-page__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .product-page__content {
    padding: 16px 14px;
  }

  .product-page__panel {
    padding: 16px;
    border-radius: 20px;
  }
}
</style>