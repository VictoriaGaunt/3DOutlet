<template>
  <header class="header">
    <div class="header__inner">
      <!-- top row -->
      <div class="header__top">
        <div class="header__top-left">
          <a href="#top" class="header__mini-link">
            <img :src="icons.geo" alt="geo" class="header__mini-icon" />
            <span>ул. Большая красноперская</span>
          </a>

          <a href="#business" class="header__mini-link header__mini-link--desktop">
            <img :src="icons.arrowUpRight" alt="arrow" class="header__mini-icon" />
            <span>Юр. лицам</span>
          </a>
        </div>

        <div class="header__top-right">
          <div class="dropdown" ref="contactDropdownRef">
            <button
                class="header__pill"
                type="button"
                @click.stop="toggleDropdown('contact')"
            >
              <img :src="icons.phone" alt="phone" class="header__pill-icon" />
              <span>Связь с нами</span>
              <img
                  :src="icons.chevronDown"
                  alt="down"
                  class="header__pill-arrow"
                  :class="{ 'is-open': openedDropdown === 'contact' }"
              />
            </button>

            <transition name="fade-dropdown">
              <div v-if="openedDropdown === 'contact'" class="dropdown__menu">
                <button
                    v-for="item in contactItems"
                    :key="item.title"
                    class="dropdown__item"
                    type="button"
                    @click="handleDropdownItem(item)"
                >
                  {{ item.title }}
                </button>
              </div>
            </transition>
          </div>

          <button
              type="button"
              class="header__auth"
              @click="openModal('Вход и регистрация', 'Здесь позже будет окно авторизации и регистрации.')"
          >
            <span class="header__auth-group">
              <img :src="icons.user" alt="user" class="header__auth-icon" />
              <span>Войти</span>
            </span>
            <span class="header__auth-dot">•</span>
            <span>Регистрация</span>
          </button>
        </div>
      </div>

      <div class="header__bottom">
        <div class="header__left">
          <a href="#top" class="header__logo" @click.prevent="openModal('Главная', 'Здесь позже будет переход на главную страницу.')">
            <img :src="icons.logo" alt="3D Outlet" class="header__logo-img" />
          </a>

          <nav class="header__nav">
            <div class="dropdown" ref="catalogDropdownRef">
              <button
                  class="header__nav-link"
                  type="button"
                  @click.stop="toggleDropdown('catalog')"
              >
                <span>КАТАЛОГ</span>
                <img
                    :src="icons.chevronDown"
                    alt="down"
                    class="header__nav-arrow"
                    :class="{ 'is-open': openedDropdown === 'catalog' }"
                />
              </button>

              <transition name="fade-dropdown">
                <div v-if="openedDropdown === 'catalog'" class="dropdown__menu dropdown__menu--nav">
                  <button
                      v-for="item in catalogItems"
                      :key="item.title"
                      class="dropdown__item"
                      type="button"
                      @click="handleDropdownItem(item)"
                  >
                    {{ item.title }}
                  </button>
                </div>
              </transition>
            </div>

            <div class="dropdown" ref="softwareDropdownRef">
              <button
                  class="header__nav-link"
                  type="button"
                  @click.stop="toggleDropdown('software')"
              >
                <span>ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ</span>
                <img
                    :src="icons.chevronDown"
                    alt="down"
                    class="header__nav-arrow"
                    :class="{ 'is-open': openedDropdown === 'software' }"
                />
              </button>

              <transition name="fade-dropdown">
                <div v-if="openedDropdown === 'software'" class="dropdown__menu dropdown__menu--nav">
                  <button
                      v-for="item in softwareItems"
                      :key="item.title"
                      class="dropdown__item"
                      type="button"
                      @click="handleDropdownItem(item)"
                  >
                    {{ item.title }}
                  </button>
                </div>
              </transition>
            </div>

            <a href="#reviews" class="header__nav-link header__nav-link--anchor">
              <span>ОТЗЫВЫ</span>
              <img :src="icons.arrowUpRight" alt="external" class="header__nav-external" />
            </a>
          </nav>
        </div>

        <div class="header__actions">
          <button
              class="header__icon-btn header__icon-btn--desktop-only"
              type="button"
              @click="openModal('Поиск', 'Здесь позже будет поиск по сайту.')"
              aria-label="Поиск"
          >
            <img :src="icons.search" alt="search" class="header__action-icon" />
          </button>

          <button
              class="header__icon-btn header__icon-btn--desktop-only"
              type="button"
              @click="openModal('Избранное', 'Здесь позже будет список избранного.')"
              aria-label="Избранное"
          >
            <img :src="icons.heart" alt="heart" class="header__action-icon" />
          </button>

          <button
              class="header__icon-btn header__icon-btn--desktop-only"
              type="button"
              @click="openModal('Сравнение', 'Здесь позже будет блок сравнения товаров.')"
              aria-label="Сравнение"
          >
            <img :src="icons.chart" alt="chart" class="header__action-icon" />
          </button>

          <button class="header__cart" type="button" @click="openCartModal">
            <img :src="icons.cart" alt="cart" class="header__cart-icon" />
            <div class="header__cart-info">
              <div class="header__cart-price">{{ cartPriceText }}</div>
              <div class="header__cart-count">{{ cartCountText }}</div>
            </div>
          </button>

          <button
              class="header__icon-btn header__icon-btn--mobile-cart"
              type="button"
              aria-label="Корзина"
              @click="openCartModal"
          >
            <img :src="icons.cart" alt="cart" class="header__action-icon" />
            <span v-if="totalCount > 0" class="header__mobile-cart-badge">
              {{ totalCount }}
            </span>
          </button>

          <button
              class="header__burger"
              type="button"
              aria-label="Открыть меню"
              @click="isMobileOpen = !isMobileOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <transition name="menu-fade">
      <div v-if="isMobileOpen" class="header__mobile">
        <nav class="header__mobile-nav">
          <button
              class="header__mobile-link"
              type="button"
              @click="openMobileModal('Каталог', 'Здесь позже будет мобильный каталог.')"
          >
            Каталог
          </button>

          <button
              class="header__mobile-link"
              type="button"
              @click="openMobileModal('Программное обеспечение', 'Здесь позже будет мобильный раздел программного обеспечения.')"
          >
            Программное обеспечение
          </button>

          <a href="#reviews" class="header__mobile-link" @click="isMobileOpen = false">
            Отзывы
          </a>

          <a href="#business" class="header__mobile-link" @click="isMobileOpen = false">
            Юр. лицам
          </a>

          <button
              class="header__mobile-link"
              type="button"
              @click="openMobileModal('Связь с нами', 'Здесь позже будут контакты и способы связи.')"
          >
            Связь с нами
          </button>
        </nav>

        <div class="header__mobile-auth">
          <button
              class="header__mobile-auth-btn"
              type="button"
              @click="openMobileModal('Вход', 'Здесь позже будет форма входа.')"
          >
            <img :src="icons.user" alt="user" class="header__mobile-auth-icon" />
            <span>Войти</span>
          </button>

          <button
              class="header__mobile-auth-btn"
              type="button"
              @click="openMobileModal('Регистрация', 'Здесь позже будет форма регистрации.')"
          >
            <span>Регистрация</span>
          </button>
        </div>

        <div class="header__mobile-cart-panel">
          <button class="header__mobile-cart-btn" type="button" @click="openCartModal">
            <img :src="icons.cart" alt="cart" class="header__mobile-auth-icon" />
            <span>Корзина</span>
            <span class="header__mobile-cart-text">{{ cartCountText }}</span>
            <span class="header__mobile-cart-text">{{ cartPriceText }}</span>
          </button>
        </div>
      </div>
    </transition>

    <ModalCard
        :is-open="modal.isOpen"
        :title="modal.title"
        :description="modal.description"
        @close="closeModal"
    />
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ModalCard from '../ModalCard.vue'
import { useCartStore } from '@/shared/cartStore'

