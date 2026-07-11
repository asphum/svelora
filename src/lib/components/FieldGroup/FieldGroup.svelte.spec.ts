import { createRawSnippet } from 'svelte'
import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import FieldGroup from './FieldGroup.svelte'

function snippet(html: string) {
    return createRawSnippet(() => ({
        render: () => html,
        setup: () => {}
    }))
}

describe('FieldGroup', () => {
    const getRoot = (container: Element) => container.firstElementChild as HTMLElement

    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render the root element', async () => {
            const { container } = await render(FieldGroup)
            const root = page.elementLocator(getRoot(container))
            await expect.element(root).toBeInTheDocument()
        })

        it('should render as div by default', async () => {
            const { container } = await render(FieldGroup)
            expect(getRoot(container).tagName).toBe('DIV')
        })

        it('should apply base root class', async () => {
            const { container } = await render(FieldGroup)
            expect(getRoot(container).className).toContain('relative')
        })

        it('should render children content', async () => {
            const { container } = await render(FieldGroup, {
                children: snippet('<button>Click</button>')
            })
            expect(container.textContent).toContain('Click')
        })

        it('should render nothing when no children provided', async () => {
            const { container } = await render(FieldGroup)
            expect(getRoot(container).children.length).toBe(0)
        })

        it('should render multiple children', async () => {
            const { container } = await render(FieldGroup, {
                children: snippet(
                    '<div><button>A</button><button>B</button><button>C</button></div>'
                )
            })
            const buttons = container.querySelectorAll('button')
            expect(buttons.length).toBe(3)
        })
    })

    // ==================== AS PROP ====================

    describe('as prop', () => {
        it('should render as section element', async () => {
            const { container } = await render(FieldGroup, { as: 'section' })
            expect(getRoot(container).tagName).toBe('SECTION')
        })

        it('should render as span element', async () => {
            const { container } = await render(FieldGroup, { as: 'span' })
            expect(getRoot(container).tagName).toBe('SPAN')
        })

        it('should render as nav element', async () => {
            const { container } = await render(FieldGroup, { as: 'nav' })
            expect(getRoot(container).tagName).toBe('NAV')
        })
    })

    // ==================== ORIENTATION ====================

    describe('orientation', () => {
        it('should default to horizontal orientation', async () => {
            const { container } = await render(FieldGroup)
            const root = getRoot(container)
            expect(root.className).toContain('inline-flex')
            expect(root.className).toContain('-space-x-px')
        })

        it('should set data-orientation to horizontal by default', async () => {
            const { container } = await render(FieldGroup)
            expect(getRoot(container).getAttribute('data-orientation')).toBe('horizontal')
        })

        it('should apply horizontal orientation classes', async () => {
            const { container } = await render(FieldGroup, { orientation: 'horizontal' })
            const root = getRoot(container)
            expect(root.className).toContain('inline-flex')
            expect(root.className).toContain('-space-x-px')
        })

        it('should apply vertical orientation classes', async () => {
            const { container } = await render(FieldGroup, { orientation: 'vertical' })
            const root = getRoot(container)
            expect(root.className).toContain('flex')
            expect(root.className).toContain('flex-col')
            expect(root.className).toContain('-space-y-px')
        })

        it('should set data-orientation to vertical', async () => {
            const { container } = await render(FieldGroup, { orientation: 'vertical' })
            expect(getRoot(container).getAttribute('data-orientation')).toBe('vertical')
        })

        it('should not apply vertical classes when horizontal', async () => {
            const { container } = await render(FieldGroup, { orientation: 'horizontal' })
            const root = getRoot(container)
            expect(root.className).not.toContain('flex-col')
            expect(root.className).not.toContain('-space-y-px')
        })

        it('should not apply horizontal spacing when vertical', async () => {
            const { container } = await render(FieldGroup, { orientation: 'vertical' })
            expect(getRoot(container).className).not.toContain('-space-x-px')
        })
    })

    // ==================== SIZE ====================

    describe('size', () => {
        const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

        for (const size of sizes) {
            it(`should accept size="${size}" without error`, async () => {
                const { container } = await render(FieldGroup, { size })
                expect(getRoot(container)).not.toBeNull()
            })
        }

        it('should default to md size', async () => {
            const { container } = await render(FieldGroup)
            expect(getRoot(container)).not.toBeNull()
        })
    })

    // ==================== CUSTOM CLASS ====================

    describe('custom class', () => {
        it('should apply custom class to root', async () => {
            const { container } = await render(FieldGroup, { class: 'my-group' })
            expect(getRoot(container).className).toContain('my-group')
        })

        it('should merge custom class with variant classes', async () => {
            const { container } = await render(FieldGroup, { class: 'my-group' })
            const root = getRoot(container)
            expect(root.className).toContain('my-group')
            expect(root.className).toContain('relative')
            expect(root.className).toContain('inline-flex')
        })
    })

    // ==================== UI SLOT OVERRIDES ====================

    describe('ui slot overrides', () => {
        it('should apply ui.root class', async () => {
            const { container } = await render(FieldGroup, { ui: { root: 'custom-root' } })
            expect(getRoot(container).className).toContain('custom-root')
        })

        it('should merge ui.root with base classes', async () => {
            const { container } = await render(FieldGroup, { ui: { root: 'custom-root' } })
            const root = getRoot(container)
            expect(root.className).toContain('custom-root')
            expect(root.className).toContain('relative')
        })
    })

    // ==================== HTML ATTRIBUTES ====================

    describe('html attributes', () => {
        it('should pass through HTML attributes', async () => {
            const { container } = await render(FieldGroup, {
                id: 'my-field-group',
                title: 'Field group'
            })
            const root = getRoot(container)
            expect(root.getAttribute('id')).toBe('my-field-group')
            expect(root.getAttribute('title')).toBe('Field group')
        })

        it('should apply role attribute', async () => {
            const { container } = await render(FieldGroup, { role: 'group' })
            expect(getRoot(container).getAttribute('role')).toBe('group')
        })

        it('should apply aria attributes', async () => {
            const { container } = await render(FieldGroup, { 'aria-label': 'Button group' })
            expect(getRoot(container).getAttribute('aria-label')).toBe('Button group')
        })
    })

    // ==================== COMBINED FEATURES ====================

    describe('combined features', () => {
        it('should apply vertical orientation with custom class', async () => {
            const { container } = await render(FieldGroup, {
                orientation: 'vertical',
                class: 'my-vertical-group'
            })
            const root = getRoot(container)
            expect(root.className).toContain('flex-col')
            expect(root.className).toContain('-space-y-px')
            expect(root.className).toContain('my-vertical-group')
            expect(root.getAttribute('data-orientation')).toBe('vertical')
        })

        it('should apply custom element with orientation and ui override', async () => {
            const { container } = await render(FieldGroup, {
                as: 'section',
                orientation: 'vertical',
                ui: { root: 'gap-2' }
            })
            const root = getRoot(container)
            expect(root.tagName).toBe('SECTION')
            expect(root.className).toContain('flex-col')
            expect(root.className).toContain('gap-2')
            expect(root.getAttribute('data-orientation')).toBe('vertical')
        })

        it('should render horizontal group with children and correct structure', async () => {
            const { container } = await render(FieldGroup, {
                orientation: 'horizontal',
                children: snippet(
                    '<div><button>A</button><button>B</button><button>C</button></div>'
                )
            })
            const root = getRoot(container)
            const buttons = container.querySelectorAll('button')
            expect(root.className).toContain('inline-flex')
            expect(root.className).toContain('-space-x-px')
            expect(root.getAttribute('data-orientation')).toBe('horizontal')
            expect(buttons.length).toBe(3)
        })

        it('should render vertical group with children', async () => {
            const { container } = await render(FieldGroup, {
                orientation: 'vertical',
                children: snippet('<div><button>A</button><button>B</button></div>')
            })
            const root = getRoot(container)
            const buttons = container.querySelectorAll('button')
            expect(root.className).toContain('flex-col')
            expect(root.className).toContain('-space-y-px')
            expect(buttons.length).toBe(2)
        })

        it('should apply all props together', async () => {
            const { container } = await render(FieldGroup, {
                as: 'nav',
                orientation: 'vertical',
                size: 'lg',
                class: 'my-nav',
                ui: { root: 'shadow-md' },
                role: 'group',
                'aria-label': 'Navigation group',
                children: snippet('<button>Item</button>')
            })
            const root = getRoot(container)
            expect(root.tagName).toBe('NAV')
            expect(root.className).toContain('flex-col')
            expect(root.className).toContain('my-nav')
            expect(root.className).toContain('shadow-md')
            expect(root.getAttribute('data-orientation')).toBe('vertical')
            expect(root.getAttribute('role')).toBe('group')
            expect(root.getAttribute('aria-label')).toBe('Navigation group')
            expect(container.querySelectorAll('button').length).toBe(1)
        })
    })
})
