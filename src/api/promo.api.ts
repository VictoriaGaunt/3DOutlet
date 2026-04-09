import { httpClient } from './http'
import { promoSlides as mockPromoSlides } from '@/data/promoSlides'
import type { PromoSlide } from '@/types'

const PROMO_API_PATH = '/api/promo-slides'

type ApiMode = 'mock' | 'remote'

function getApiMode(): ApiMode {
    const mode = import.meta.env.VITE_API_MODE?.trim().toLowerCase()
    return mode === 'remote' ? 'remote' : 'mock'
}

async function getMockPromoSlides(): Promise<PromoSlide[]> {
    return Promise.resolve([...mockPromoSlides])
}

export const promoApi = {
    async getPromoSlides(): Promise<PromoSlide[]> {
        if (getApiMode() === 'mock') {
            return getMockPromoSlides()
        }

        return httpClient.get<PromoSlide[]>(PROMO_API_PATH)
    },
}