const isMobileOpen = ref(false)
const openedDropdown = ref(null)

const modal = ref({
  isOpen: false,
  title: '',
  description: '',
})

const base = import.meta.env.BASE_URL
const asset = (name) => `${base}${name}`

const contactDropdownRef = ref(null)
const catalogDropdownRef = ref(null)
const softwareDropdownRef = ref(null)

const { totalCount, totalPrice, formatPrice } = useCartStore()

const cartCountText = computed(() => `${totalCount.value} шт.`)
const cartPriceText = computed(() => `${formatPrice(totalPrice.value)} ₽`)

const icons = {
  geo: asset('img9.png'),
  arrowUpRight: asset('img8.png'),
  phone: asset('img2.png'),
  chevronDown: asset('img3.png'),
  user: asset('img1.png'),
  logo: asset('image.png'),
  search: asset('img7.png'),
  heart: asset('img6.png'),
  chart: asset('img4.png'),
  cart: asset('img5.png'),
}

const contactItems = [
  { title: 'Позвонить', description: 'Позже здесь будет быстрый переход к звонку.' },
  { title: 'Написать в Telegram', description: 'Позже здесь будет ссылка на Telegram.' },
  { title: 'Оставить заявку', description: 'Позже здесь будет форма заявки.' },
]

const catalogItems = [
  { title: '3D-принтеры', description: 'Раздел с 3D-принтерами.' },
  { title: 'Филаменты', description: 'Раздел с материалами для печати.' },
  { title: 'Комплектующие', description: 'Раздел с комплектующими.' },
]

