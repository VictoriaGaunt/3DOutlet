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
              v-for="item in testimonials"
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
  arrowUpRight: '/img8.png',
  star: '/ProductCard3.png',
}

const testimonials = [
  {
    id: 1,
    avatar: '/testimonials7.png',
    name: 'Алексей Смирнов',
    role: 'Владелец мастерской',
    text: 'Заказывал 3D-принтер и расходники для небольшой мастерской. Помогли с подбором, быстро оформили заказ и всё пришло без проблем. Очень понравился подход и сопровождение.',
    modalTitle: 'Отзыв Алексея Смирнова',
    modalDescription:
        'Клиент отмечает помощь в подборе оборудования, быструю доставку и качественное сопровождение на всех этапах покупки.',
  },
  {
    id: 2,
    avatar: '/testimonials8.png',
    name: 'Екатерина Волкова',
    role: 'Дизайнер изделий',
    text: 'Покупала материалы и комплектующие для печати прототипов. Менеджер подробно объяснил разницу между вариантами пластика и помог выбрать подходящий. Очень довольна сервисом.',
    modalTitle: 'Отзыв Екатерины Волковой',
    modalDescription:
        'Клиентке помогли выбрать подходящие материалы и комплектующие под задачи прототипирования.',
  },
  {
    id: 3,
    avatar: '/testimonials10.png',
    name: 'Дмитрий Орлов',
    role: 'Технический специалист',
    text: 'Нужно было быстро подобрать оборудование под рабочие задачи компании. Получили консультацию, счёт и документы без лишней суеты. Отдельно отмечу удобную работу с юрлицами.',
    modalTitle: 'Отзыв Дмитрия Орлова',
    modalDescription:
        'Клиент оценил удобство работы с юридическими лицами, скорость оформления и качество консультации.',
  },
  {
    id: 4,
    avatar: '/testimonials9.png',
    name: 'Марина Лебедева',
    role: 'Предприниматель',
    text: 'Очень понравилось, что здесь не просто продают технику, а реально помогают разобраться, что именно нужно. После покупки ещё и подсказали по настройке. Это редкость.',
    modalTitle: 'Отзыв Марины Лебедевой',
    modalDescription:
        'Клиентка положительно оценила помощь в подборе оборудования и поддержку после покупки.',
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