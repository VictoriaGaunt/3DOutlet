<template>
  <section class="testimonials" id="reviews">
    <div class="testimonials__inner">
      <div class="testimonials__head">
        <h2 class="testimonials__title">
          <span>ОТЗЫВЫ</span>
          <img :src="icons.arrowUpRight" alt="arrow" class="testimonials__title-icon" />
        </h2>
      </div>

      <div class="testimonials__box">
        <div class="testimonials__grid">
          <article
              v-for="item in viewTestimonials"
              :key="item.id"
              class="testimonials__card"
              @click="openModal(item)"
          >
            <div class="testimonials__top">
              <div class="testimonials__avatar-wrap">
                <img :src="item.avatar" :alt="item.name" class="testimonials__avatar" />
              </div>

              <div class="testimonials__person">
                <h3 class="testimonials__name">{{ item.name }}</h3>
                <p class="testimonials__role">{{ item.role }}</p>
              </div>
            </div>

            <div class="testimonials__rating">
              <img
                  v-for="star in 5"
                  :key="star"
                  :src="icons.star"
                  alt="star"
                  class="testimonials__star"
              />
            </div>

            <p class="testimonials__text">
              {{ item.text }}
            </p>
          </article>
        </div>
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
import { computed, onMounted, ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import { testimonialsApi, type Testimonial } from '@/api/testimonials.api'
import { asset } from '@/utils/asset'

interface ModalState {
  isOpen: boolean
  title: string
  description: string
}

interface TestimonialCard extends Testimonial {
  avatar: string
  modalTitle: string
  modalDescription: string
}

const modal = ref<ModalState>({
  isOpen: false,
  title: '',
  description: '',
})

const testimonials = ref<Testimonial[]>([])

const icons = {
  arrowUpRight: asset('img8.png'),
  star: asset('ProductCard3.png'),
}

const avatarPool = [
  asset('testimonials7.png'),
  asset('testimonials8.png'),
  asset('testimonials10.png'),
  asset('testimonials9.png'),
]

const viewTestimonials = computed<TestimonialCard[]>(() => {
  return testimonials.value.map((item, index) => ({
    ...item,
    role: item.role ?? item.company ?? 'Клиент 3DOutlet',
    avatar: avatarPool[index % avatarPool.length],
    modalTitle: `Отзыв ${item.name}`,
    modalDescription:
        item.text.length > 160
            ? item.text
            : `${item.text} Клиент положительно оценивает качество сервиса и взаимодействия.`,
  }))
})

function openModal(item: TestimonialCard): void {
  modal.value = {
    isOpen: true,
    title: item.modalTitle,
    description: item.modalDescription,
  }
}

function closeModal(): void {
  modal.value.isOpen = false
}

async function fetchTestimonials(): Promise<void> {
  try {
    testimonials.value = await testimonialsApi.getTestimonials()
  } catch {
    testimonials.value = []
  }
}

onMounted(async () => {
  await fetchTestimonials()
})
</script>

<style scoped>
.testimonials {
  width: 100%;
  padding: 28px 20px 0;
  background: #f3f3f3;
  scroll-margin-top: 90px;
}

.testimonials__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.testimonials__head {
  margin-bottom: 14px;
}

.testimonials__title {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1d232b;
  font-size: clamp(24px, 2.6vw, 48px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.testimonials__title-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.testimonials__box {
  min-height: 236px;
  padding: 18px;
  border-radius: 20px;
  background: #f8f8f8;
  border: 1px solid rgba(17, 17, 17, 0.04);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.testimonials__card {
  min-height: 200px;
  padding: 16px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.05);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease;
}

.testimonials__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(17, 17, 17, 0.06);
  background: #fcfcfc;
}

.testimonials__card:active {
  transform: translateY(0);
}

.testimonials__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonials__avatar-wrap {
  width: 52px;
  height: 52px;
  min-width: 52px;
  border-radius: 999px;
  overflow: hidden;
  background: #ebeff4;
}

.testimonials__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.testimonials__person {
  min-width: 0;
}

.testimonials__name {
  margin: 0;
  color: #1d232b;
  font-size: 15px;
  line-height: 1.1;
  font-weight: 700;
}

.testimonials__role {
  margin: 4px 0 0;
  color: #8b9199;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 400;
}

.testimonials__rating {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.testimonials__star {
  width: 14px;
  height: 14px;
  object-fit: contain;
  display: block;
}

.testimonials__text {
  margin: 12px 0 0;
  color: #4f555d;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 400;
}

@media (max-width: 1100px) {
  .testimonials__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .testimonials {
    padding: 22px 14px 0;
  }

  .testimonials__head {
    margin-bottom: 12px;
  }

  .testimonials__title {
    font-size: clamp(20px, 7vw, 30px);
    line-height: 0.98;
  }

  .testimonials__box {
    padding: 14px;
    border-radius: 18px;
  }

  .testimonials__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .testimonials__card {
    min-height: 180px;
    padding: 14px;
    border-radius: 16px;
  }

  .testimonials__avatar-wrap {
    width: 46px;
    height: 46px;
    min-width: 46px;
  }

  .testimonials__name {
    font-size: 14px;
  }

  .testimonials__role {
    font-size: 11px;
  }

  .testimonials__text {
    font-size: 13px;
    line-height: 1.38;
  }
}
</style>