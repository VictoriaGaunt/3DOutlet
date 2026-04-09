import { httpClient } from './http'
import { testimonials as mockTestimonials } from '@/data/testimonials'

const TESTIMONIALS_API_PATH = '/api/testimonials'

type ApiMode = 'mock' | 'remote'

function getApiMode(): ApiMode {
    const mode = import.meta.env.VITE_API_MODE?.trim().toLowerCase()
    return mode === 'remote' ? 'remote' : 'mock'
}

export interface Testimonial {
    id: number
    name: string
    company?: string
    role?: string
    rating: number
    text: string
}

async function getMockTestimonials(): Promise<Testimonial[]> {
    return Promise.resolve([...mockTestimonials])
}

export const testimonialsApi = {
    async getTestimonials(): Promise<Testimonial[]> {
        if (getApiMode() === 'mock') {
            return getMockTestimonials()
        }

        return httpClient.get<Testimonial[]>(TESTIMONIALS_API_PATH)
    },
}