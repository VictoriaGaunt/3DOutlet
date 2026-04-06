<template>
  <span
      :class="[
      'app-badge',
      `app-badge--${variant}`,
      `app-badge--${size}`,
      customClass,
    ]"
  >
    <slot>{{ label }}</slot>
  </span>
</template>

<script setup lang="ts">
type BadgeVariant = 'default' | 'info' | 'success' | 'warning'
type BadgeSize = 'sm' | 'md'

interface Props {
  label?: string
  variant?: BadgeVariant
  size?: BadgeSize
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  variant: 'info',
  size: 'sm',
  customClass: '',
})
</script>

<style scoped>
.app-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
}

.app-badge--sm {
  min-width: 34px;
  height: 18px;
  padding: 0 8px;
  font-size: 10px;
  line-height: 18px;
}

.app-badge--md {
  min-width: 42px;
  height: 22px;
  padding: 0 10px;
  font-size: 11px;
  line-height: 22px;
}

.app-badge--default {
  background: #ebebee;
  color: #1b1b1b;
}

.app-badge--info {
  background: #dff5ff;
  color: #1b8fd8;
}

.app-badge--success {
  background: #e4f8ea;
  color: #1f9d55;
}

.app-badge--warning {
  background: #fff1df;
  color: #e67a00;
}
</style>