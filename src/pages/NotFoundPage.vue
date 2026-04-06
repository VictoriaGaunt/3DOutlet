<template>
  <main class="not-found-page">
    <div class="not-found-page__card">
      <div class="not-found-page__code">404</div>
      <h1 class="not-found-page__title">Страница не найдена</h1>
      <p class="not-found-page__text">
        Похоже, такой страницы не существует или она была перемещена.
      </p>

      <RouterLink to="/" class="not-found-page__link">
        Вернуться на главную
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f3f3f3;
}

.not-found-page__card {
  width: 100%;
  max-width: 560px;
  padding: 32px 24px;
  border-radius: 28px;
  background: #ffffff;
  text-align: center;
  border: 1px solid rgba(17, 17, 17, 0.06);
}

.not-found-page__code {
  color: #ff5b00;
  font-size: 64px;
  line-height: 1;
  font-weight: 800;
}

.not-found-page__title {
  margin: 14px 0 0;
  color: #1d232b;
  font-size: 32px;
  font-weight: 800;
}

.not-found-page__text {
  margin: 14px 0 0;
  color: #616871;
  font-size: 16px;
  line-height: 1.6;
}

.not-found-page__link {
  margin-top: 22px;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  background: #ff5b00;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
</style>