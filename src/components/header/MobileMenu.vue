<template>
  <transition name="menu-fade">
    <div
        v-if="isOpen"
        :id="menuId"
        ref="menuRef"
        class="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
        tabindex="-1"
        @keydown.esc.prevent="$emit('close')"
    >
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        <button
            class="mobile-menu__link"
            type="button"
            @click="$emit('open-modal', 'Каталог', 'Здесь позже будет мобильный каталог.')"
        >
          Каталог
        </button>

        <button
            class="mobile-menu__link"
            type="button"
            @click="$emit('open-modal', 'Программное обеспечение', 'Здесь позже будет мобильный раздел программного обеспечения.')"
        >
          Программное обеспечение
        </button>

        <a href="#reviews" class="mobile-menu__link" @click="$emit('close')">
          Отзывы
        </a>

        <a href="#business" class="mobile-menu__link" @click="$emit('close')">
          Юр. лицам
        </a>

        <button
            class="mobile-menu__link"
            type="button"
            @click="$emit('open-modal', 'Связь с нами', 'Здесь позже будут контакты и способы связи.')"
        >
          Связь с нами
        </button>
      </nav>

      <div class="mobile-menu__auth">
        <button
            class="mobile-menu__auth-btn"
            type="button"
            aria-label="Открыть вход"
            @click="$emit('open-modal', 'Вход', 'Здесь позже будет форма входа.')"
        >
          <img :src="icons.user" alt="" aria-hidden="true" class="mobile-menu__auth-icon" />
          <span>Войти</span>
        </button>

        <button
            class="mobile-menu__auth-btn"
            type="button"
            aria-label="Открыть регистрацию"
            @click="$emit('open-modal', 'Регистрация', 'Здесь позже будет форма регистрации.')"
        >
          <span>Регистрация</span>
        </button>
      </div>

      <div class="mobile-menu__cart-panel">
        <button
            class="mobile-menu__cart-btn"
            type="button"
            :aria-label="`Открыть корзину, ${cartCountText}, ${cartPriceText}`"
            @click="$emit('open-cart')"
        >
          <img :src="icons.cart" alt="" aria-hidden="true" class="mobile-menu__auth-icon" />
          <span>Корзина</span>
          <span class="mobile-menu__cart-text">{{ cartCountText }}</span>
          <span class="mobile-menu__cart-text">{{ cartPriceText }}</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { asset } from '@/utils/asset'

interface Props {
  isOpen: boolean
  totalCount: number
  totalPrice: number
  formatPrice: (value: number) => string
  menuId?: string
}

const props = withDefaults(defineProps<Props>(), {
  menuId: 'mobile-menu',
})

defineEmits<{
  (e: 'close'): void
  (e: 'open-modal', title: string, description: string): void
  (e: 'open-cart'): void
}>()

const menuRef = ref<HTMLElement | null>(null)

const icons = {
  user: asset('img1.png'),
  cart: asset('img5.png'),
}

const cartCountText = computed(() => `${props.totalCount} шт.`)
const cartPriceText = computed(() => `${props.formatPrice(props.totalPrice)} ₽`)

watch(
    () => props.isOpen,
    async (isOpen) => {
      if (!isOpen) return
      await nextTick()
      menuRef.value?.focus()
    },
)
</script>

<style scoped>
.mobile-menu {
  display: none;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.22s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 960px) {
  .mobile-menu {
    display: block;
    padding: 0 20px 16px;
    background: #f3f3f3;
    border-top: 1px solid #e6e6e6;
  }

  .mobile-menu:focus-visible,
  .mobile-menu__link:focus-visible,
  .mobile-menu__auth-btn:focus-visible,
  .mobile-menu__cart-btn:focus-visible {
    outline: 2px solid #ff5b00;
    outline-offset: 2px;
  }

  .mobile-menu__nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 14px;
  }

  .mobile-menu__link {
    min-height: 42px;
    padding: 0 12px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    text-decoration: none;
    color: #1b1b1b;
    border: 0;
    text-align: left;
    cursor: pointer;
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  .mobile-menu__link:hover,
  .mobile-menu__link:focus-visible {
    color: #d45500;
    background: rgba(240, 127, 23, 0.08);
  }

  .mobile-menu__auth {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 14px;
  }

  .mobile-menu__auth-btn {
    min-height: 42px;
    width: 100%;
    border: 0;
    border-radius: 12px;
    background: #ebebee;
    color: #1b1b1b;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.15s ease;
  }

  .mobile-menu__auth-btn:hover,
  .mobile-menu__auth-btn:focus-visible {
    background: #d45500;
    color: #ffffff;
  }

  .mobile-menu__auth-btn:active {
    transform: scale(0.98);
  }

  .mobile-menu__auth-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .mobile-menu__cart-panel {
    display: block;
    margin-top: 12px;
  }

  .mobile-menu__cart-btn {
    min-height: 42px;
    width: 100%;
    border: 0;
    border-radius: 12px;
    background: #ebebee;
    color: #1b1b1b;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 14px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        transform 0.15s ease;
  }

  .mobile-menu__cart-btn:hover,
  .mobile-menu__cart-btn:focus-visible {
    background: #d45500;
    color: #ffffff;
  }

  .mobile-menu__cart-btn:active {
    transform: scale(0.98);
  }

  .mobile-menu__cart-text {
    font-size: 13px;
    font-weight: 500;
    color: inherit;
  }
}

@media (max-width: 640px) {
  .mobile-menu {
    padding: 0 14px 14px;
  }
}
</style>