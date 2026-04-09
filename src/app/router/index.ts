import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CartPage from '@/pages/CartPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import ComparePage from '@/pages/ComparePage.vue'
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
            props: (route) => ({
                id: Number(route.params.id),
            }),
            meta: {
                overlay: true,
            },
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage,
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: FavoritesPage,
        },
        {
            path: '/compare',
            name: 'compare',
            component: ComparePage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }

        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }

        const opensOverlay =
            to.meta.overlay === true &&
            (from.name === 'catalog' || from.name === 'home')

        if (opensOverlay) {
            return false
        }

        return {
            top: 0,
            behavior: 'smooth',
        }
    },
})

export default router