<template>
  <header class="header">
    <div class="header__inner">
      <HeaderTop
          :opened-dropdown="openedDropdown"
          :contact-items="contactItems"
          @toggle-dropdown="toggleDropdown"
          @select-item="handleDropdownItem"
          @open-modal="openModal"
      />

      <div class="header__bottom">
        <HeaderNav
            :opened-dropdown="openedDropdown"
            :catalog-items="catalogItems"
            :software-items="softwareItems"
            @toggle-dropdown="toggleDropdown"
            @select-item="handleDropdownItem"
            @open-modal="openModal"
        />

        <HeaderActions
            :total-count="totalCount"
            :total-price="totalPrice"
            :format-price="formatPrice"
            @open-modal="openModal"
            @open-cart="openCartModal"
            @toggle-mobile-menu="toggleMobileMenu"
        />
      </div>
    </div>

    <MobileMenu
        :is-open="isMobileOpen"
        :total-count="totalCount"
        :total-price="totalPrice"
        :format-price="formatPrice"
        @close="closeMobileMenu"
        @open-modal="openMobileModal"
        @open-cart="openCartModal"
    />

    <AppModal
        :is-open="modal.isOpen"
        :title="modal.title"
        :description="modal.description"
        @close="closeModal"
    />
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeaderTop from './HeaderTop.vue'
import HeaderNav from './HeaderNav.vue'
import HeaderActions from './HeaderActions.vue'
import MobileMenu from './MobileMenu.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { useCartStore } from '@/shared/cartStore'
import { contactItems, catalogItems, softwareItems } from '@/data/navigation'
import type { NavigationItem } from '@/types'

interface ModalState {
  isOpen: boolean
  title: string
  description: string
}

const isMobileOpen = ref(false)
const openedDropdown = ref<string | null>(null)

const modal = ref<ModalState>({
  isOpen: false,
  title: '',
  description: '',
})

const { totalCount, totalPrice, formatPrice } = useCartStore()

function openModal(title: string, description: string): void {
  modal.value = {
    isOpen: true,
    title,
    description,
  }
  openedDropdown.value = null
}

function openMobileModal(title: string, description: string): void {
  isMobileOpen.value = false
  openModal(title, description)
}

function closeModal(): void {
  modal.value.isOpen = false
}

function openCartModal(): void {
  openModal(
      'Корзина',
      totalCount.value > 0
          ? `В корзине ${totalCount.value} шт. на сумму ${formatPrice(totalPrice.value)} ₽.`
          : 'Корзина пока пуста.',
  )
}

function toggleDropdown(name: string): void {
  openedDropdown.value = openedDropdown.value === name ? null : name
}

function handleDropdownItem(item: NavigationItem): void {
  isMobileOpen.value = false
  openModal(item.title, item.description)
}

function toggleMobileMenu(): void {
  isMobileOpen.value = !isMobileOpen.value
}

function closeMobileMenu(): void {
  isMobileOpen.value = false
}

function handleClickOutside(event: MouseEvent): void {
  const target = event.target as HTMLElement | null
  if (!target) return

  if (!target.closest('.dropdown')) {
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

.header__bottom {
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

@media (max-width: 640px) {
  .header__inner {
    padding: 6px 14px 0;
  }
}
</style>