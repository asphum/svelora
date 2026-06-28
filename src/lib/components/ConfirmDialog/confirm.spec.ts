import { describe, expect, it, vi } from 'vitest'
import { confirmDialog, registerConfirmDialog } from './confirm.js'

describe('confirmDialog', () => {
    it('resolves false when not registered', async () => {
        registerConfirmDialog(null)
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

        await expect(confirmDialog.show({ title: 'Test' })).resolves.toBe(false)
        expect(warn).toHaveBeenCalled()

        warn.mockRestore()
    })

    it('delegates to the registered show function', async () => {
        const show = vi.fn().mockResolvedValue(true)
        registerConfirmDialog(show)

        await expect(confirmDialog.show({ title: 'Save?' })).resolves.toBe(true)
        expect(show).toHaveBeenCalledWith({ title: 'Save?' })

        registerConfirmDialog(null)
    })

    it('applies delete defaults', async () => {
        const show = vi.fn().mockResolvedValue(false)
        registerConfirmDialog(show)

        await confirmDialog.delete({ title: 'Remove file?' })

        expect(show).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Remove file?',
                icon: 'warning',
                confirmColor: 'error'
            })
        )

        registerConfirmDialog(null)
    })
})
