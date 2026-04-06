<template>
  <section class="why-us" id="why-us">
    <div class="why-us__inner">
      <div class="why-us__head">
        <h2 class="why-us__title">
          ПОЧЕМУ НАС ВЫБИРАЮТ И РЕКОМЕНДУЮТ УЖЕ БОЛЕЕ
          <br />
          5000 ПОКУПАТЕЛЕЙ?
        </h2>
      </div>

      <div class="why-us__grid">
        <article
            v-for="item in items"
            :key="item.id"
            class="why-us__card"
            @click="openModal(item)"
        >
          <div class="why-us__icon-wrap">
            <img :src="item.icon" :alt="item.title" class="why-us__icon" />
          </div>

          <div class="why-us__content">
            <h3 class="why-us__card-title">{{ item.title }}</h3>
            <p class="why-us__card-text">{{ item.text }}</p>
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
import { ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import { asset } from '@/utils/asset'

interface WhyUsItem {
  id: number
  icon: string
  title: string
  text: string
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

const items: WhyUsItem[] = [
  {
    id: 1,
    icon: asset('WhyUs1.png'),
    title: 'ГИБКИЕ УСЛОВИЯ ПОКУПКИ',
    text: 'Для бизнеса — выгодный лизинг, возврат НДС 20%, удобные закрывающие документы. Для частных клиентов — рассрочка через Яндекс Сплит.',
    modalTitle: 'Гибкие условия покупки',
    modalDescription:
        'Здесь позже будет подробная информация о рассрочке, лизинге, возврате НДС и условиях оплаты.',
  },
  {
    id: 2,
    icon: asset('WhyUs1.png'),
    title: 'ЭКСПЕРТНАЯ КОНСУЛЬТАЦИЯ',
    text: 'Подскажем, какое оборудование и материалы лучше подойдут под ваши задачи, бюджет и формат работы.',
    modalTitle: 'Экспертная консультация',
    modalDescription:
        'Здесь позже будет подробная информация о консультации, подборе оборудования и сопровождении клиента.',
  },
  {
    id: 3,
    icon: asset('WhyUs1.png'),
    title: 'БЫСТРАЯ ДОСТАВКА',
    text: 'Оперативно отправляем оборудование, расходники и комплектующие по всей России, чтобы вы не теряли время.',
    modalTitle: 'Быстрая доставка',
    modalDescription:
        'Здесь позже будет информация о сроках доставки, регионах и логистике.',
  },
  {
    id: 4,
    icon: asset('WhyUs1.png'),
    title: 'СЕРВИС И ПОДДЕРЖКА',
    text: 'Помогаем с запуском, настройкой и дальнейшим сопровождением оборудования после покупки.',
    modalTitle: 'Сервис и поддержка',
    modalDescription:
        'Здесь позже будет информация о сервисе, поддержке и сопровождении после покупки.',
  },
]

function openModal(item: WhyUsItem): void {
  modal.value = {
    isOpen: true,
    title: item.modalTitle,
    description: item.modalDescription,
  }
}

function closeModal(): void {
  modal.value.isOpen = false
}
</script>

<style scoped>
.why-us {
  width: 100%;
  padding: 28px 20px 0;
  background: #f3f3f3;
}

.why-us__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.why-us__head {
  margin-bottom: 18px;
}

.why-us__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(24px, 2.7vw, 52px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  max-width: 980px;
}

.why-us__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.why-us__card {
  min-height: 168px;
  padding: 14px 14px 16px;
  border-radius: 20px;
  background: #f8f8f8;
  border: 1px solid rgba(17, 17, 17, 0.04);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease;
}

.why-us__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(17, 17, 17, 0.06);
  background: #fbfbfb;
}

.why-us__card:active {
  transform: translateY(0);
}

.why-us__icon-wrap {
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 999px;
  background: #11b7d8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.why-us__icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  display: block;
}

.why-us__content {
  min-width: 0;
  width: 100%;
}

.why-us__card-title {
  margin: 0;
  color: #2b2f35;
  font-size: 16px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.why-us__card-text {
  margin: 10px 0 0;
  color: #4f555d;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 400;
}

@media (max-width: 1100px) {
  .why-us__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .why-us {
    padding: 22px 14px 0;
  }

  .why-us__head {
    margin-bottom: 14px;
  }

  .why-us__title {
    font-size: clamp(20px, 7vw, 30px);
    line-height: 0.98;
  }

  .why-us__grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .why-us__card {
    min-height: 150px;
    padding: 14px;
    border-radius: 18px;
    gap: 10px;
  }

  .why-us__icon-wrap {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  .why-us__icon {
    width: 20px;
    height: 20px;
  }

  .why-us__card-title {
    font-size: 15px;
  }

  .why-us__card-text {
    font-size: 12px;
    line-height: 1.35;
  }
}
</style>