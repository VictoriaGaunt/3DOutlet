<template>
  <section class="benefits" id="business">
    <div class="benefits__inner">
      <div
          class="benefits__viewport"
          @mouseenter="stopAutoplay"
          @mouseleave="startAutoplay"
      >
        <div
            class="benefits__track"
            :style="{ transform: `translateX(-${currentSlide * slideStep}%)` }"
        >
          <article
              v-for="card in cards"
              :key="card.id"
              class="benefits__slide"
          >
            <div
                class="benefits__card"
                @click="openModal(card.modalTitle, card.modalDescription)"
            >
              <img
                  :src="card.image"
                  :alt="card.imageAlt"
                  class="benefits__bg-image"
              />

              <div class="benefits__overlay"></div>

              <div class="benefits__content">
                <div class="benefits__top">
                  <h3 class="benefits__title" v-html="card.title"></h3>

                  <div
                      v-if="card.list && card.list.length"
                      class="benefits__list"
                  >
                    <div
                        v-for="(item, index) in card.list"
                        :key="index"
                        class="benefits__list-item"
                    >
                      <span class="benefits__check">✓</span>
                      <span>{{ item }}</span>
                    </div>
                  </div>

                  <p
                      v-else
                      class="benefits__description"
                      v-html="card.description"
                  ></p>
                </div>

                <button
                    class="benefits__button"
                    type="button"
                    @click.stop="openModal(card.modalTitle, card.modalDescription)"
                >
                  {{ card.buttonText }}
                  <span class="benefits__button-arrow">↗</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="benefits__controls">
        <button
            class="benefits__nav"
            type="button"
            aria-label="Предыдущие карточки"
            @click="prevSlide"
        >
          <img :src="navIcons.prev" alt="prev" class="benefits__nav-icon" />
        </button>

        <button
            class="benefits__nav"
            type="button"
            aria-label="Следующие карточки"
            @click="nextSlide"
        >
          <img :src="navIcons.next" alt="next" class="benefits__nav-icon" />
        </button>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import { asset } from '@/utils/asset'

interface BenefitCard {
  id: number
  title: string
  description?: string
  list?: string[]
  buttonText: string
  image: string
  imageAlt: string
  modalTitle: string
  modalDescription: string
}

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

const currentSlide = ref(0)
const isMobile = ref(false)
let autoplayTimer: number | null = null

const navIcons = {
  prev: asset('benefits6.png'),
  next: asset('benefits7.png'),
}

const cards: BenefitCard[] = [
  {
    id: 1,
    title: 'РАБОТАЕМ С ЮР.<br>ЛИЦАМИ',
    list: [
      'Отгрузка товара в день оплаты',
      'Возврат НДС 20%',
      'Набор закрывающих документов',
      'Лизинг',
      'Онлайн формирование счета',
    ],
    buttonText: 'УЗНАТЬ БОЛЬШЕ',
    image: asset('benefits1.png'),
    imageAlt: 'Скидка 20 процентов',
    modalTitle: 'Работа с юридическими лицами',
    modalDescription:
        'Здесь позже будет подробный блок по работе с юридическими лицами, условиям оплаты, документам и лизингу.',
  },
  {
    id: 2,
    title: 'НЕ ЗНАЕТЕ, КАКОЕ ОБОРУДОВАНИЕ<br>ВАМ ПОДОЙДЕТ?',
    description:
        'Ответьте на несколько вопросов и получите подборку подходящих моделей с советами эксперта',
    buttonText: 'ПОДОБРАТЬ 3D ПРИНТЕР',
    image: asset('benefits2.png'),
    imageAlt: '3D принтер',
    modalTitle: 'Подбор оборудования',
    modalDescription:
        'Здесь позже будет квиз или форма подбора оборудования под ваши задачи.',
  },
  {
    id: 3,
    title: 'СЕРВИС И<br>ПОДДЕРЖКА',
    description:
        'Помогаем с подбором, запуском, настройкой и сопровождением оборудования после покупки',
    buttonText: 'ПОДРОБНЕЕ',
    image: asset('benefits3.png'),
    imageAlt: 'Сервис и поддержка',
    modalTitle: 'Сервис и поддержка',
    modalDescription:
        'Здесь позже будет информация о сервисе, техподдержке и сопровождении клиентов.',
  },
  {
    id: 4,
    title: 'БЫСТРАЯ ДОСТАВКА<br>ПО РФ',
    description:
        'Оперативно отправляем оборудование, расходники и комплектующие по всей России',
    buttonText: 'УСЛОВИЯ ДОСТАВКИ',
    image: asset('benefits4.png'),
    imageAlt: 'Доставка по России',
    modalTitle: 'Доставка',
    modalDescription:
        'Здесь позже будет блок с условиями доставки, сроками и регионами.',
  },
  {
    id: 5,
    title: 'СКИДКИ НА<br>КОМПЛЕКТУЮЩИЕ',
    description:
        'Полезные аксессуары и запчасти для стабильной работы оборудования',
    buttonText: 'ВЫБРАТЬ',
    image: asset('benefits5.png'),
    imageAlt: 'Скидки на комплектующие',
    modalTitle: 'Скидки на комплектующие',
    modalDescription:
        'Здесь позже будут размещены специальные предложения на аксессуары и комплектующие.',
  },
]

