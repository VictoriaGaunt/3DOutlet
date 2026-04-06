<template>
  <section class="trusted-companies">
    <div class="trusted-companies__inner">
      <div class="trusted-companies__head">
        <h2 class="trusted-companies__title">НАМ ДОВЕРЯЮТ</h2>
      </div>

      <div class="trusted-companies__grid">
        <a
            v-for="company in companies"
            :key="company.id"
            :href="company.href"
            class="trusted-companies__card"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="company.name"
        >
          <img
              :src="company.logo"
              :alt="company.name"
              class="trusted-companies__logo"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { asset } from '@/utils/asset'

interface CompanyItem {
  id: number
  name: string
  href: string
  logo: string
}

const companies: CompanyItem[] = [
  {
    id: 1,
    name: 'Сколково',
    href: 'https://sk.ru/',
    logo: asset('testimonials1.png'),
  },
  {
    id: 2,
    name: 'Яндекс',
    href: 'https://yandex.ru/',
    logo: asset('testimonials2.png'),
  },
  {
    id: 3,
    name: 'Ozon Фармацевтика',
    href: 'https://www.ozonpharm.ru/',
    logo: asset('testimonials3.png'),
  },
  {
    id: 4,
    name: 'Все Инструменты',
    href: 'https://www.vseinstrumenti.ru/',
    logo: asset('testimonials4.png'),
  },
  {
    id: 5,
    name: 'ЭФКО',
    href: 'https://www.efko.ru/',
    logo: asset('testimonials5.png'),
  },
  {
    id: 6,
    name: 'Автоваз',
    href: 'https://www.lada.ru/',
    logo: asset('testimonials6.png'),
  },
]
</script>

<style scoped>
.trusted-companies {
  width: 100%;
  padding: 28px 20px 0;
  background: #f3f3f3;
}

.trusted-companies__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.trusted-companies__head {
  margin-bottom: 16px;
}

.trusted-companies__title {
  margin: 0;
  color: #1d232b;
  font-size: clamp(24px, 2.6vw, 46px);
  line-height: 0.95;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.trusted-companies__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 12px;
}

.trusted-companies__card {
  min-height: 82px;
  padding: 14px 18px;
  border-radius: 18px;
  background: #f8f8f8;
  border: 1px solid rgba(17, 17, 17, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease,
      border-color 0.25s ease;
}

.trusted-companies__card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(17, 17, 17, 0.06);
  background: #fbfbfb;
  border-color: rgba(240, 127, 23, 0.18);
}

.trusted-companies__card:active {
  transform: translateY(0);
}

.trusted-companies__logo {
  max-width: 100%;
  max-height: 38px;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  filter: saturate(0.98);
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.trusted-companies__card:hover .trusted-companies__logo {
  transform: scale(1.03);
}

@media (max-width: 1100px) {
  .trusted-companies__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .trusted-companies {
    padding: 22px 14px 0;
  }

  .trusted-companies__head {
    margin-bottom: 12px;
  }

  .trusted-companies__title {
    font-size: clamp(20px, 7vw, 30px);
    line-height: 0.98;
  }

  .trusted-companies__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .trusted-companies__card {
    min-height: 74px;
    padding: 12px 14px;
    border-radius: 16px;
  }

  .trusted-companies__logo {
    max-height: 32px;
  }
}
</style>