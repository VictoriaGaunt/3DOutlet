import { describe, expect, it } from 'vitest'
import { useLocalStorage } from '@/composables/useLocalStorage'

describe('useLocalStorage', () => {
    it('reads default value when storage is empty', () => {
        const state = useLocalStorage('test-key', { count: 1 })

        expect(state.value).toEqual({ count: 1 })
    })

    it('writes value to localStorage', async () => {
        const state = useLocalStorage('test-key', { count: 1 })

        state.value = { count: 5 }

        await Promise.resolve()

        expect(localStorage.getItem('test-key')).toBe(JSON.stringify({ count: 5 }))
    })

    it('reads stored value from localStorage', () => {
        localStorage.setItem('test-key', JSON.stringify({ count: 7 }))

        const state = useLocalStorage('test-key', { count: 1 })

        expect(state.value).toEqual({ count: 7 })
    })
})