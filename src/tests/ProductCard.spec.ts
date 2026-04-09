import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useCartStore } from '@/shared/cartStore'
import { testProduct } from './helpers'

describe('ProductCard', () => {
    it('adds product to cart when buy button is clicked', async () => {
        const cartStore = useCartStore()
        cartStore.clearCart()

        const wrapper = mount(ProductCard, {
            props: {
                product: testProduct,
            },
            global: {
                stubs: {
                    AppBadge: {
                        template: '<span><slot /></span>',
                    },
                    AppButton: {
                        template: '<button class="app-button-stub"><slot /></button>',
                    },
                    AppContainer: {
                        template: '<div><slot /></div>',
                    },
                },
            },
        })

        const buyButton = wrapper.find('.app-button-stub')
        await buyButton.trigger('click')
        await nextTick()

        expect(cartStore.getQty(testProduct.id)).toBe(1)
    })

    it('emits open when image button is clicked', async () => {
        const wrapper = mount(ProductCard, {
            props: {
                product: testProduct,
            },
            global: {
                stubs: {
                    AppBadge: {
                        template: '<span><slot /></span>',
                    },
                    AppButton: {
                        template: '<button class="app-button-stub"><slot /></button>',
                    },
                    AppContainer: {
                        template: '<div><slot /></div>',
                    },
                },
            },
        })

        const imageButton = wrapper.find('.product-card__image-wrap')
        await imageButton.trigger('click')

        expect(wrapper.emitted('open')).toBeTruthy()
        expect(wrapper.emitted('open')?.[0]).toEqual([testProduct])
    })
})