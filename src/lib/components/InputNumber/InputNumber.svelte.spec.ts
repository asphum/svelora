import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import InputNumber from './InputNumber.svelte'

describe('InputNumber', () => {
    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render the root element', async () => {
            const { container } = await render(InputNumber)
            const root = page.elementLocator(container.firstElementChild!)
            await expect.element(root).toBeInTheDocument()
        })

        it('should render increment and decrement buttons', async () => {
            const { container } = await render(InputNumber)
            const buttons = container.querySelectorAll('button')
            expect(buttons).toHaveLength(2)
        })

        it('should render a number input', async () => {
            const { container } = await render(InputNumber)
            const input = container.querySelector('input[type="number"]')
            expect(input).not.toBeNull()
        })
    })

    // ==================== DEFAULT VALUES ====================

    describe('default values', () => {
        it('should have value 0 by default', async () => {
            const { container } = await render(InputNumber)
            const input = container.querySelector('input') as HTMLInputElement
            expect(Number(input.value)).toBe(0)
        })

        it('should have step 1 by default', async () => {
            const { container } = await render(InputNumber)
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.step).toBe('1')
        })
    })

    // ==================== PROPS ====================

    describe('props', () => {
        it('should render with provided value', async () => {
            const { container } = await render(InputNumber, { value: 5 })
            const input = container.querySelector('input') as HTMLInputElement
            expect(Number(input.value)).toBe(5)
        })

        it('should forward min attribute to input', async () => {
            const { container } = await render(InputNumber, { min: 0 })
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.min).toBe('0')
        })

        it('should forward max attribute to input', async () => {
            const { container } = await render(InputNumber, { max: 100 })
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.max).toBe('100')
        })

        it('should forward step attribute to input', async () => {
            const { container } = await render(InputNumber, { step: 5 })
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.step).toBe('5')
        })

        it('should forward placeholder attribute to input', async () => {
            const { container } = await render(InputNumber, { placeholder: 'Enter value' })
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.placeholder).toBe('Enter value')
        })
    })

    // ==================== DISABLED ====================

    describe('disabled', () => {
        it('should disable the input when disabled prop is true', async () => {
            const { container } = await render(InputNumber, { disabled: true })
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.disabled).toBe(true)
        })

        it('should disable the buttons when disabled prop is true', async () => {
            const { container } = await render(InputNumber, { disabled: true })
            const buttons = container.querySelectorAll('button')
            for (const btn of buttons) {
                expect(btn.disabled).toBe(true)
            }
        })
    })

    // ==================== VARIANTS ====================

    describe('variants', () => {
        it('should apply size variant classes', async () => {
            const { container } = await render(InputNumber, { size: 'lg' })
            const input = page.elementLocator(container.querySelector('input')!)
            await expect.element(input).toHaveClass(/py-2.5/)
        })

        it('should apply highlight class when highlight is true', async () => {
            const { container } = await render(InputNumber, { highlight: true, color: 'error' })
            const input = page.elementLocator(container.querySelector('input')!)
            await expect.element(input).toHaveClass(/ring-error/)
        })
    })

    // ==================== UI OVERRIDES ====================

    describe('ui overrides', () => {
        it('should apply custom class to root via ui.root', async () => {
            const { container } = await render(InputNumber, { ui: { root: 'custom-root' } })
            const root = page.elementLocator(container.firstElementChild!)
            await expect.element(root).toHaveClass('custom-root')
        })

        it('should apply custom class to input via ui.input', async () => {
            const { container } = await render(InputNumber, { ui: { input: 'custom-input' } })
            const input = page.elementLocator(container.querySelector('input')!)
            await expect.element(input).toHaveClass('custom-input')
        })
    })

    // ==================== ACCESSIBILITY ====================

    describe('accessibility', () => {
        it('decrement button should have aria-label', async () => {
            const { container } = await render(InputNumber)
            const decBtn = container.querySelectorAll('button')[0]
            expect(decBtn.getAttribute('aria-label')).toBe('Decrease value')
        })

        it('increment button should have aria-label', async () => {
            const { container } = await render(InputNumber)
            const incBtn = container.querySelectorAll('button')[1]
            expect(incBtn.getAttribute('aria-label')).toBe('Increase value')
        })

        it('input should have aria-label', async () => {
            const { container } = await render(InputNumber)
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.getAttribute('aria-label')).toBe('Number input')
        })
    })
})
