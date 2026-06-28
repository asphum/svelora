import internalToast from './internal/french-toast/core/toast.js'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { page } from 'vitest/browser'
import { cleanup, render } from 'vitest-browser-svelte'
import Toaster from './Toaster.svelte'

async function fireToastAndGetToaster() {
    internalToast('Test toast')
    await vi.waitFor(
        () => {
            const el = document.querySelector('[data-svelora-toaster]')
            if (!el) throw new Error('Toaster not found')
            return el
        },
        { timeout: 3000 }
    )
    return page.elementLocator(document.querySelector('[data-svelora-toaster]')!)
}

describe('Toaster', () => {
    afterEach(() => {
        internalToast.dismiss()
        cleanup()
        document
            .querySelectorAll('[data-svelora-toaster]')
            .forEach((el) => el.closest('section')?.remove())
    })

    describe('rendering', () => {
        it('should render the toaster element after a toast is fired', async () => {
            render(Toaster)
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toBeInTheDocument()
        })

        it('should render with default position bottom-right', async () => {
            render(Toaster)
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveAttribute('data-x-position', 'right')
            await expect.element(toaster).toHaveAttribute('data-y-position', 'bottom')
        })
    })

    describe('variant class', () => {
        it('should apply outline variant class by default', async () => {
            render(Toaster)
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveClass(/ps-toast-outline/)
        })

        it('should apply soft variant class', async () => {
            render(Toaster, { variant: 'soft' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveClass(/ps-toast-soft/)
        })

        it('should apply subtle variant class', async () => {
            render(Toaster, { variant: 'subtle' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveClass(/ps-toast-subtle/)
        })

        it('should apply solid variant class', async () => {
            render(Toaster, { variant: 'solid' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveClass(/ps-toast-solid/)
        })

        it('should apply accent variant class', async () => {
            render(Toaster, { variant: 'accent' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveClass(/ps-toast-accent/)
        })
    })

    describe('position', () => {
        it('should apply top-left position', async () => {
            render(Toaster, { position: 'top-left' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveAttribute('data-x-position', 'left')
            await expect.element(toaster).toHaveAttribute('data-y-position', 'top')
        })

        it('should apply top-center position', async () => {
            render(Toaster, { position: 'top-center' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveAttribute('data-x-position', 'center')
            await expect.element(toaster).toHaveAttribute('data-y-position', 'top')
        })

        it('should apply bottom-left position', async () => {
            render(Toaster, { position: 'bottom-left' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveAttribute('data-x-position', 'left')
            await expect.element(toaster).toHaveAttribute('data-y-position', 'bottom')
        })
    })

    describe('custom class', () => {
        it('should apply custom class alongside variant class', async () => {
            render(Toaster, { class: 'my-custom-toaster' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveClass(/my-custom-toaster/)
            await expect.element(toaster).toHaveClass(/ps-toast-outline/)
        })
    })

    describe('props forwarding', () => {
        it('should forward theme prop', async () => {
            render(Toaster, { theme: 'dark' })
            const toaster = await fireToastAndGetToaster()
            await expect.element(toaster).toHaveAttribute('data-svelora-theme', 'dark')
        })
    })
})
