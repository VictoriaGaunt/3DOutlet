<template>
  <section class="telegram-promo">
    <div class="telegram-promo__inner">
      <div class="telegram-promo__card">
        <img
            :src="backgroundImage"
            alt="Telegram promo background"
            class="telegram-promo__bg"
        />

        <div class="telegram-promo__overlay"></div>

        <div class="telegram-promo__content">
          <div class="telegram-promo__text">
            <h2 class="telegram-promo__title">
              ПОДПИШИТЕСЬ НА НАШ КАНАЛ В TELEGRAM
            </h2>
            <p class="telegram-promo__subtitle">
              Полезные советы и новости по 3D печати
            </p>
          </div>

          <a
              :href="telegramLink"
              class="telegram-promo__button"
              target="_blank"
              rel="noopener noreferrer"
          >
            ПОДПИСАТЬСЯ НА КАНАЛ
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { asset } from '@/utils/asset'

const backgroundImage = asset('TelegramPromo1.png')
const telegramLink = 'https://t.me/your_channel'
</script>

<style scoped>
.telegram-promo {
  width: 100%;
  padding: 28px 20px 0;
  background: #f3f3f3;
}

.telegram-promo__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.telegram-promo__card {
  position: relative;
  min-height: 106px;
  border-radius: 22px;
  overflow: hidden;
  background: linear-gradient(90deg, #171a35 0%, #1a2650 40%, #1d8fe4 100%);
}

.telegram-promo__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  z-index: 1;
}

.telegram-promo__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
      90deg,
      rgba(17, 22, 47, 0.96) 0%,
      rgba(21, 30, 66, 0.84) 30%,
      rgba(25, 128, 220, 0.28) 100%
  );
}

.telegram-promo__content {
  position: relative;
  z-index: 3;
  min-height: 106px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.telegram-promo__text {
  min-width: 0;
}

.telegram-promo__title {
  margin: 0;
  color: #ffffff;
  font-size: clamp(20px, 2vw, 34px);
  line-height: 0.96;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.telegram-promo__subtitle {
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(13px, 1vw, 16px);
  line-height: 1.2;
  font-weight: 400;
}

.telegram-promo__button {
  flex-shrink: 0;
  min-width: 170px;
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  background: #2ba8f7;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  font-size: 12px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition:
      background-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.2s ease;
}

.telegram-promo__button:hover {
  background: #1998ea;
  box-shadow: 0 10px 20px rgba(43, 168, 247, 0.2);
}

.telegram-promo__button:active {
  transform: scale(0.98);
}

@media (max-width: 900px) {
  .telegram-promo__content {
    padding: 18px 18px;
    gap: 16px;
  }

  .telegram-promo__button {
    min-width: 156px;
    height: 42px;
    font-size: 11px;
  }
}

@media (max-width: 640px) {
  .telegram-promo {
    padding: 22px 14px 0;
  }

  .telegram-promo__card {
    min-height: 132px;
    border-radius: 18px;
  }

  .telegram-promo__content {
    min-height: 132px;
    padding: 16px 14px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 14px;
  }

  .telegram-promo__title {
    font-size: clamp(16px, 6vw, 24px);
    line-height: 1;
  }

  .telegram-promo__subtitle {
    margin-top: 6px;
    font-size: 12px;
    line-height: 1.25;
  }

  .telegram-promo__button {
    min-width: 160px;
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    font-size: 11px;
  }
}
</style>