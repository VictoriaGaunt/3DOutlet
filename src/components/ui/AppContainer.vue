<template>
  <component
      :is="tag"
      :class="[
      'app-container',
      `app-container--${variant}`,
      {
        'is-hoverable': hoverable,
        'is-fluid': fluid,
      },
      customClass,
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type ContainerTag = 'div' | 'section' | 'article' | 'aside'
type ContainerVariant = 'card' | 'plain'

interface Props {
  tag?: ContainerTag
  variant?: ContainerVariant
  hoverable?: boolean
  fluid?: boolean
  customClass?: string
}

withDefaults(defineProps<Props>(), {
  tag: 'div',
  variant: 'card',
  hoverable: false,
  fluid: false,
  customClass: '',
})
</script>

<style scoped>
.app-container {
  width: 100%;
}

.app-container--card {
  border-radius: 24px;
  background: #f8f8f8;
  border: 1px solid rgba(17, 17, 17, 0.04);
}

.app-container--plain {
  background: transparent;
  border: 0;
}

.app-container.is-hoverable {
  transition:
      transform 0.2s ease,
      box-shadow 0.25s ease,
      background-color 0.25s ease;
}

.app-container.is-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(17, 17, 17, 0.06);
  background: #fbfbfb;
}

.app-container.is-fluid {
  border-radius: 0;
}
</style>