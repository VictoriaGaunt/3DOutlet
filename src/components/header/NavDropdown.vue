<template>
  <div class="dropdown" ref="rootRef">
    <button
        class="dropdown__trigger"
        :class="triggerClass"
        type="button"
        @click.stop="$emit('toggle')"
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
          class="dropdown__menu"
          :class="menuClass"
      >
        <button
            v-for="item in items"
            :key="item.title"
            class="dropdown__item"
            type="button"
            @click="$emit('select', item)"
        >
          {{ item.title }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { NavigationItem } from '@/types'
import { asset } from '@/utils/asset'

interface Props {
  isOpen: boolean
  items: NavigationItem[]
  triggerClass?: string
  menuClass?: string
}

defineProps<Props>()

defineEmits<{
  (e: 'toggle'): void
  (e: 'select', item: NavigationItem): void
}>()

const rootRef = ref<HTMLElement | null>(null)

const chevronIcon = computed(() => asset('img3.png'))
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

.dropdown__item:hover {
  background: rgba(240, 127, 23, 0.08);
  color: #f07f17;
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