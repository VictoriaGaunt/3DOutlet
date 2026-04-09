<template>
  <div class="dropdown" ref="rootRef">
    <button
        :id="triggerId"
        class="dropdown__trigger"
        :class="triggerClass"
        type="button"
        :aria-expanded="isOpen ? 'true' : 'false'"
        :aria-controls="menuId"
        aria-haspopup="menu"
        @click.stop="emit('toggle')"
        @keydown="onTriggerKeydown"
    >
      <slot name="trigger" />
      <img
          :src="chevronIcon"
          alt=""
          aria-hidden="true"
          class="dropdown__arrow"
          :class="{ 'is-open': isOpen }"
      />
    </button>

    <transition name="fade-dropdown">
      <div
          v-if="isOpen"
          :id="menuId"
          ref="menuRef"
          class="dropdown__menu"
          :class="menuClass"
          role="menu"
          :aria-labelledby="triggerId"
          @keydown="onMenuKeydown"
      >
        <button
            v-for="(item, index) in items"
            :key="item.title"
            :ref="(el) => setItemRef(el, index)"
            class="dropdown__item"
            type="button"
            role="menuitem"
            :tabindex="0"
            @click="emit('select', item)"
        >
          {{ item.title }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type ComponentPublicInstance } from 'vue'
import type { NavigationItem } from '@/types'
import { asset } from '@/utils/asset'

interface Props {
  isOpen: boolean
  items: NavigationItem[]
  triggerClass?: string
  menuClass?: string
  menuId?: string
  triggerId?: string
}

const {
  isOpen,
  items,
  triggerClass,
  menuClass,
  menuId,
  triggerId,
} = withDefaults(defineProps<Props>(), {
  triggerClass: '',
  menuClass: '',
  menuId: 'nav-dropdown-menu',
  triggerId: 'nav-dropdown-trigger',
})

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'select', item: NavigationItem): void
}>()

const rootRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])

const chevronIcon = computed(() => asset('img3.png'))

function setItemRef(
    el: Element | ComponentPublicInstance | null,
    index: number,
): void {
  if (el instanceof HTMLElement) {
    itemRefs.value[index] = el
  }
}

function focusItem(index: number): void {
  const item = itemRefs.value[index]
  item?.focus()
}

async function focusFirstItem(): Promise<void> {
  await nextTick()
  focusItem(0)
}

async function focusLastItem(): Promise<void> {
  await nextTick()
  focusItem(itemRefs.value.length - 1)
}

function focusNextItem(): void {
  const activeIndex = itemRefs.value.findIndex((item) => item === document.activeElement)
  const nextIndex = activeIndex >= itemRefs.value.length - 1 ? 0 : activeIndex + 1
  focusItem(nextIndex)
}

function focusPrevItem(): void {
  const activeIndex = itemRefs.value.findIndex((item) => item === document.activeElement)
  const prevIndex = activeIndex <= 0 ? itemRefs.value.length - 1 : activeIndex - 1
  focusItem(prevIndex)
}

function onTriggerKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    emit('toggle')
    void focusFirstItem()
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    emit('toggle')
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    emit('toggle')
  }
}

function onMenuKeydown(event: KeyboardEvent): void {
  if (!isOpen) return

  if (event.key === 'Escape') {
    event.preventDefault()
    emit('toggle')
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    focusNextItem()
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    focusPrevItem()
    return
  }

  if (event.key === 'Home') {
    event.preventDefault()
    void focusFirstItem()
    return
  }

  if (event.key === 'End') {
    event.preventDefault()
    void focusLastItem()
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.dropdown__trigger:focus-visible,
.dropdown__item:focus-visible {
  outline: 2px solid #ff5b00;
  outline-offset: 2px;
}

.dropdown__arrow {
  width: 18px;
  height: 18px;
  min-width: 18px;
  min-height: 18px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.dropdown__arrow.is-open {
  transform: rotate(180deg);
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
  z-index: 40;
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

.dropdown__item:hover,
.dropdown__item:focus-visible {
  background: rgba(240, 127, 23, 0.08);
  color: #d45500;
}

.fade-dropdown-enter-active,
.fade-dropdown-leave-active {
  transition: all 0.22s ease;
}

.fade-dropdown-enter-from,
.fade-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-dropdown-enter-to,
.fade-dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>