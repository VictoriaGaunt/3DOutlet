<template>
  <footer class="footer">
    <img :src="backgroundImage" alt="footer background" class="footer__bg" />
    <div class="footer__overlay"></div>

    <div class="footer__inner">
      <div class="footer__top-line"></div>

      <div class="footer__grid">
        <div class="footer__column footer__column--info">
          <h2 class="footer__title">ООО “ЦЕНТР ЖК” 3D OUTLET</h2>

          <nav class="footer__links">
            <a
                v-for="item in companyLinks"
                :key="item.label"
                :href="item.href"
                class="footer__link"
                target="_blank"
                rel="noopener noreferrer"
            >
              {{ item.label }}
            </a>
          </nav>

          <div class="footer__socials">
            <a
                v-for="item in socialLinks"
                :key="item.label"
                :href="item.href"
                class="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="item.label"
            >
              <img :src="item.icon" :alt="item.label" class="footer__social-icon" />
            </a>
          </div>
        </div>

        <div class="footer__column footer__column--catalog">
          <h3 class="footer__subtitle">КАТАЛОГ</h3>

          <nav class="footer__links">
            <a
                v-for="item in catalogLinks"
                :key="item.label"
                :href="item.href"
                class="footer__link footer__link--strong"
                target="_blank"
                rel="noopener noreferrer"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>

        <div class="footer__column footer__column--contacts">
          <h3 class="footer__subtitle">КОНТАКТЫ</h3>

          <div class="footer__contacts">
            <button
                type="button"
                class="footer__contact-link footer__contact-link--phone"
                @click="openModal('Телефон', 'Тут что-то будет')"
            >
              <span class="footer__contact-main">
                +7 (4Б5) 1Ч7-65-9Я
              </span>

              <span class="footer__contact-icons">
                <img :src="icons.phone" alt="phone" class="footer__contact-icon" />
                <img :src="icons.telegram" alt="telegram" class="footer__contact-icon" />
                <img :src="icons.whatsapp" alt="whatsapp" class="footer__contact-icon" />
              </span>
            </button>

            <button
                type="button"
                class="footer__contact-link"
                @click="openModal('Email', 'Тут что-то будет')"
            >
              <img :src="icons.mail" alt="mail" class="footer__contact-icon footer__contact-icon--mail" />
              <span class="footer__contact-main">infoo3d-outlet.ru</span>
            </button>

            <p class="footer__contact-note">Бесплатный звонок по России</p>
          </div>
        </div>
      </div>
    </div>

    <AppModal
        :is-open="modal.isOpen"
        :title="modal.title"
        :description="modal.description"
        @close="closeModal"
    />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import { asset } from '@/utils/asset'

interface FooterLink {
  label: string
  href: string
}

interface SocialLink extends FooterLink {
  icon: string
}

interface ModalState {
  isOpen: boolean
  title: string
  description: string
}

const backgroundImage = asset('footer4.png')

const modal = ref<ModalState>({
  isOpen: false,
  title: '',
  description: '',
})

const icons = {
  mail: asset('footer5.png'),
  phone: asset('footer8.png'),
  telegram: asset('footer7.png'),
  whatsapp: asset('footer6.png'),
}

const companyLinks: FooterLink[] = [
  {
    label: 'Политика обработки персональных данных',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Пользовательское соглашение',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Публичная оферта',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Карта сайта',
    href: 'https://www.3d-outlet.ru/',
  },
]

const catalogLinks: FooterLink[] = [
  {
    label: '3D Принтеры',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Филаменты',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Аксессуары',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Акции',
    href: 'https://www.3d-outlet.ru/',
  },
  {
    label: 'Избранное',
    href: 'https://www.3d-outlet.ru/',
  },
]

const socialLinks: SocialLink[] = [
  {
    label: 'Telegram',
    href: 'https://t.me/',
    icon: asset('footer3.png'),
  },
  {
    label: 'VK',
    href: 'https://vk.com/',
    icon: asset('footer2.png'),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: asset('footer1.png'),
  },
]

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
</script>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  margin-top: 36px;
  background: #050505;
  overflow: hidden;
}

.footer__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

.footer__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.76);
}

.footer__inner {
  position: relative;
  z-index: 3;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px 34px;
}

.footer__top-line {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.22);
  margin-bottom: 28px;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 1fr;
  gap: 44px;
}

.footer__column {
  min-width: 0;
}

.footer__title,
.footer__subtitle {
  margin: 0;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.footer__title {
  font-size: 22px;
  line-height: 1;
}

.footer__subtitle {
  font-size: 20px;
  line-height: 1;
}

.footer__links {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__link {
  color: rgba(255, 255, 255, 0.66);
  font-size: 14px;
  line-height: 1.25;
  font-weight: 400;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.16);
  text-underline-offset: 4px;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.footer__link:hover {
  color: #ffffff;
  text-decoration-color: rgba(255, 255, 255, 0.5);
}

.footer__link--strong {
  color: #ffffff;
  font-weight: 600;
}

.footer__socials {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer__social {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease, opacity 0.2s ease;
}

.footer__social:hover {
  opacity: 0.92;
}

.footer__social:active {
  transform: scale(0.96);
}

.footer__social-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
}

.footer__contacts {
  margin-top: 18px;
}

.footer__contact-link {
  width: fit-content;
  max-width: 100%;
  border: 0;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  cursor: pointer;
  text-align: left;
}

.footer__contact-link + .footer__contact-link {
  margin-top: 14px;
}

.footer__contact-link--phone {
  align-items: center;
  gap: 12px;
}

.footer__contact-main {
  color: #ffffff;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.22);
  text-underline-offset: 4px;
  transition: color 0.2s ease, text-decoration-color 0.2s ease;
}

.footer__contact-link:hover .footer__contact-main {
  color: #d9ecff;
  text-decoration-color: rgba(217, 236, 255, 0.5);
}

.footer__contact-icons {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.footer__contact-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}

.footer__contact-icon--mail {
  width: 18px;
  height: 18px;
}

.footer__contact-note {
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.58);
  font-size: 13px;
  line-height: 1.2;
  font-weight: 400;
}

@media (max-width: 1100px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px 28px;
  }

  .footer__column--contacts {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .footer {
    margin-top: 28px;
  }

  .footer__inner {
    padding: 0 14px 24px;
  }

  .footer__top-line {
    margin-bottom: 22px;
  }

  .footer__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer__title {
    font-size: 18px;
    line-height: 1.05;
  }

  .footer__subtitle {
    font-size: 17px;
  }

  .footer__links {
    margin-top: 14px;
    gap: 10px;
  }

  .footer__link {
    font-size: 13px;
  }

  .footer__contact-main {
    font-size: 14px;
  }

  .footer__contact-note {
    font-size: 12px;
  }
}
</style>