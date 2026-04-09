import { httpClient } from './http'
import { categories as mockCategories } from '@/data/categories'
import type { Category } from '@/types'

const CATEGORIES_API_PATH = '/api/categories'

type ApiMode = 'mock' | 'remote'

function getApiMode(): ApiMode {
    const mode = import.meta.env.VITE_API_MODE?.trim().toLowerCase()
    return mode === 'remote' ? 'remote' : 'mock'
}

async function getMockCategories(): Promise<Category[]> {
    return Promise.resolve([...mockCategories])
}

export const categoriesApi = {
    async getCategories(): Promise<Category[]> {
        if (getApiMode() === 'mock') {
            return getMockCategories()
        }

        return httpClient.get<Category[]>(CATEGORIES_API_PATH)
    },
}