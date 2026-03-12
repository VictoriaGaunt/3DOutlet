<template>
  <div class="base-card" :class="customClass">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.base-card {
  border-radius: 24px;
  background: #f8f8f8;
  border: 1px solid rgba(17, 17, 17, 0.04);
}
</style>