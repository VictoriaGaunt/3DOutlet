<template>
  <div class="product-gallery">
    <div class="product-gallery__main">
      <img
          :src="activeImage"
          :alt="title"
          class="product-gallery__image"
      />
    </div>

    <div v-if="images.length > 1" class="product-gallery__thumbs">
      <button
          v-for="image in images"
          :key="image"
          type="button"
          class="product-gallery__thumb"
          :class="{ 'is-active': image === activeImage }"
          @click="activeImage = image"
      >
        <img :src="image" :alt="title" class="product-gallery__thumb-image" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  images: string[]
  title: string
}

const props = defineProps<Props>()

const activeImage = ref(props.images[0] ?? '')

watch(
    () => props.images,
    (nextImages) => {
      activeImage.value = nextImages[0] ?? ''
    },
    { immediate: true },
)
</script>

<style scoped>
.product-gallery {
  display: grid;
  gap: 12px;
}

.product-gallery__main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 420px;
  border-radius: 24px;
  background: #f8f8f8;
  overflow: hidden;
}

.product-gallery__image {
  width: 100%;
  max-width: 420px;
  height: 360px;
  object-fit: contain;
}

.product-gallery__thumbs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.product-gallery__thumb {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  border: 1px solid rgba(17, 17, 17, 0.08);
  background: #ffffff;
  padding: 6px;
  cursor: pointer;
}

.product-gallery__thumb.is-active {
  border-color: #ff5b00;
}

.product-gallery__thumb-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 640px) {
  .product-gallery__main {
    min-height: 280px;
    border-radius: 20px;
  }

  .product-gallery__image {
    height: 240px;
  }
}
</style>