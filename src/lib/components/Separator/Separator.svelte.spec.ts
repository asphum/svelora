import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Separator from './Separator.svelte'

describe('Separator', () => {
    // Helper to get border element
    const getBorder = (container: Element) =>
        container.firstElementChild?.firstElementChild as HTMLElement

    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render root element', async () => {
            const { container } = await render(Separator)
            expect(container.firstElementChild).not.toBeNull()
        })

        it('should have data-orientation attribute', async () => {
            const { container } = await render(Separator)
            const root = container.firstElementChild!
            expect(root.getAttribute('data-orientation')).toBe('horizontal')
        })

        it('should render border element', async () => {
            const { container } = await render(Separator)
            expect(getBorder(container)).not.toBeNull()
        })
    })

    // ==================== COLORS ====================

    describe('colors', () => {
        it('should default to surface color', async () => {
            const { container } = await render(Separator)
            expect(getBorder(container).className).toContain('border-outline-variant')
        })

        it('should apply primary color', async () => {
            const { container } = await render(Separator, { color: 'primary' })
            expect(getBorder(container).className).toContain('border-primary')
        })

        it('should apply secondary color', async () => {
            const { container } = await render(Separator, { color: 'secondary' })
            expect(getBorder(container).className).toContain('border-secondary')
        })

        it('should apply error color', async () => {
            const { container } = await render(Separator, { color: 'error' })
            expect(getBorder(container).className).toContain('border-error')
        })

        it('should apply success color', async () => {
            const { container } = await render(Separator, { color: 'success' })
            expect(getBorder(container).className).toContain('border-success')
        })
    })

    // ==================== TYPES ====================

    describe('types', () => {
        it('should apply solid type by default', async () => {
            const { container } = await render(Separator)
            expect(getBorder(container).className).toContain('border-solid')
        })

        it('should apply dashed type', async () => {
            const { container } = await render(Separator, { type: 'dashed' })
            expect(getBorder(container).className).toContain('border-dashed')
        })

        it('should apply dotted type', async () => {
            const { container } = await render(Separator, { type: 'dotted' })
            expect(getBorder(container).className).toContain('border-dotted')
        })
    })

    // ==================== ORIENTATION ====================

    describe('orientation', () => {
        it('should apply horizontal orientation by default', async () => {
            const { container } = await render(Separator)
            const root = container.firstElementChild!
            expect(root.className).toContain('flex-row')
            expect(root.getAttribute('data-orientation')).toBe('horizontal')
        })

        it('should apply vertical orientation', async () => {
            const { container } = await render(Separator, { orientation: 'vertical' })
            const root = container.firstElementChild!
            expect(root.className).toContain('flex-col')
            expect(root.getAttribute('data-orientation')).toBe('vertical')
        })
    })

    // ==================== SIZES ====================

    describe('sizes', () => {
        it('should apply xs size (border-t)', async () => {
            const { container } = await render(Separator, { size: 'xs' })
            expect(getBorder(container).className).toContain('border-t')
        })

        it('should apply md size (border-t-[3px])', async () => {
            const { container } = await render(Separator, { size: 'md' })
            expect(getBorder(container).className).toContain('border-t-')
        })

        it('should apply vertical size (border-s)', async () => {
            const { container } = await render(Separator, { orientation: 'vertical', size: 'xs' })
            expect(getBorder(container).className).toContain('border-s')
        })
    })

    // ==================== LABEL ====================

    describe('label', () => {
        it('should render label text', async () => {
            const { container } = await render(Separator, { label: 'OR' })
            expect(container.textContent).toContain('OR')
        })

        it('should render label in span', async () => {
            const { container } = await render(Separator, { label: 'Test' })
            const span = container.querySelector('span')
            expect(span).not.toBeNull()
            expect(span!.textContent).toBe('Test')
        })

        it('should render two borders when label present', async () => {
            const { container } = await render(Separator, { label: 'OR' })
            const root = container.firstElementChild!
            // root > border + container + border = 3 children
            expect(root.children.length).toBe(3)
        })

        it('should not render span when no label', async () => {
            const { container } = await render(Separator)
            expect(container.querySelector('span')).toBeNull()
        })
    })

    // ==================== ICON ====================

    describe('icon', () => {
        it('should render content when icon provided', async () => {
            const { container } = await render(Separator, { icon: 'lucide:star' })
            const root = container.firstElementChild!
            expect(root.children.length).toBeGreaterThan(1)
        })
    })

    // ==================== AVATAR ====================

    describe('avatar', () => {
        it('should render avatar', async () => {
            const { container } = await render(Separator, { avatar: { alt: 'User' } })
            expect(container.querySelector('[data-avatar-root]')).not.toBeNull()
        })
    })

    // ==================== DECORATIVE ====================

    describe('decorative', () => {
        it('should have role="separator" by default', async () => {
            const { container } = await render(Separator)
            const root = container.firstElementChild!
            expect(root.getAttribute('role')).toBe('separator')
        })

        it('should have role="none" when decorative', async () => {
            const { container } = await render(Separator, { decorative: true })
            const root = container.firstElementChild!
            expect(root.getAttribute('role')).toBe('none')
        })
    })

    // ==================== CUSTOM CLASS ====================

    describe('custom class', () => {
        it('should apply custom class', async () => {
            const { container } = await render(Separator, { class: 'my-separator' })
            expect(container.firstElementChild!.className).toContain('my-separator')
        })
    })

    // ==================== UI OVERRIDES ====================

    describe('ui slot overrides', () => {
        it('should apply ui.root class', async () => {
            const { container } = await render(Separator, { ui: { root: 'custom-root' } })
            expect(container.firstElementChild!.className).toContain('custom-root')
        })

        it('should apply ui.border class', async () => {
            const { container } = await render(Separator, { ui: { border: 'custom-border' } })
            expect(getBorder(container).className).toContain('custom-border')
        })

        it('should apply ui.label class', async () => {
            const { container } = await render(Separator, {
                label: 'Test',
                ui: { label: 'custom-label' }
            })
            expect(container.querySelector('.custom-label')).not.toBeNull()
        })
    })

    // ==================== POSITION ====================

    describe('position', () => {
        it('center (default) renders border, content, border', async () => {
            const { container } = await render(Separator, { label: 'OR' })
            const root = container.firstElementChild!
            expect(root.children.length).toBe(3)
            // middle child is the content container
            expect(root.children[1].textContent).toContain('OR')
        })

        it('start renders content first, then a single border', async () => {
            const { container } = await render(Separator, { label: 'OR', position: 'start' })
            const root = container.firstElementChild!
            expect(root.children.length).toBe(2)
            expect(root.children[0].textContent).toContain('OR')
        })

        it('end renders a single border, then content', async () => {
            const { container } = await render(Separator, { label: 'OR', position: 'end' })
            const root = container.firstElementChild!
            expect(root.children.length).toBe(2)
            expect(root.children[1].textContent).toContain('OR')
        })

        it('ignores position when there is no content (single border)', async () => {
            const { container } = await render(Separator, { position: 'start' })
            const root = container.firstElementChild!
            expect(root.children.length).toBe(1)
        })
    })

    // ==================== COMBINED ====================

    describe('combined', () => {
        it('should render with all options', async () => {
            const { container } = await render(Separator, {
                label: 'Section',
                color: 'primary',
                type: 'dashed',
                size: 'md'
            })
            expect(container.textContent).toContain('Section')
            const border = getBorder(container)
            expect(border.className).toContain('border-primary')
            expect(border.className).toContain('border-dashed')
        })
    })
})