const visibleSlides = computed(() => (isMobile.value ? 1 : 2))
const maxSlide = computed(() => Math.max(cards.length - visibleSlides.value, 0))
const slideStep = computed(() => (isMobile.value ? 100 : 50))

function openModal(title: string, description: string): void {
  modal.value = {
    isOpen: true,
    title,
    description,
  }
}

function closeModal(): void {
  modal.value.isOpen = false
}

function nextSlide(): void {
  currentSlide.value =
      currentSlide.value >= maxSlide.value ? 0 : currentSlide.value + 1
}

function prevSlide(): void {
  currentSlide.value =
      currentSlide.value <= 0 ? maxSlide.value : currentSlide.value - 1
}

function startAutoplay(): void {
  stopAutoplay()
  autoplayTimer = window.setInterval(() => {
    nextSlide()
  }, 4500)
}

function stopAutoplay(): void {
  if (autoplayTimer !== null) {
    window.clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function updateViewport(): void {
  isMobile.value = window.innerWidth <= 960
  if (currentSlide.value > maxSlide.value) {
    currentSlide.value = maxSlide.value
  }
}

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
  startAutoplay()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  stopAutoplay()
})
</script>

<style scoped>
.benefits {
  width: 100%;
  padding: 24px 20px 0;
  background: #f3f3f3;
  scroll-margin-top: 90px;
}

.benefits__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.benefits__viewport {
  overflow: hidden;
}

.benefits__track {
  display: flex;
  transition: transform 0.55s ease;
  will-change: transform;
}

.benefits__slide {
  flex: 0 0 50%;
  min-width: 50%;
  padding-right: 18px;
  box-sizing: border-box;
}

.benefits__slide:last-child {
  padding-right: 0;
}

.benefits__card {
  position: relative;
  height: 280px;
  min-height: 280px;
  overflow: hidden;
  border-radius: 28px;
  background: #111832;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.25s ease;
}

.benefits__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(17, 17, 17, 0.12);
}

.benefits__card:active {
  transform: translateY(0);
}

.benefits__bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: right bottom;
  z-index: 1;
}

.benefits__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
      linear-gradient(
          135deg,
          rgba(12, 18, 54, 0.98) 0%,
          rgba(17, 24, 72, 0.95) 28%,
          rgba(17, 33, 88, 0.82) 52%,
          rgba(21, 93, 174, 0.38) 78%,
          rgba(43, 178, 255, 0.18) 100%
      );
}

.benefits__content {
  position: relative;
  z-index: 3;
  height: 100%;
  width: 100%;
  padding: 24px 24px 24px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.benefits__top {
  width: min(100%, 460px);
}

.benefits__title {
  margin: 0;
  width: 100%;
  max-width: 100%;
  color: #ffffff;
  font-size: clamp(22px, 2.3vw, 40px);
  line-height: 0.94;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  white-space: normal;
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: none;
}

.benefits__list {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 14px;
  width: 100%;
  max-width: 440px;
}

.benefits__list-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #ffffff;
  font-size: clamp(12px, 0.95vw, 15px);
  line-height: 1.22;
  font-weight: 400;
  min-width: 0;
}

.benefits__list-item span:last-child {
  min-width: 0;
  word-break: normal;
  overflow-wrap: break-word;
}

.benefits__check {
  color: #12d2ff;
  font-size: 16px;
  line-height: 1;
  margin-top: 2px;
  flex-shrink: 0;
}

