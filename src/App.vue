<template>
  <TheHeader />
  <div id="top">
    <HeaderPromo />
  </div>
  <Categories />
  <Benefits />
  <PopularProducts />
  <WhyUs />
  <Testimonials />
  <TrustedCompanies />
  <TelegramPromo />
  <Footer />
</template>

<script setup>
import TheHeader from '../src/components/sections/TheHeader.vue'
import HeaderPromo from './components/sections/HeaderPromo.vue'
import Categories from './components/sections/Categories.vue'
import Benefits from './components/sections/Benefits.vue'
import PopularProducts from './components/sections/PopularProducts.vue'
import WhyUs from './components/sections/WhyUs.vue'
import Testimonials from './components/sections/Testimonials.vue'
import TelegramPromo from './components/sections/TelegramPromo.vue'
import TrustedCompanies from './components/sections/TrustedCompanies.vue'
import Footer from './components/sections/Footer.vue'
</script>