import { httpClient } from './http'
import { asset } from '@/utils/asset'

const COMPANIES_API_PATH = '/api/companies'

type ApiMode = 'mock' | 'remote'

function getApiMode(): ApiMode {
    const mode = import.meta.env.VITE_API_MODE?.trim().toLowerCase()
    return mode === 'remote' ? 'remote' : 'mock'
}

export interface Company {
    id: number
    name: string
    href: string
    logo: string
}

const mockCompanies: Company[] = [
    {
        id: 1,
        name: 'Сколково',
        href: 'https://sk.ru/',
        logo: asset('testimonials1.png'),
    },
    {
        id: 2,
        name: 'Яндекс',
        href: 'https://yandex.ru/',
        logo: asset('testimonials2.png'),
    },
    {
        id: 3,
        name: 'Ozon Фармацевтика',
        href: 'https://www.ozonpharm.ru/',
        logo: asset('testimonials3.png'),
    },
    {
        id: 4,
        name: 'Все Инструменты',
        href: 'https://www.vseinstrumenti.ru/',
        logo: asset('testimonials4.png'),
    },
    {
        id: 5,
        name: 'ЭФКО',
        href: 'https://www.efko.ru/',
        logo: asset('testimonials5.png'),
    },
    {
        id: 6,
        name: 'Автоваз',
        href: 'https://www.lada.ru/',
        logo: asset('testimonials6.png'),
    },
]

async function getMockCompanies(): Promise<Company[]> {
    return Promise.resolve([...mockCompanies])
}

export const companiesApi = {
    async getCompanies(): Promise<Company[]> {
        if (getApiMode() === 'mock') {
            return getMockCompanies()
        }

        return httpClient.get<Company[]>(COMPANIES_API_PATH)
    },
}