const softwareItems = [
  { title: 'Лицензии', description: 'Раздел с лицензиями.' },
  { title: 'Плагины', description: 'Раздел с плагинами.' },
  { title: 'Сервисы', description: 'Раздел с программными сервисами.' },
]

function openModal(title, description) {
  modal.value = {
    isOpen: true,
    title,
    description,
  }
  openedDropdown.value = null
}

function openMobileModal(title, description) {
  isMobileOpen.value = false
  openModal(title, description)
}

function closeModal() {
  modal.value.isOpen = false
}

function openCartModal() {
  openModal(
      'Корзина',
      totalCount.value > 0
          ? `В корзине ${cartCountText.value} на сумму ${cartPriceText.value}.`
          : 'Корзина пока пуста.'
  )
}

function toggleDropdown(name) {
  openedDropdown.value = openedDropdown.value === name ? null : name
}

function handleDropdownItem(item) {
  isMobileOpen.value = false
  openModal(item.title, item.description)
}

function handleClickOutside(event) {
  const refs = [
    contactDropdownRef.value,
    catalogDropdownRef.value,
    softwareDropdownRef.value,
  ]

  const clickedInside = refs.some((element) => element && element.contains(event.target))

  if (!clickedInside) {
    openedDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.header {
  width: 100%;
  background: #f3f3f3;
  border-bottom: 1px solid #e6e6e6;
  position: sticky;
  top: 0;
  z-index: 60;
}

.header__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 6px 20px 0;
}

.header__top {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header__top-left,
.header__top-right,
.header__left,
.header__nav,
.header__actions,
.header__auth,
.header__auth-group {
  display: flex;
  align-items: center;
}

.header__top-left {
  gap: 28px;
}

.header__top-right {
  gap: 16px;
}

.header__mini-link,
.header__nav-link,
.header__mobile-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #1b1b1b;
  text-decoration: none;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.header__mini-link,
.header__auth,
.header__nav-link,
.header__mobile-link {
  cursor: pointer;
}

.header__mini-link:hover,
.header__mini-link:active,
.header__nav-link:hover,
.header__nav-link:active,
.header__mobile-link:hover,
.header__mobile-link:active,
.dropdown__item:hover,
.dropdown__item:active {
  color: #f07f17;
}

.header__mini-link {
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
}

.header__mini-icon,
.header__auth-icon,
.header__pill-icon,
.header__pill-arrow,
.header__nav-arrow,
.header__nav-external,
.header__action-icon,
.header__cart-icon {
  display: block;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  object-fit: contain;
}

.header__pill-icon,
.header__auth-icon {
  width: 17px;
  height: 17px;
}

.header__pill {
  height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  background: #ebebee;
  color: #1b1b1b;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.header__pill:hover {
  background: #f07f17;
  color: #ffffff;
}

.header__pill:active {
  background: #d96809;
  color: #ffffff;
  transform: translateY(1px);
}

.header__pill-arrow,
.header__nav-arrow {
  transition: transform 0.2s ease;
}

.header__pill-arrow.is-open,
.header__nav-arrow.is-open {
  transform: rotate(180deg);
}

.header__auth {
  height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  background: #ebebee;
  gap: 10px;
  color: #1b1b1b;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.header__auth:hover {
  background: #f07f17;
  color: #ffffff;
}

.header__auth-dot {
  color: #8f8f95;
  font-size: 16px;
  line-height: 1;
}

.header__bottom {
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.header__left {
  gap: 30px;
  min-width: 0;
}

.header__logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.header__logo-img {
  display: block;
  width: 46px;
  height: 46px;
  object-fit: contain;
}

.header__nav {
  gap: 36px;
  min-width: 0;
}

.header__nav-link {
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
}

.header__nav-link--anchor {
  text-decoration: none;
}

.header__actions {
  gap: 12px;
  flex-shrink: 0;
}

.header__icon-btn {
  width: 34px;
  height: 34px;
  border: 0;
  background: transparent;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.header__icon-btn:hover {
  background: rgba(240, 127, 23, 0.12);
}

.header__icon-btn:active {
  background: rgba(240, 127, 23, 0.2);
  transform: scale(0.96);
}

.header__cart {
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.header__cart:hover {
  background: rgba(240, 127, 23, 0.12);
}

.header__cart:active {
  background: rgba(240, 127, 23, 0.2);
  transform: scale(0.98);
}

.header__cart-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}

.header__cart-price {
  font-size: 14px;
  font-weight: 600;
  color: #1b1b1b;
  white-space: nowrap;
}

.header__cart-count {
  font-size: 12px;
  color: #6f6f75;
  margin-top: 3px;
  white-space: nowrap;
}

.header__icon-btn--mobile-cart {
  display: none;
  position: relative;
}

.header__mobile-cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ff5b00;
  color: #ffffff;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  text-align: center;
}

.header__burger {
  display: none;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background: #ebebee;
  cursor: pointer;
  padding: 0;
  position: relative;
}

.header__burger span {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 2px;
  background: #1b1b1b;
  border-radius: 999px;
}

.header__burger span:nth-child(1) {
  top: 12px;
}

.header__burger span:nth-child(2) {
  top: 19px;
}

.header__burger span:nth-child(3) {
  top: 26px;
}

.dropdown {
  position: relative;
}

.dropdown__menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 220px;
  padding: 8px;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(17, 17, 17, 0.08);
  z-index: 30;
}

.dropdown__menu--nav {
  min-width: 260px;
}

.dropdown__item {
  width: 100%;
  min-height: 42px;
  border: 0;
  background: transparent;
  border-radius: 10px;
  text-align: left;
  padding: 10px 12px;
  font-size: 14px;
  color: #1b1b1b;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown__item:hover {
  background: rgba(240, 127, 23, 0.08);
}

.header__mobile {
  display: none;
}

.fade-dropdown-enter-active,
.fade-dropdown-leave-active,
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.22s ease;
}

.fade-dropdown-enter-from,
.fade-dropdown-leave-to,
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-dropdown-enter-to,
.fade-dropdown-leave-from,
.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.header__mobile-auth {
  display: none;
}

.header__mobile-cart-panel {
  display: none;
}

@media (max-width: 960px) {
  .header__top-right,
  .header__nav,
  .header__cart,
  .header__icon-btn--desktop-only {
    display: none;
  }

  .header__burger {
    display: inline-flex;
  }

  .header__icon-btn--mobile-cart {
    display: inline-flex;
  }

  .header__mobile {
    display: block;
    padding: 0 20px 16px;
    background: #f3f3f3;
    border-top: 1px solid #e6e6e6;
  }

  .header__mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 14px;
  }

  .header__mobile-link {
    min-height: 42px;
    padding: 0 12px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    background: transparent;
    text-decoration: none;
    border: 0;
    text-align: left;
  }

  .header__mobile-auth {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 14px;
  }

  .header__mobile-auth-btn {
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

  .header__mobile-auth-btn:hover {
    background: #f07f17;
    color: #ffffff;
  }

  .header__mobile-auth-btn:active {
    transform: scale(0.98);
  }

  .header__mobile-auth-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }

  .header__mobile-cart-panel {
    display: block;
    margin-top: 12px;
  }

  .header__mobile-cart-btn {
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

  .header__mobile-cart-btn:hover {
    background: #f07f17;
    color: #ffffff;
  }

  .header__mobile-cart-btn:active {
    transform: scale(0.98);
  }

  .header__mobile-cart-text {
    font-size: 13px;
    font-weight: 500;
    color: inherit;
  }
}

@media (max-width: 640px) {
  .header__inner {
    padding: 6px 14px 0;
  }

  .header__mini-link--desktop {
    display: none;
  }

  .header__logo-img {
    width: 40px;
    height: 40px;
  }

  .header__actions {
    gap: 8px;
  }

  .header__icon-btn {
    width: 36px;
    height: 36px;
  }

  .header__action-icon {
    width: 18px;
    height: 18px;
  }

  .header__mobile {
    padding: 0 14px 14px;
  }
}
</style>