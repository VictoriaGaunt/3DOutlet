<template>
  <section class="categories" id="catalog">
    <div class="categories__inner">
      <div class="categories__head">
        <h2 class="categories__title">
          <span class="categories__title-strong">КАТАЛОГ</span>
          <span class="categories__title-light">ТОВАРОВ</span>
        </h2>
      </div>

      <div class="categories__grid">
        <article
            v-for="item in categoryList"
            :key="item.id"
            class="categories__card"
            @click="openCategoryModal(item)"
        >
          <button
              class="categories__arrow"
              type="button"
              aria-label="Открыть категорию"
              @click.stop="openCategoryModal(item)"
          >
            <img :src="icons.arrowUpRight" alt="arrow" class="categories__arrow-icon" />
          </button>

          <button
              class="categories__image-wrap"
              type="button"
              :aria-label="item.title"
              @click.stop="openCategoryModal(item)"
          >
            <img :src="item.image" :alt="item.title" class="categories__image" />
          </button>

          <div class="categories__content">
            <h3 class="categories__card-title">{{ item.title }}</h3>
            <p class="categories__card-text">{{ item.description }}</p>
          </div>
        </article>
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
import { onMounted, ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import { categoriesApi } from '@/api/categories.api'
import { asset } from '@/utils/asset'
import type { Category } from '@/types'

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

const categoryList = ref<Category[]>([])

const icons = {
  arrowUpRight: asset('categories1.png'),
}

function openCategoryModal(item: Category): void {
  modal.value = {
    isOpen: true,
    title: item.modalTitle,
    description: item.modalDescription,
  }
}

function closeModal(): void {
  modal.value.isOpen = false
}

async function fetchCategories(): Promise<void> {
  try {
    categoryList.value = await categoriesApi.getCategories()
  } catch {
    categoryList.value = []
  }
}

onMounted(async () => {
  await fetchCategories()
})
</script>

<style scoped>
.categories {
  width: 100%;
  padding: 24px 20px 0;
  background: #f3f3f3;
}

.categories__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.categories__head {
  margin-bottom: 18px;
}

.categories__title {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  color: #1d232b;
  text-transform: uppercase;
}

.categories__title-strong {
  font-size: clamp(28px, 3vw, 56px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.categories__title-light {
  font-size: clamp(24px, 2.5vw, 46px);
  line-height: 1;
  font-weight: 300;
  letter-spacing: -0.03em;
}

.categories__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.categories__card {
  position: relative;
  min-height: 220px;
  padding: 20px 20px 18px;
  border-radius: 24px;
  background: #f8f8f8;
  border: 1px solid rgba(17, 17, 17, 0.04);
  overflow: hidden;
  cursor: pointer;
  transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.categories__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(17, 17, 17, 0.06);
  background: #fbfbfb;
}

.categories__card:active {
  transform: translateY(0);
}

.categories__arrow {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 91, 0, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
      background-color 0.2s ease,
      transform 0.15s ease;
}

.categories__arrow:hover {
  background: rgba(255, 91, 0, 0.14);
}

.categories__arrow:active {
  transform: scale(0.96);
}

.categories__arrow-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: block;
}

.categories__image-wrap {
  width: 100%;
  min-height: 110px;
  border: 0;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.categories__image {
  display: block;
  max-width: 100%;
  width: auto;
  height: 96px;
  object-fit: contain;
  transition: transform 0.25s ease;
}

.categories__card:hover .categories__image {
  transform: scale(1.03);
}

.categories__content {
  margin-top: 14px;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.categories__card-title {
  margin: 0;
  color: #1d232b;
  font-size: 18px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-align: center;
}

.categories__card-text {
  margin: 10px 0 0;
  color: #4f555d;
  font-size: 15px;
  line-height: 1.2;
  font-weight: 400;
  text-align: center;
  max-width: 260px;
}

@media (max-width: 1100px) {
  .categories__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .categories__card {
    min-height: 210px;
  }
}

@media (max-width: 640px) {
  .categories {
    padding: 20px 14px 0;
  }

  .categories__head {
    margin-bottom: 14px;
  }

  .categories__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .categories__card {
    min-height: 190px;
    padding: 18px 16px 16px;
    border-radius: 20px;
  }

  .categories__arrow {
    top: 14px;
    right: 14px;
    width: 32px;
    height: 32px;
  }

  .categories__image-wrap {
    min-height: 92px;
    justify-content: center;
  }

  .categories__image {
    height: 82px;
  }

  .categories__content {
    margin-top: 12px;
    align-items: center;
  }

  .categories__card-title {
    font-size: 17px;
    text-align: center;
  }

  .categories__card-text {
    font-size: 14px;
    line-height: 1.25;
    text-align: center;
    max-width: 100%;
  }
}
</style>