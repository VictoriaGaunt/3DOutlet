<template>
  <TheHeader />
  <div id="top">
    <HeaderPromo />
  </div>
  <CategoriesSection />
  <BenefitsSection />
  <PopularProductsSection />
  <WhyUsSection />
  <TestimonialsSection />
  <TrustedCompaniesSection />
  <TelegramPromoSection />
  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from '@/components/header/TheHeader.vue'
import HeaderPromo from '@/components/sections/HeaderPromo.vue'
import CategoriesSection from '@/components/sections/CategoriesSection.vue'
import BenefitsSection from '@/components/sections/BenefitsSection.vue'
import PopularProductsSection from '@/components/sections/PopularProductsSection.vue'
import WhyUsSection from '@/components/sections/WhyUsSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import TrustedCompaniesSection from '@/components/sections/TrustedCompaniesSection.vue'
import TelegramPromoSection from '@/components/sections/TelegramPromoSection.vue'
import TheFooter from '@/components/sections/TheFooter.vue'
</script>