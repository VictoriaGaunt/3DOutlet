<template>
  <label class="app-input-wrapper">
    <span v-if="label" class="app-input__label">{{ label }}</span>

    <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
        'app-input',
        {
          'is-disabled': disabled,
          'is-error': error,
        },
        customClass,
      ]"
        @input="onInput"
    />

    <span v-if="error" class="app-input__error">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  type?: string
  disabled?: boolean
  error?: string
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  type: 'text',
  disabled: false,
  error: '',
  customClass: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.app-input-wrapper {
  display: grid;
  gap: 6px;
}

.app-input__label {
  color: #1d232b;
  font-size: 13px;
  font-weight: 600;
}

.app-input {
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #d8d8dd;
  background: #ffffff;
  color: #1d232b;
  font-size: 14px;
  outline: none;
  transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
}

.app-input:focus {
  border-color: rgba(240, 127, 23, 0.55);
  box-shadow: 0 0 0 3px rgba(240, 127, 23, 0.12);
}

.app-input.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.app-input.is-error {
  border-color: #dc2626;
}

.app-input__error {
  color: #dc2626;
  font-size: 12px;
}
</style>