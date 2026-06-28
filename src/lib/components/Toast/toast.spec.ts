import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

vi.mock('./internal/french-toast/core/toast.js', () => {
    const fn = Object.assign(vi.fn(), {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
        loading: vi.fn(),
        promise: vi.fn(),
        dismiss: vi.fn(),
        custom: vi.fn(),
        message: vi.fn()
    })
    return { default: fn }
})

vi.mock('svelte', async (importOriginal) => {
    const original = await importOriginal<typeof import('svelte')>()
    return {
        ...original,
        mount: vi.fn(() => ({})),
        unmount: vi.fn()
    }
})

import internalToast from './internal/french-toast/core/toast.js'
import { toast } from './toast.js'

const mockFrenchToast = internalToast as unknown as Mock & {
    success: Mock
    error: Mock
    warning: Mock
    info: Mock
    loading: Mock
    promise: Mock
    dismiss: Mock
    custom: Mock
    message: Mock
}

describe('toast wrapper', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('basic forwarding', () => {
        it('should forward message and options to french-toast', () => {
            toast('Hello')
            expect(mockFrenchToast).toHaveBeenCalledWith('Hello', undefined)
        })

        it('should forward description option', () => {
            toast('Title', { description: 'Desc' })
            expect(mockFrenchToast).toHaveBeenCalledWith(
                'Title',
                expect.objectContaining({ description: 'Desc' })
            )
        })

        it('should forward typed methods', () => {
            toast.success('OK')
            expect(mockFrenchToast.success).toHaveBeenCalledWith('OK', undefined)

            toast.error('Fail')
            expect(mockFrenchToast.error).toHaveBeenCalledWith('Fail', undefined)

            toast.warning('Warn')
            expect(mockFrenchToast.warning).toHaveBeenCalledWith('Warn', undefined)

            toast.info('Info')
            expect(mockFrenchToast.info).toHaveBeenCalledWith('Info', undefined)

            toast.loading('Loading')
            expect(mockFrenchToast.loading).toHaveBeenCalledWith('Loading', undefined)
        })
    })

    describe('color option', () => {
        it('should inject ps-color-{color} class', () => {
            toast('Test', { color: 'primary' })
            expect(mockFrenchToast).toHaveBeenCalledWith(
                'Test',
                expect.objectContaining({ className: 'ps-color-primary' })
            )
        })

        it('should preserve existing class alongside color class', () => {
            toast('Test', { color: 'tertiary', class: 'my-class' })
            expect(mockFrenchToast).toHaveBeenCalledWith(
                'Test',
                expect.objectContaining({ className: 'my-class ps-color-tertiary' })
            )
        })

        it('should work with typed methods', () => {
            toast.success('OK', { color: 'secondary' })
            expect(mockFrenchToast.success).toHaveBeenCalledWith(
                'OK',
                expect.objectContaining({ className: 'ps-color-secondary' })
            )
        })

        it('should not add color class when color is not provided', () => {
            toast('Test', { description: 'Desc' })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(call?.className).toBeUndefined()
        })
    })

    describe('icon option', () => {
        it('should convert string icon to a component', () => {
            toast('Test', { icon: 'lucide:rocket' })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(typeof call?.icon).toBe('function')
        })

        it('should pass null icon through', () => {
            toast.success('Test', { icon: null })
            const call = mockFrenchToast.success.mock.calls[0][1]
            expect(call?.icon).toBeNull()
        })

        it('should not set icon when not provided', () => {
            toast('Test', { description: 'Desc' })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(call?.icon).toBeUndefined()
        })
    })

    describe('avatar option', () => {
        it('should convert avatar to a component in icon slot', () => {
            toast('Test', { avatar: { src: '/img.jpg', alt: 'User' } })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(typeof call?.icon).toBe('function')
        })

        it('should prioritize avatar over icon', () => {
            toast('Test', { avatar: { alt: 'User' }, icon: 'lucide:rocket' })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(typeof call?.icon).toBe('function')
        })
    })

    describe('combined options', () => {
        it('should handle color + icon together', () => {
            toast('Test', { color: 'warning', icon: 'lucide:shield' })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(call?.className).toBe('ps-color-warning')
            expect(typeof call?.icon).toBe('function')
        })

        it('should handle color + avatar together', () => {
            toast('Test', { color: 'info', avatar: { src: '/a.jpg', alt: 'A' } })
            const call = mockFrenchToast.mock.calls[0][1]
            expect(call?.className).toBe('ps-color-info')
            expect(typeof call?.icon).toBe('function')
        })

        it('should strip color/icon/avatar from resolved options', () => {
            toast('Test', { color: 'primary', icon: 'lucide:x', description: 'D' })
            const call = mockFrenchToast.mock.calls[0][1] as Record<string, unknown>
            expect(call).not.toHaveProperty('color')
            expect(call).not.toHaveProperty('avatar')
            expect(call).toHaveProperty('description', 'D')
        })
    })

    describe('dismissible option', () => {
        it('should set infinite duration and hide close button when dismissible is false', () => {
            toast('Test', { dismissible: false })
            expect(mockFrenchToast).toHaveBeenCalledWith(
                'Test',
                expect.objectContaining({
                    duration: Number.POSITIVE_INFINITY,
                    closeButton: false
                })
            )
        })
    })

    describe('passthrough methods', () => {
        it('should pass through dismiss', () => {
            toast.dismiss()
            expect(mockFrenchToast.dismiss).toHaveBeenCalled()
        })

        it('should resolve promise options including color', () => {
            const p = Promise.resolve()
            toast.promise(p, { loading: 'L', success: 'S', error: 'E' }, { color: 'primary' })
            expect(mockFrenchToast.promise).toHaveBeenCalledWith(
                p,
                { loading: 'L', success: 'S', error: 'E' },
                expect.objectContaining({ className: 'ps-color-primary' })
            )
        })

        it('should resolve nested promise phase options', () => {
            const p = Promise.resolve()
            toast.promise(
                p,
                { loading: 'L', success: 'S', error: 'E' },
                { success: { color: 'success' }, error: { color: 'error' } }
            )
            expect(mockFrenchToast.promise).toHaveBeenCalledWith(
                p,
                { loading: 'L', success: 'S', error: 'E' },
                expect.objectContaining({
                    success: expect.objectContaining({ className: 'ps-color-success' }),
                    error: expect.objectContaining({ className: 'ps-color-error' })
                })
            )
        })
    })
})