.benefits__description {
  margin: 12px 0 0;
  width: 100%;
  max-width: 420px;
  color: #ffffff;
  font-size: clamp(13px, 1.05vw, 17px);
  line-height: 1.28;
  font-weight: 400;
  white-space: normal;
  word-break: normal;
  overflow-wrap: break-word;
  hyphens: none;
}

.benefits__button {
  align-self: flex-start;
  width: fit-content;
  min-width: 190px;
  max-width: 100%;
  height: 42px;
  padding: 0 20px;
  border: 0;
  border-radius: 14px;
  background: #ff5b00;
  color: #ffffff;
  font-size: clamp(12px, 0.95vw, 14px);
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition:
      background-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.2s ease;
}

.benefits__button:hover {
  background: #e65100;
  box-shadow: 0 10px 20px rgba(255, 91, 0, 0.22);
}

.benefits__button:active {
  background: #d84a00;
  transform: scale(0.98);
}

.benefits__button-arrow {
  margin-left: 6px;
}

.benefits__controls {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.benefits__nav {
  width: 58px;
  height: 58px;
  border: 0;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.2s ease;
}

.benefits__nav:hover {
  opacity: 0.92;
}

.benefits__nav:active {
  transform: scale(0.96);
}

.benefits__nav-icon {
  width: 58px;
  height: 58px;
  display: block;
  object-fit: contain;
}

@media (max-width: 1200px) {
  .benefits__card {
    height: 260px;
    min-height: 260px;
  }

  .benefits__content {
    padding: 24px 22px 22px 24px;
  }

  .benefits__top {
    width: min(100%, 390px);
  }

  .benefits__title {
    font-size: clamp(20px, 2vw, 31px);
  }

  .benefits__list {
    grid-template-columns: 1fr;
    max-width: 320px;
  }

  .benefits__description {
    max-width: 360px;
  }

  .benefits__button {
    min-width: 190px;
  }
}

@media (max-width: 960px) {
  .benefits {
    padding: 20px 14px 0;
  }

  .benefits__slide {
    flex: 0 0 100%;
    min-width: 100%;
    padding-right: 0;
  }

  .benefits__card {
    height: 440px;
    min-height: 440px;
    border-radius: 24px;
  }

  .benefits__bg-image {
    object-fit: contain;
    object-position: right bottom;
    transform: scale(0.92);
    transform-origin: right bottom;
  }

  .benefits__overlay {
    background:
        linear-gradient(
            180deg,
            rgba(12, 18, 54, 0.98) 0%,
            rgba(17, 24, 72, 0.94) 38%,
            rgba(16, 33, 86, 0.76) 62%,
            rgba(25, 112, 201, 0.34) 100%
        );
  }

  .benefits__content {
    padding: 20px 18px 18px;
  }

  .benefits__top {
    width: 100%;
    max-width: 100%;
  }

  .benefits__title {
    font-size: clamp(20px, 5.4vw, 30px);
    line-height: 0.95;
  }

  .benefits__list {
    grid-template-columns: 1fr;
    max-width: 100%;
    gap: 8px;
  }

  .benefits__list-item {
    font-size: 14px;
    line-height: 1.2;
  }

  .benefits__description {
    max-width: 100%;
    font-size: 14px;
    line-height: 1.25;
  }

  .benefits__button {
    min-width: 176px;
    height: 42px;
    font-size: 13px;
    padding: 0 18px;
  }

  .benefits__controls {
    margin-top: 14px;
  }
}

@media (max-width: 640px) {
  .benefits__card {
    height: 390px;
    min-height: 390px;
    border-radius: 22px;
  }

  .benefits__bg-image {
    object-fit: contain;
    object-position: center bottom;
    transform: scale(0.88);
    transform-origin: center bottom;
  }

  .benefits__content {
    padding: 18px 16px 16px;
  }

  .benefits__title {
    font-size: clamp(18px, 7vw, 24px);
    line-height: 0.98;
  }

  .benefits__list-item,
  .benefits__description {
    font-size: 13px;
    line-height: 1.22;
  }

  .benefits__button {
    min-width: 168px;
    height: 40px;
    padding: 0 16px;
    font-size: 12px;
    border-radius: 12px;
  }

  .benefits__nav,
  .benefits__nav-icon {
    width: 52px;
    height: 52px;
  }
}
</style>