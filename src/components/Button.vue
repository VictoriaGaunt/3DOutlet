<template>
  <component
      :is="to ? 'router-link' : 'button'"
      :to="to"
      :class="[
      'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200',
      variantClasses,
      customClass
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'default' },
  to: { type: String, default: null },
  customClass: { type: String, default: '' }
})

const variantClasses = computed(() => {
  if (props.variant === 'primary') {
    return 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
  }
  return 'bg-transparent text-gray-700 hover:bg-orange-500 hover:text-white active:bg-orange-700 active:text-white'
})
</script>