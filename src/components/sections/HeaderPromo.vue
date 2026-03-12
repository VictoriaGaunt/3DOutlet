<template>
  <section class="promo">
    <div
        class="promo__slider"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
    >
      <div
          class="promo__track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <article
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="promo__slide"
        >
          <div class="promo__content">
            <div class="promo__text">
              <h2 class="promo__title" v-html="slide.title"></h2>
              <p class="promo__subtitle" v-html="slide.subtitle"></p>

              <button
                  v-if="slide.buttonText"
                  class="promo__button"
                  type="button"
                  @click="handleSlideButton(slide)"
              >
                {{ slide.buttonText }}
              </button>
            </div>

            <div class="promo__image-wrap">
              <img
                  :src="slide.image"
                  :alt="slide.imageAlt"
                  class="promo__image"
              />
            </div>
          </div>

          <div class="promo__footer">
            <div class="promo__note">
              <span class="promo__note-star">*</span>
              <span>{{ slide.note }}</span>
            </div>

            <div class="promo__dots">
              <button
                  v-for="(_, dotIndex) in slides"
                  :key="dotIndex"
                  class="promo__dot"
                  :class="{ 'promo__dot--active': currentSlide === dotIndex }"
                  type="button"
                  :aria-label="`Перейти к слайду ${dotIndex + 1}`"
                  @click="goToSlide(dotIndex)"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const currentSlide = ref(0)
let autoplayTimer = null

const base = import.meta.env.BASE_URL
const asset = (name) => `${base}${name}`

const slides = [
  {
    id: 1,
    title: '1 КГ ПЛАСТИКА<br>В ПОДАРОК! <span class="promo-accent">*</span>',
    subtitle: 'БЕСПЛАТНАЯ ДОСТАВКА ПРИ ПОКУПКЕ<br>ОТ 25 000 РУБЛЕЙ',
    buttonText: 'КУПИТЬ СЕЙЧАС',
    note: 'При покупке принтера Bambu Lab',
    image: asset('carusel1.png'),
    imageAlt: 'Промо изображение 1',
  },
  {
    id: 2,
    title: 'СОВРЕМЕННЫЕ<br>3D-РЕШЕНИЯ',
    subtitle: 'НАДЁЖНОЕ ОБОРУДОВАНИЕ И МАТЕРИАЛЫ<br>ДЛЯ БИЗНЕСА И ТВОРЧЕСТВА',
    buttonText: 'ПОДРОБНЕЕ',
    note: 'Специальные условия на популярные позиции',
    image: asset('carusel2.png'),
    imageAlt: 'Промо изображение 2',
  },
  {
    id: 3,
    title: 'ПРОФЕССИОНАЛЬНОЕ<br>ОБОРУДОВАНИЕ',
    subtitle: 'ПОДБОР ТЕХНИКИ И КОМПЛЕКТУЮЩИХ<br>ПОД ВАШИ ЗАДАЧИ',
    buttonText: 'В КАТАЛОГ',
    note: 'Актуальные предложения уточняйте у менеджера',
    image: asset('carusel3.png'),
    imageAlt: 'Промо изображение 3',
  },
  {
    id: 4,
    title: 'ПРОГРАММНОЕ<br>ОБЕСПЕЧЕНИЕ',
    subtitle: 'ЛИЦЕНЗИИ, ПЛАГИНЫ И СЕРВИСЫ<br>ДЛЯ 3D-ПРОЕКТОВ',
    buttonText: 'СМОТРЕТЬ',
    note: 'Поддержка и консультации по подбору решений',
    image: asset('carusel4.png'),
    imageAlt: 'Промо изображение 4',
  },
  {
    id: 5,
    title: 'СКИДКИ НА<br>КОМПЛЕКТУЮЩИЕ',
    subtitle: 'ПОЛЕЗНЫЕ АКСЕССУАРЫ И ЗАПЧАСТИ<br>ДЛЯ СТАБИЛЬНОЙ РАБОТЫ',
    buttonText: 'ВЫБРАТЬ',
    note: 'Количество акционных товаров ограничено',
    image: asset('carusel5.png'),
    imageAlt: 'Промо изображение 5',
  },
  {
    id: 6,
    title: 'ВСЁ ДЛЯ<br>3D-ПЕЧАТИ',
    subtitle: 'ОТ БАЗОВЫХ РЕШЕНИЙ ДО ПРОФ-СЕГМЕНТА<br>В ОДНОМ МЕСТЕ',
    buttonText: 'ОТКРЫТЬ',
    note: 'Доступны индивидуальные предложения для юр. лиц',
    image: asset('carusel6.png'),
    imageAlt: 'Промо изображение 6',
  },
]

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

function goToSlide(index) {
  currentSlide.value = index
  restartAutoplay()
}

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, 4500)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function restartAutoplay() {
  startAutoplay()
}

