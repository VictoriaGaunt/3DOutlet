<template>
  <div class="header-nav">
    <div class="header-nav__left">
      <a href="#top" class="header-nav__logo" @click.prevent="$emit('open-modal', 'Главная', 'Здесь позже будет переход на главную страницу.')">
        <img :src="icons.logo" alt="3D Outlet" class="header-nav__logo-img" />
      </a>

      <nav class="header-nav__menu">
        <NavDropdown
            :is-open="openedDropdown === 'catalog'"
            :items="catalogItems"
            trigger-class="header-nav__link"
            menu-class="header-nav__menu-dropdown"
            @toggle="$emit('toggle-dropdown', 'catalog')"
            @select="$emit('select-item', $event)"
        >
          <template #trigger>
            <span>КАТАЛОГ</span>
          </template>
        </NavDropdown>

        <NavDropdown
            :is-open="openedDropdown === 'software'"
            :items="softwareItems"
            trigger-class="header-nav__link"
            menu-class="header-nav__menu-dropdown"
            @toggle="$emit('toggle-dropdown', 'software')"
            @select="$emit('select-item', $event)"
        >
          <template #trigger>
            <span>ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ</span>
          </template>
        </NavDropdown>

        <a href="#reviews" class="header-nav__link header-nav__link--anchor">
          <span>ОТЗЫВЫ</span>
          <img :src="icons.arrowUpRight" alt="" aria-hidden="true" class="header-nav__external" />
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavDropdown from './NavDropdown.vue'
import type { NavigationItem } from '@/types'
import { asset } from '@/utils/asset'

interface Props {
  openedDropdown: string | null
  catalogItems: NavigationItem[]
  softwareItems: NavigationItem[]
}

defineProps<Props>()

defineEmits<{
  (e: 'toggle-dropdown', name: string): void
  (e: 'select-item', item: NavigationItem): void
  (e: 'open-modal', title: string, description: string): void
}>()

const icons = {
  logo: asset('image.png'),
  arrowUpRight: asset('img8.png'),
}
</script>

<style scoped>
.header-nav,
.header-nav__left,
.header-nav__menu {
  display: flex;
  align-items: center;
}

.header-nav {
  min-width: 0;
}

.header-nav__left {
  gap: 30px;
  min-width: 0;
}

.header-nav__logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.header-nav__logo-img {
  display: block;
  width: 46px;
  height: 46px;
  object-fit: contain;
}

.header-nav__menu {
  gap: 36px;
  min-width: 0;
}

:deep(.header-nav__link) {
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  color: #1b1b1b;
  cursor: pointer;
  transition: color 0.2s ease;
}

:deep(.header-nav__link:hover) {
  color: #f07f17;
}

:deep(.header-nav__menu-dropdown) {
  min-width: 260px;
}

.header-nav__link--anchor {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1b1b1b;
  text-decoration: none;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.header-nav__link--anchor:hover {
  color: #f07f17;
}

.header-nav__external {
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  object-fit: contain;
}

@media (max-width: 960px) {
  .header-nav__menu {
    display: none;
  }
}

@media (max-width: 640px) {
  .header-nav__logo-img {
    width: 40px;
    height: 40px;
  }
}
</style>