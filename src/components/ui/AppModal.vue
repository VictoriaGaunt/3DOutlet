<template>
  <transition name="modal-fade">
    <div
        v-if="isOpen"
        ref="overlayRef"
        class="app-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        :aria-describedby="description ? descriptionId : undefined"
        :aria-label="title ? undefined : 'Модальное окно'"
        tabindex="-1"
        @click.self="emitClose"
    >
      <div
          ref="cardRef"
          class="app-modal__card"
          @keydown.esc.prevent="emitClose"
      >
        <button
            ref="closeButtonRef"
            class="app-modal__close"
            type="button"
            aria-label="Закрыть модальное окно"
            @click="emitClose"
        >
          ×
        </button>

        <div class="app-modal__content">
          <h3 v-if="title" :id="titleId" class="app-modal__title">{{ title }}</h3>
          <p v-if="description" :id="descriptionId" class="app-modal__text">{{ description }}</p>

          <div v-if="$slots.default" class="app-modal__body">
            <slot />
          </div>

          <div class="app-modal__actions">
            <slot name="actions">
              <AppButton variant="secondary" @click="emitClose">
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
import { nextTick, ref, watch } from 'vue'
import AppButton from './AppButton.vue'

interface Props {
  isOpen?: boolean
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: '',
  description: '',
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const overlayRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLElement | null>(null)
const lastFocusedElement = ref<HTMLElement | null>(null)

const titleId = 'app-modal-title'
const descriptionId = 'app-modal-description'

function emitClose(): void {
  emit('close')
}

function getFocusableElements(): HTMLElement[] {
  if (!cardRef.value) return []

  return Array.from(
      cardRef.value.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
  )
}

function handleTabKey(event: KeyboardEvent): void {
  const focusable = getFocusableElements()

  if (focusable.length === 0) {
    event.preventDefault()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const active = document.activeElement

  if (event.shiftKey) {
    if (active === first || active === cardRef.value) {
      event.preventDefault()
      last.focus()
    }
    return
  }

  if (active === last) {
    event.preventDefault()
    first.focus()
  }
}

function handleKeydown(event: KeyboardEvent): void {
  if (!props.isOpen) return

  if (event.key === 'Escape') {
    event.preventDefault()
    emitClose()
    return
  }

  if (event.key === 'Tab') {
    handleTabKey(event)
  }
}

watch(
    () => props.isOpen,
    async (isOpen) => {
      if (isOpen) {
        lastFocusedElement.value = document.activeElement as HTMLElement | null
        await nextTick()
        closeButtonRef.value?.focus()
        document.addEventListener('keydown', handleKeydown)
        return
      }

      document.removeEventListener('keydown', handleKeydown)
      await nextTick()
      lastFocusedElement.value?.focus()
    },
)
</script>

<style scoped>
.app-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 15, 15, 0.56);
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

.app-modal__close:hover,
.app-modal__close:focus-visible {
  background: #d45500;
  color: #ffffff;
}

.app-modal__close:active {
  transform: scale(0.96);
}

.app-modal__close:focus-visible,
.app-modal__card :deep(button:focus-visible),
.app-modal__card :deep(a:focus-visible),
.app-modal__card :deep(input:focus-visible),
.app-modal__card :deep(select:focus-visible),
.app-modal__card :deep(textarea:focus-visible) {
  outline: 2px solid #ff5b00;
  outline-offset: 2px;
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
  color: #444851;
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