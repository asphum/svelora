import { describe, expect, it, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import CodeBlock from './CodeBlock.svelte'

type ClipboardMock = {
    writeText: (text: string) => Promise<void>
}

function mockClipboard(impl?: ClipboardMock['writeText']): ClipboardMock {
    const writeText =
        impl ?? (vi.fn(async () => undefined) as unknown as ClipboardMock['writeText'])

    const clipboard: ClipboardMock = { writeText }
    Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: clipboard
    })
    return clipboard
}

describe('CodeBlock', () => {
    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render the root element', async () => {
            const { container } = await render(CodeBlock, { code: '<div />' })
            const root = page.elementLocator(container.firstElementChild!)
            await expect.element(root).toBeInTheDocument()
        })

        it('should render title', async () => {
            render(CodeBlock, { title: 'Snippet', code: 'const x = 1' })
            await expect.element(page.getByText('Snippet')).toBeInTheDocument()
        })

        it('should render default title "Code"', async () => {
            render(CodeBlock, { code: 'const x = 1' })
            await expect.element(page.getByText('Code')).toBeInTheDocument()
        })

        it('should render Copy button', async () => {
            render(CodeBlock, { code: 'const x = 1' })
            await expect.element(page.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
        })
    })

    // ==================== COPY ====================

    describe('copy', () => {
        it('should disable copy when code is empty', async () => {
            render(CodeBlock, { code: '' })
            const button = page.getByRole('button', { name: 'Copy' })
            expect((button.element() as HTMLButtonElement).disabled).toBe(true)
        })

        it('should disable copy when copyable=false', async () => {
            render(CodeBlock, { code: 'const x = 1', copyable: false })
            const button = page.getByRole('button', { name: 'Copy' })
            expect((button.element() as HTMLButtonElement).disabled).toBe(true)
        })

        it('should use copyText when provided', async () => {
            const clipboard = mockClipboard()
            const writeSpy = vi.spyOn(clipboard, 'writeText')

            render(CodeBlock, { code: 'visible', copyText: 'copied' })
            await page.getByRole('button', { name: 'Copy' }).click()

            await vi.waitFor(() => {
                expect(writeSpy).toHaveBeenCalledWith('copied')
            })
        })

        it('should copy code by default', async () => {
            const clipboard = mockClipboard()
            const writeSpy = vi.spyOn(clipboard, 'writeText')

            render(CodeBlock, { code: 'const x = 1' })
            await page.getByRole('button', { name: 'Copy' }).click()

            await vi.waitFor(() => {
                expect(writeSpy).toHaveBeenCalledWith('const x = 1')
            })
        })

        it('should show "Copied" when write succeeds', async () => {
            mockClipboard()
            render(CodeBlock, { code: 'const x = 1' })
            await page.getByRole('button', { name: 'Copy' }).click()
            await expect.element(page.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
        })

        it('should show "Failed" when write throws', async () => {
            mockClipboard(async () => {
                throw new Error('No permission')
            })
            render(CodeBlock, { code: 'const x = 1' })
            await page.getByRole('button', { name: 'Copy' }).click()
            await expect.element(page.getByRole('button', { name: 'Failed' })).toBeInTheDocument()
        })
    })

    // ==================== VARIANTS ====================

    describe('variants', () => {
        it('should render with variant="ghost"', async () => {
            const { container } = await render(CodeBlock, { code: 'x', variant: 'ghost' })
            const root = page.elementLocator(container.firstElementChild!)
            await expect.element(root).toBeInTheDocument()
        })

        it('should render with size="sm"', async () => {
            const { container } = await render(CodeBlock, { code: 'x', size: 'sm' })
            const root = page.elementLocator(container.firstElementChild!)
            await expect.element(root).toBeInTheDocument()
        })
    })
})