function handleSlideButton(slide) {
  console.log('Клик по слайду:', slide.id, slide.title)
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<style scoped>
.promo {
  width: 100%;
  padding: 14px 20px 0;
  background: #f3f3f3;
}

.promo__slider {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid #d9d9d9;
  background: linear-gradient(180deg, #f4f4f4 0%, #efefef 100%);
}

.promo__track {
  display: flex;
  transition: transform 0.65s ease;
  will-change: transform;
}

.promo__slide {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 476px;
}

.promo__content {
  display: grid;
  grid-template-columns: minmax(0, 520px) minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  padding: 24px 24px 18px 28px;
  flex: 1;
  min-width: 0;
}

.promo__text {
  position: relative;
  z-index: 2;
  min-width: 0;
  max-width: 520px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.promo__title {
  margin: 0;
  max-width: 100%;
  color: #1d232b;
  font-size: clamp(22px, 2.8vw, 60px);
  line-height: 0.94;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
}

:deep(.promo-accent) {
  color: #ff5b00;
}

.promo__subtitle {
  margin: 20px 0 0;
  max-width: 100%;
  color: #33383f;
  font-size: clamp(16px, 1.7vw, 32px);
  line-height: 1.08;
  font-weight: 300;
  text-transform: uppercase;
  white-space: normal;
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
}

.promo__button {
  align-self: flex-start;
  width: fit-content;
  min-width: 154px;
  max-width: 100%;
  height: 48px;
  margin-top: 28px;
  padding: 0 22px;
  border: 0;
  border-radius: 12px;
  background: #ff5b00;
  color: #ffffff;
  font-size: 15px;
  line-height: 1;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
      background-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.2s ease;
}

.promo__button:hover {
  background: #e65100;
  box-shadow: 0 10px 20px rgba(255, 91, 0, 0.2);
}

.promo__button:active {
  transform: translateY(1px) scale(0.98);
  background: #d84a00;
}

.promo__image-wrap {
  position: relative;
  min-width: 0;
  height: 100%;
  min-height: 340px;
  overflow: hidden;
  border-radius: 24px;
}

.promo__image {
  width: 100%;
  height: 100%;
  min-height: 340px;
  display: block;
  object-fit: cover;
  object-position: center;
}

.promo__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 84px;
  padding: 0 38px;
  border-top: 1px solid #d9d9d9;
  background: rgba(255, 255, 255, 0.18);
}

.promo__note {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #2d3137;
  font-size: 18px;
  line-height: 1.3;
  font-weight: 400;
}

.promo__note-star {
  color: #ff5b00;
  font-size: 34px;
  line-height: 1;
  font-weight: 700;
}

.promo__dots {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.promo__dot {
  width: 10px;
  height: 10px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition:
      width 0.25s ease,
      background-color 0.25s ease,
      transform 0.2s ease;
}

.promo__dot:hover {
  transform: scale(1.08);
  background: rgba(255, 91, 0, 0.5);
}

.promo__dot--active {
  width: 18px;
  background: #ff5b00;
}

@media (max-width: 1200px) {
  .promo__content {
    grid-template-columns: minmax(0, 440px) minmax(0, 1fr);
    gap: 22px;
    padding: 20px 20px 16px 22px;
  }

  .promo__text {
    max-width: 440px;
  }

  .promo__title {
    font-size: clamp(26px, 3.4vw, 56px);
  }

  .promo__subtitle {
    font-size: clamp(15px, 1.5vw, 24px);
    margin-top: 16px;
  }

  .promo__button {
    margin-top: 24px;
  }

  .promo__footer {
    padding: 0 28px;
  }
}

@media (max-width: 960px) {
  .promo {
    padding: 12px 14px 0;
  }

  .promo__slide {
    min-height: auto;
  }

  .promo__content {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 18px 16px 12px;
  }

  .promo__text {
    max-width: 100%;
  }

  .promo__title {
    font-size: clamp(24px, 6vw, 40px);
    line-height: 0.96;
  }

  .promo__subtitle {
    margin-top: 14px;
    font-size: clamp(14px, 3.2vw, 20px);
    line-height: 1.1;
  }

  .promo__button {
    min-width: 148px;
    height: 46px;
    margin-top: 22px;
    font-size: 14px;
  }

  .promo__image-wrap,
  .promo__image {
    min-height: 240px;
  }

  .promo__footer {
    min-height: 72px;
    padding: 12px 20px 14px;
    flex-direction: column;
    align-items: flex-start;
  }

  .promo__dots {
    align-self: flex-end;
  }
}

@media (max-width: 640px) {
  .promo__slider {
    border-radius: 22px;
  }

  .promo__content {
    padding: 16px 14px 10px;
  }

  .promo__title {
    font-size: clamp(22px, 7vw, 30px);
    line-height: 0.98;
    letter-spacing: -0.03em;
  }

  .promo__subtitle {
    font-size: 15px;
    line-height: 1.12;
  }

  .promo__button {
    min-width: 140px;
    height: 44px;
    margin-top: 20px;
    padding: 0 18px;
    font-size: 13px;
    border-radius: 10px;
  }

  .promo__image-wrap,
  .promo__image {
    min-height: 180px;
    border-radius: 18px;
  }

  .promo__footer {
    min-height: 66px;
    padding: 10px 16px 14px;
    gap: 12px;
  }

  .promo__note {
    gap: 10px;
    font-size: 14px;
  }

  .promo__note-star {
    font-size: 24px;
  }

  .promo__dots {
    gap: 8px;
  }

  .promo__dot {
    width: 8px;
    height: 8px;
  }

  .promo__dot--active {
    width: 16px;
  }
}
</style>