<template>
  <main class="catalog-page">
    <section class="catalog-page__hero">
      <div class="catalog-page__container">
        <h1 class="catalog-page__title">Каталог товаров</h1>
        <p class="catalog-page__subtitle">
          Подбор оборудования, материалов и решений для 3D-печати
        </p>
      </div>
    </section>

    <section class="catalog-page__content">
      <div class="catalog-page__container">
        <div class="catalog-page__toolbar">
          <input
              v-model.trim="search"
              type="text"
              class="catalog-page__search"
              placeholder="Поиск по названию товара"
              @input="handleSearchInput"
          />

          <select
              v-model="selectedCategory"
              class="catalog-page__select"
              @change="applyFilters"
          >
            <option value="all">Все категории</option>
            <option
                v-for="category in categoryOptions"
                :key="category"
                :value="category"
            >
              {{ category }}
            </option>
          </select>

          <select
              v-model="selectedSort"
              class="catalog-page__select"
              @change="handleSortChange"
          >
            <option value="title-asc">По названию</option>
            <option value="price-asc">По цене ↑</option>
            <option value="price-desc">По цене ↓</option>
            <option value="rating-desc">По рейтингу</option>
          </select>
        </div>

        <div v-if="isLoading" class="catalog-page__status">
          Загрузка товаров...
        </div>

        <div v-else-if="error" class="catalog-page__status catalog-page__status--error">
          {{ error }}
        </div>

        <div v-else-if="products.length > 0" class="catalog-page__grid">
          <article
              v-for="product in products"
              :key="product.id"
              class="catalog-page__card"
          >
            <div class="catalog-page__card-top">
              <span class="catalog-page__category">{{ product.category }}</span>
              <span v-if="product.badge" class="catalog-page__badge">{{ product.badge }}</span>
            </div>

            <img
                :src="product.image"
                :alt="product.title"
                class="catalog-page__image"
            />

            <h2 class="catalog-page__card-title">{{ product.title }}</h2>
            <p class="catalog-page__level">{{ product.level }}</p>

            <div class="catalog-page__meta">
              <span>Тип печати: {{ product.printType }}</span>
              <span>Поле печати: {{ product.printArea }}</span>
            </div>

            <div class="catalog-page__bottom">
              <div class="catalog-page__price">{{ formatPrice(product.price) }} ₽</div>

              <div class="catalog-page__actions">
                <RouterLink
                    :to="`/product/${product.id}`"
                    class="catalog-page__link"
                >
                  Подробнее
                </RouterLink>

                <button
                    type="button"
                    class="catalog-page__button"
                    @click="add(product)"
                >
                  В корзину
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="catalog-page__empty">
          По вашему запросу ничего не найдено.
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart } from '@/composables/useCart'
import { useProducts } from '@/composables/useProducts'
import { products as mockProducts } from '@/data/products'
import type { ProductFilterParams, ProductSortBy, SortOrder } from '@/types/product'

type SortOption = 'title-asc' | 'price-asc' | 'price-desc' | 'rating-desc'

const { add, formatPrice } = useCart()
const { products, isLoading, error, fetchProducts } = useProducts()

const search = ref('')
const selectedCategory = ref('all')
const selectedSort = ref<SortOption>('title-asc')

let searchTimer: number | null = null

const categoryOptions = computed(() => {
  return Array.from(new Set(mockProducts.map((product) => product.category)))
})

function getSortConfig(value: SortOption): {
  sortBy: ProductSortBy
  order: SortOrder
} {
  if (value === 'price-asc') {
    return { sortBy: 'price', order: 'asc' }
  }

  if (value === 'price-desc') {
    return { sortBy: 'price', order: 'desc' }
  }

  if (value === 'rating-desc') {
    return { sortBy: 'rating', order: 'desc' }
  }

  return { sortBy: 'title', order: 'asc' }
}

async function applyFilters(): Promise<void> {
  const sortConfig = getSortConfig(selectedSort.value)

  const params: ProductFilterParams = {
    page: 1,
    limit: 12,
    search: search.value,
    category: selectedCategory.value,
    sortBy: sortConfig.sortBy,
    order: sortConfig.order,
  }

  await fetchProducts(params)
}

function handleSearchInput(): void {
  if (searchTimer !== null) {
    window.clearTimeout(searchTimer)
  }

  searchTimer = window.setTimeout(async () => {
    await applyFilters()
  }, 250)
}

async function handleSortChange(): Promise<void> {
  await applyFilters()
}

onMounted(async () => {
  await applyFilters()
})
</script>

<style scoped>
.catalog-page {
  min-height: 100vh;
  background: #f3f3f3;
}

.catalog-page__hero {
  padding: 32px 20px 12px;
}

.catalog-page__container {
  max-width: 1280px;
  margin: 0 auto;
}

.catalog-page__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1;
  font-weight: 800;
}

.catalog-page__subtitle {
  margin: 12px 0 0;
  color: #5d636b;
  font-size: 16px;
  line-height: 1.5;
}

.catalog-page__content {
  padding: 12px 20px 32px;
}

.catalog-page__toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.catalog-page__search,
.catalog-page__select {
  min-height: 44px;
  border: 1px solid #d8d8dd;
  border-radius: 12px;
  background: #ffffff;
  padding: 0 14px;
  font-size: 15px;
  color: #1d232b;
}

.catalog-page__search {
  flex: 1 1 320px;
}

.catalog-page__select {
  min-width: 220px;
}

.catalog-page__status,
.catalog-page__empty {
  padding: 28px;
  border-radius: 20px;
  background: #ffffff;
  color: #5d636b;
  text-align: center;
}

.catalog-page__status--error {
  color: #c0392b;
}

.catalog-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.catalog-page__card {
  display: flex;
  flex-direction: column;
  padding: 18px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.catalog-page__card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.catalog-page__category {
  color: #7e848c;
  font-size: 13px;
}

.catalog-page__badge {
  min-width: 36px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #e7f4ff;
  color: #1683c7;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.catalog-page__image {
  width: 100%;
  max-width: 220px;
  height: 180px;
  object-fit: contain;
  align-self: center;
  margin-top: 14px;
}

.catalog-page__card-title {
  margin: 12px 0 0;
  color: #1d232b;
  font-size: 20px;
  line-height: 1.1;
  font-weight: 800;
}

.catalog-page__level {
  margin: 8px 0 0;
  color: #737982;
  font-size: 14px;
  line-height: 1.4;
}

.catalog-page__meta {
  margin-top: 14px;
  display: grid;
  gap: 6px;
  color: #49505a;
  font-size: 14px;
  line-height: 1.4;
}

.catalog-page__bottom {
  margin-top: auto;
  padding-top: 18px;
}

.catalog-page__price {
  color: #1d232b;
  font-size: 24px;
  font-weight: 800;
}

.catalog-page__actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.catalog-page__link,
.catalog-page__button {
  min-height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.catalog-page__link {
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
}

.catalog-page__button {
  border: 0;
  background: #ff5b00;
  color: #ffffff;
  cursor: pointer;
}

@media (max-width: 980px) {
  .catalog-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .catalog-page__hero,
  .catalog-page__content {
    padding-left: 14px;
    padding-right: 14px;
  }

  .catalog-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>