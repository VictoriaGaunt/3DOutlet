<template>
  <div class="header-top">
    <div class="header-top__left">
      <a href="#top" class="header-top__mini-link">
        <img :src="icons.geo" alt="" aria-hidden="true" class="header-top__mini-icon" />
        <span>ул. Большая красноперская</span>
      </a>

      <a href="#business" class="header-top__mini-link header-top__mini-link--desktop">
        <img :src="icons.arrowUpRight" alt="" aria-hidden="true" class="header-top__mini-icon" />
        <span>Юр. лицам</span>
      </a>
    </div>

    <div class="header-top__right">
      <NavDropdown
          :is-open="openedDropdown === 'contact'"
          :items="contactItems"
          trigger-class="header-top__pill"
          @toggle="$emit('toggle-dropdown', 'contact')"
          @select="$emit('select-item', $event)"
      >
        <template #trigger>
          <img :src="icons.phone" alt="" aria-hidden="true" class="header-top__pill-icon" />
          <span>Связь с нами</span>
        </template>
      </NavDropdown>

      <button
          type="button"
          class="header-top__auth"
          @click="$emit('open-modal', 'Вход и регистрация', 'Здесь позже будет окно авторизации и регистрации.')"
      >
        <span class="header-top__auth-group">
          <img :src="icons.user" alt="" aria-hidden="true" class="header-top__auth-icon" />
          <span>Войти</span>
        </span>
        <span class="header-top__auth-dot">•</span>
        <span>Регистрация</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavDropdown from './NavDropdown.vue'
import type { NavigationItem } from '@/types'
import { asset } from '@/utils/asset'

interface Props {
  openedDropdown: string | null
  contactItems: NavigationItem[]
}

defineProps<Props>()

defineEmits<{
  (e: 'toggle-dropdown', name: string): void
  (e: 'select-item', item: NavigationItem): void
  (e: 'open-modal', title: string, description: string): void
}>()

const icons = {
  geo: asset('img9.png'),
  arrowUpRight: asset('img8.png'),
  phone: asset('img2.png'),
  user: asset('img1.png'),
}
</script>

<style scoped>
.header-top {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-top__left,
.header-top__right,
.header-top__auth,
.header-top__auth-group {
  display: flex;
  align-items: center;
}

.header-top__left {
  gap: 28px;
}

.header-top__right {
  gap: 16px;
}

.header-top__mini-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #1b1b1b;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
}

.header-top__mini-link:hover {
  color: #f07f17;
}

.header-top__mini-icon,
.header-top__pill-icon,
.header-top__auth-icon {
  display: block;
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  object-fit: contain;
}

.header-top__pill-icon,
.header-top__auth-icon {
  width: 17px;
  height: 17px;
}

:deep(.header-top__pill) {
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

:deep(.header-top__pill:hover) {
  background: #f07f17;
  color: #ffffff;
}

.header-top__auth {
  height: 42px;
  padding: 0 16px;
  border: 0;
  border-radius: 12px;
  background: #ebebee;
  gap: 10px;
  color: #1b1b1b;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.header-top__auth:hover {
  background: #f07f17;
  color: #ffffff;
}

.header-top__auth-dot {
  color: #8f8f95;
  font-size: 16px;
  line-height: 1;
}

@media (max-width: 960px) {
  .header-top__right {
    display: none;
  }
}

@media (max-width: 640px) {
  .header-top__mini-link--desktop {
    display: none;
  }
}
</style>