import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CatalogPage from '@/pages/CatalogPage.vue'
import { testProduct, secondTestProduct, thirdTestProduct } from './helpers'

const fetchProductsMock = vi.fn()

vi.mock('@/composables/useCart', () => ({
    useCart: () => ({
        add: vi.fn(),
        formatPrice: (value: number) => String(value),
    }),
}))

vi.mock('@/composables/useProducts', () => ({
    useProducts: () => ({
        products: {
            value: [testProduct, secondTestProduct, thirdTestProduct],
        },
        isLoading: {
            value: false,
        },
        error: {
            value: null,
        },
        fetchProducts: fetchProductsMock,
    }),
}))

describe('CatalogPage', () => {
    beforeEach(() => {
        fetchProductsMock.mockReset()
    })

    it('calls fetchProducts on mount', async () => {
        mount(CatalogPage, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        })

        expect(fetchProductsMock).toHaveBeenCalled()
    })

    it('calls fetchProducts with search query', async () => {
        vi.useFakeTimers()

        const wrapper = mount(CatalogPage, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        })

        fetchProductsMock.mockClear()

        const input = wrapper.find('input')
        await input.setValue('Bambu')

        vi.advanceTimersByTime(300)

        expect(fetchProductsMock).toHaveBeenCalledWith(
            expect.objectContaining({
                search: 'Bambu',
            }),
        )

        vi.useRealTimers()
    })

    it('calls fetchProducts with selected sort', async () => {
        const wrapper = mount(CatalogPage, {
            global: {
                stubs: {
                    RouterLink: {
                        template: '<a><slot /></a>',
                    },
                },
            },
        })

        fetchProductsMock.mockClear()

        const selects = wrapper.findAll('select')
        await selects[1].setValue('price-desc')

        expect(fetchProductsMock).toHaveBeenCalledWith(
            expect.objectContaining({
                sortBy: 'price',
                order: 'desc',
            }),
        )
    })
})