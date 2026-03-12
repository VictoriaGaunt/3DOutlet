<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal" @click.self="$emit('close')">
      <div class="modal__card">
        <button class="modal__close" type="button" @click="$emit('close')">
          ×
        </button>

        <div class="modal__content">
          <h3 class="modal__title">{{ title }}</h3>
          <p class="modal__text">{{ description }}</p>

          <div class="modal__actions">
            <button class="modal__button" type="button" @click="$emit('close')">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})

defineEmits(['close'])
</script>

<style scoped>
.modal {
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

.modal__card {
  position: relative;
  width: 100%;
  max-width: 480px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 20px 50px rgba(17, 17, 17, 0.18);
  overflow: hidden;
}

.modal__content {
  padding: 28px 24px 24px;
}

.modal__close {
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
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.modal__close:hover {
  background: #f07f17;
  color: #ffffff;
}

.modal__close:active {
  transform: scale(0.96);
}

.modal__title {
  margin: 0 0 10px;
  font-size: 24px;
  line-height: 1.2;
  font-weight: 700;
  color: #1b1b1b;
}

.modal__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #52525b;
}

.modal__actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.modal__button {
  min-width: 140px;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: #ebebee;
  color: #1b1b1b;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.modal__button:hover {
  background: #f07f17;
  color: #ffffff;
}

.modal__button:active {
  background: #d96809;
  color: #ffffff;
  transform: scale(0.98);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal__card,
.modal-fade-leave-to .modal__card {
  transform: translateY(10px) scale(0.98);
}

.modal-fade-enter-to .modal__card,
.modal-fade-leave-from .modal__card {
  transform: translateY(0) scale(1);
}
</style>