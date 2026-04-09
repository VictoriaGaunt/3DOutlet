<template>
  <component
      :is="tag"
      :to="to"
      :type="tag === 'button' ? nativeType : undefined"
      :disabled="disabled"
      :aria-disabled="disabled ? 'true' : undefined"
      :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
      {
        'is-block': block,
        'is-disabled': disabled,
      },
      customClass,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type NativeButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string | null
  nativeType?: NativeButtonType
  disabled?: boolean
  block?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  to: null,
  nativeType: 'button',
  disabled: false,
  block: false,
  customClass: '',
})

const tag = computed(() => (props.to ? 'router-link' : 'button'))
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease,
      box-shadow 0.2s ease;
}

.app-button:hover {
  text-decoration: none;
}

.app-button:active {
  transform: scale(0.98);
}

.app-button:focus-visible {
  outline: 2px solid #ff5b00;
  outline-offset: 2px;
}

.app-button.is-block {
  width: 100%;
}

.app-button.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.app-button--sm {
  min-height: 36px;
  padding: 0 12px;
  font-size: 13px;
}

.app-button--md {
  min-height: 42px;
  padding: 0 16px;
  font-size: 14px;
}

.app-button--lg {
  min-height: 46px;
  padding: 0 18px;
  font-size: 15px;
}

.app-button--default,
.app-button--secondary {
  background: #ebebee;
  color: #1b1b1b;
}

.app-button--default:hover,
.app-button--default:focus-visible,
.app-button--secondary:hover,
.app-button--secondary:focus-visible {
  background: #d45500;
  color: #ffffff;
}

.app-button--primary {
  background: #ff5b00;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(255, 91, 0, 0.14);
}

.app-button--primary:hover,
.app-button--primary:focus-visible {
  background: #c94700;
}

.app-button--ghost {
  background: transparent;
  color: #1b1b1b;
  border: 1px solid rgba(17, 17, 17, 0.18);
}

.app-button--ghost:hover,
.app-button--ghost:focus-visible {
  background: rgba(240, 127, 23, 0.08);
  color: #b84800;
  border-color: rgba(240, 127, 23, 0.34);
}
</style>