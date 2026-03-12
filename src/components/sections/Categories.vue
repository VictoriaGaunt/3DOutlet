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
            v-for="item in categories"
            :key="item.id"
            class="categories__card"
            @click="openModal(item)"
        >
          <button
              class="categories__arrow"
              type="button"
              aria-label="Открыть категорию"
              @click.stop="openModal(item)"
          >
            <img :src="icons.arrowUpRight" alt="arrow" class="categories__arrow-icon" />
          </button>

          <button
              class="categories__image-wrap"
              type="button"
              :aria-label="item.title"
              @click.stop="openModal(item)"
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

    <ModalCard
        :is-open="modal.isOpen"
        :title="modal.title"
        :description="modal.description"
        @close="closeModal"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ModalCard from '../ModalCard.vue'

const modal = ref({
  isOpen: false,
  title: '',
  description: '',
})

const icons = {
  arrowUpRight: '/categories1.png',
}

const categories = [
  {
    id: 1,
    title: '3D ПРИНТЕРЫ',
    description: 'Мощные инструменты для изготовления 3D-моделей',
    image: '/categories2.png',
    modalTitle: '3D Принтеры',
    modalDescription:
        'Здесь позже будет каталог 3D-принтеров, фильтры, карточки товаров и подробная информация по моделям.',
  },
  {
    id: 2,
    title: 'ФИЛАМЕНТЫ',
    description: 'Высококачественные материалы для 3D-печати',
    image: '/categories3.png',
    modalTitle: 'Филаменты',
    modalDescription:
        'Здесь позже будет раздел с филаментами: типы пластиков, цвета, характеристики и наличие.',
  },
  {
    id: 3,
    title: 'АКСЕССУАРЫ',
    description: 'Обновите свой принтер с помощью современных деталей',
    image: '/categories4.png',
    modalTitle: 'Аксессуары',
    modalDescription:
        'Здесь позже будет раздел с аксессуарами, комплектующими и дополнительным оборудованием.',
  },
  {
    id: 4,
    title: 'АКЦИИ',
    description: 'Уникальные акции и скидки',
    image: '/categories5.png',
    modalTitle: 'Акции',
    modalDescription:
        'Здесь позже будут размещены акционные предложения, скидки и специальные условия покупки.',
  },
]

function openModal(item) {
  modal.value = {
    isOpen: true,
    title: item.modalTitle,
    description: item.modalDescription,
  }
}

function closeModal() {
  modal.value.isOpen = false
}
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