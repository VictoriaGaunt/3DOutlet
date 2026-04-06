import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CartPage from '@/pages/CartPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: CatalogPage,
        },
        {
            path: '/product/:id',
            name: 'product',
            component: ProductPage,
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage,
        },
    ],
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        return {
            top: 0,
            behavior: 'smooth',
        }
    },
})

export default router