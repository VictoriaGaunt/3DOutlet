<template>
  <transition name="modal-fade">
    <div
        v-if="isOpen"
        class="app-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Модальное окно'"
        @click.self="$emit('close')"
    >
      <div class="app-modal__card">
        <button class="app-modal__close" type="button" @click="$emit('close')">
          ×
        </button>

        <div class="app-modal__content">
          <h3 v-if="title" class="app-modal__title">{{ title }}</h3>
          <p v-if="description" class="app-modal__text">{{ description }}</p>

          <div v-if="$slots.default" class="app-modal__body">
            <slot />
          </div>

          <div class="app-modal__actions">
            <slot name="actions">
              <AppButton variant="secondary" @click="$emit('close')">
                Закрыть
              </AppButton>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue'

interface Props {
  isOpen?: boolean
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: '',
  description: '',
})

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.app-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 15, 15, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.app-modal__card {
  position: relative;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 20px 50px rgba(17, 17, 17, 0.18);
  overflow: hidden;
}

.app-modal__content {
  padding: 28px 24px 24px;
}

.app-modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 12px;
  background: #f3f3f3;
  color: #1b1b1b;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  transition:
      background-color 0.2s ease,
      color 0.2s ease,
      transform 0.15s ease;
}

.app-modal__close:hover {
  background: #f07f17;
  color: #ffffff;
}

.app-modal__close:active {
  transform: scale(0.96);
}

.app-modal__title {
  margin: 0 0 10px;
  font-size: 24px;
  line-height: 1.2;
  font-weight: 700;
  color: #1b1b1b;
}

.app-modal__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #52525b;
}

.app-modal__body {
  margin-top: 18px;
}

.app-modal__actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .app-modal__card,
.modal-fade-leave-to .app-modal__card {
  transform: translateY(10px) scale(0.98);
}

.modal-fade-enter-to .app-modal__card,
.modal-fade-leave-from .app-modal__card {
  transform: translateY(0) scale(1);
}
</style>