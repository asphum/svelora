import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Timeline from './Timeline.svelte'

describe('Timeline', () => {
    // Helpers
    const getRoot = (container: Element) => container.firstElementChild as HTMLElement
    const getItems = (container: Element) =>
        getRoot(container).querySelectorAll('[data-state]') as NodeListOf<HTMLElement>
    const getIndicators = (container: Element) =>
        getRoot(container).querySelectorAll(
            '[class*="inline-flex"][class*="rounded-full"]'
        ) as NodeListOf<HTMLElement>
    const getSeparators = (container: Element) =>
        getRoot(container).querySelectorAll(
            '[class*="flex-1"][class*="rounded-full"]'
        ) as NodeListOf<HTMLElement>

    const basicItems = [
        { value: 1, title: 'Step 1' },
        { value: 2, title: 'Step 2' },
        { value: 3, title: 'Step 3' }
    ]

    const itemsWithIcons = [
        { value: 1, icon: 'lucide:check', title: 'Done' },
        { value: 2, icon: 'lucide:circle', title: 'Active' },
        { value: 3, icon: 'lucide:clock', title: 'Pending' }
    ]

    // ==================== RENDERING ====================

    describe('rendering', () => {
        it('should render root element', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            expect(getRoot(container)).not.toBeNull()
        })

        it('should render as div by default', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            expect(getRoot(container).tagName).toBe('DIV')
        })

        it('should render as custom element', async () => {
            const { container } = await render(Timeline, { items: basicItems, as: 'section' })
            expect(getRoot(container).tagName).toBe('SECTION')
        })

        it('should render correct number of items', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 2 })
            expect(getItems(container).length).toBe(3)
        })

        it('should render indicators for each item', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            const indicators = getIndicators(container)
            expect(indicators.length).toBeGreaterThanOrEqual(basicItems.length)
        })

        it('should render separators between items', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 1 })
            const separators = getSeparators(container)
            // Should have n-1 separators for n items
            expect(separators.length).toBe(basicItems.length - 1)
        })

        it('should render item titles', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            expect(container.textContent).toContain('Step 1')
            expect(container.textContent).toContain('Step 2')
            expect(container.textContent).toContain('Step 3')
        })

        it('should render item dates', async () => {
            const items = [
                { value: 1, title: 'Event', date: 'Jan 1' },
                { value: 2, title: 'Event 2', date: 'Jan 2' }
            ]
            const { container } = await render(Timeline, { items })
            expect(container.textContent).toContain('Jan 1')
            expect(container.textContent).toContain('Jan 2')
        })

        it('should render item descriptions', async () => {
            const items = [{ value: 1, title: 'Step', description: 'First step description' }]
            const { container } = await render(Timeline, { items })
            expect(container.textContent).toContain('First step description')
        })

        it('should have flex class on root', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            expect(getRoot(container).className).toContain('flex')
        })
    })

    // ==================== STATE MANAGEMENT ====================

    describe('state management', () => {
        it('should mark items as pending when no value', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            const items = getItems(container)
            items.forEach((item) => {
                expect(item.getAttribute('data-state')).toBe('pending')
            })
        })

        it('should mark item as active when value matches', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 2 })
            const items = getItems(container)
            expect(items[1].getAttribute('data-state')).toBe('active')
        })

        it('should mark items before active as completed', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 2 })
            const items = getItems(container)
            expect(items[0].getAttribute('data-state')).toBe('completed')
        })

        it('should mark items after active as pending', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 2 })
            const items = getItems(container)
            expect(items[2].getAttribute('data-state')).toBe('pending')
        })

        it('should handle first item as active', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 1 })
            const items = getItems(container)
            expect(items[0].getAttribute('data-state')).toBe('active')
            expect(items[1].getAttribute('data-state')).toBe('pending')
            expect(items[2].getAttribute('data-state')).toBe('pending')
        })

        it('should handle last item as active', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 3 })
            const items = getItems(container)
            expect(items[0].getAttribute('data-state')).toBe('completed')
            expect(items[1].getAttribute('data-state')).toBe('completed')
            expect(items[2].getAttribute('data-state')).toBe('active')
        })

        it('should handle string values', async () => {
            const items = [
                { value: 'start', title: 'Start' },
                { value: 'middle', title: 'Middle' },
                { value: 'end', title: 'End' }
            ]
            const { container } = await render(Timeline, { items, value: 'middle' })
            const itemElements = getItems(container)
            expect(itemElements[0].getAttribute('data-state')).toBe('completed')
            expect(itemElements[1].getAttribute('data-state')).toBe('active')
            expect(itemElements[2].getAttribute('data-state')).toBe('pending')
        })
    })

    // ==================== REVERSE ====================

    describe('reverse', () => {
        it('should not change state logic when reversed', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 2,
                reverse: true
            })
            const items = getItems(container)
            // State logic stays the same: items before active = completed, items after = pending
            expect(items[0].getAttribute('data-state')).toBe('completed')
            expect(items[1].getAttribute('data-state')).toBe('active')
            expect(items[2].getAttribute('data-state')).toBe('pending')
        })

        it('should keep same states as non-reversed with value 1', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                reverse: true
            })
            const items = getItems(container)
            expect(items[0].getAttribute('data-state')).toBe('active')
            expect(items[1].getAttribute('data-state')).toBe('pending')
            expect(items[2].getAttribute('data-state')).toBe('pending')
        })

        it('should keep same states as non-reversed with value 3', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 3,
                reverse: true
            })
            const items = getItems(container)
            expect(items[0].getAttribute('data-state')).toBe('completed')
            expect(items[1].getAttribute('data-state')).toBe('completed')
            expect(items[2].getAttribute('data-state')).toBe('active')
        })
    })

    // ==================== COLORS ====================

    describe('colors', () => {
        it('should default to primary color', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 1 })
            const indicators = getIndicators(container)
            // Active/completed indicators should have primary styles
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-primary')
        })

        it('should apply secondary color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'secondary'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-secondary')
        })

        it('should apply tertiary color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'tertiary'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-tertiary')
        })

        it('should apply success color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'success'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-success')
        })

        it('should apply warning color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'warning'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-warning')
        })

        it('should apply error color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'error'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-error')
        })

        it('should apply info color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'info'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-info')
        })

        it('should apply surface color', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                color: 'surface'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain(
                'group-data-[state=completed]:bg-inverse-surface'
            )
        })
    })

    // ==================== SIZES ====================

    describe('sizes', () => {
        it('should apply md size by default', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-8')
        })

        it('should apply 3xs size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: '3xs' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-4')
        })

        it('should apply 2xs size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: '2xs' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-5')
        })

        it('should apply xs size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: 'xs' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-6')
        })

        it('should apply sm size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: 'sm' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-7')
        })

        it('should apply lg size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: 'lg' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-9')
        })

        it('should apply xl size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: 'xl' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-10')
        })

        it('should apply 2xl size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: '2xl' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-11')
        })

        it('should apply 3xl size', async () => {
            const { container } = await render(Timeline, { items: basicItems, size: '3xl' })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-12')
        })
    })

    // ==================== ORIENTATION ====================

    describe('orientation', () => {
        it('should be vertical by default', async () => {
            const { container } = await render(Timeline, { items: basicItems })
            expect(getRoot(container).className).toContain('flex-col')
        })

        it('should apply horizontal orientation', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                orientation: 'horizontal'
            })
            expect(getRoot(container).className).toContain('flex-row')
            expect(getRoot(container).className).toContain('w-full')
        })

        it('should apply vertical separator width', async () => {
            const { container } = await render(Timeline, { items: basicItems, value: 1 })
            const separators = getSeparators(container)
            if (separators.length > 0) {
                expect(separators[0].className).toContain('w-0.5')
            }
        })

        it('should apply horizontal separator height', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                orientation: 'horizontal',
                value: 1
            })
            const separators = getSeparators(container)
            if (separators.length > 0) {
                expect(separators[0].className).toContain('h-0.5')
            }
        })
    })

    // ==================== ICONS ====================

    describe('icons', () => {
        it('should render with icons without crashing', async () => {
            const { container } = await render(Timeline, { items: itemsWithIcons })
            expect(getRoot(container)).not.toBeNull()
            expect(container.textContent).toContain('Done')
        })

        it('should render indicators for items with icons', async () => {
            const { container } = await render(Timeline, { items: itemsWithIcons })
            const indicators = getIndicators(container)
            expect(indicators.length).toBeGreaterThanOrEqual(itemsWithIcons.length)
        })
    })

    // ==================== AVATARS ====================

    describe('avatars', () => {
        it('should render with avatars without crashing', async () => {
            const items = [
                {
                    avatar: { src: 'https://example.com/avatar.jpg', alt: 'User' },
                    title: 'User action'
                }
            ]
            const { container } = await render(Timeline, { items })
            expect(getRoot(container)).not.toBeNull()
            expect(container.textContent).toContain('User action')
        })

        it('should render avatar without src (fallback)', async () => {
            const items = [{ avatar: { alt: 'JD' }, title: 'John Doe' }]
            const { container } = await render(Timeline, { items })
            expect(getRoot(container)).not.toBeNull()
            expect(container.textContent).toContain('John Doe')
        })
    })

    // ==================== CUSTOM CLASS ====================

    describe('custom class', () => {
        it('should apply custom class to root', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                class: 'my-timeline'
            })
            expect(getRoot(container).className).toContain('my-timeline')
        })

        it('should merge custom class with variant classes', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                class: 'my-timeline',
                orientation: 'horizontal'
            })
            const root = getRoot(container)
            expect(root.className).toContain('my-timeline')
            expect(root.className).toContain('flex-row')
        })
    })

    // ==================== ITEM CLASS ====================

    describe('item class', () => {
        it('should apply custom class to individual items', async () => {
            const items = [
                { value: 1, title: 'Step 1', class: 'custom-item-class' },
                { value: 2, title: 'Step 2' }
            ]
            const { container } = await render(Timeline, { items, value: 1 })
            const itemElements = getItems(container)
            expect(itemElements[0].className).toContain('custom-item-class')
        })
    })

    // ==================== UI SLOT OVERRIDES ====================

    describe('ui slot overrides', () => {
        it('should apply ui.root class', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                ui: { root: 'custom-root' }
            })
            expect(getRoot(container).className).toContain('custom-root')
        })

        it('should apply ui.item class', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                ui: { item: 'custom-item' }
            })
            const items = getItems(container)
            expect(items[0].className).toContain('custom-item')
        })

        it('should apply ui.indicator class', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                ui: { indicator: 'custom-indicator' }
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('custom-indicator')
        })

        it('should apply ui.separator class', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 1,
                ui: { separator: 'custom-separator' }
            })
            const separators = getSeparators(container)
            if (separators.length > 0) {
                expect(separators[0].className).toContain('custom-separator')
            }
        })

        it('should apply ui.title class', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                ui: { title: 'custom-title' }
            })
            const titles = container.querySelectorAll('.custom-title')
            expect(titles.length).toBeGreaterThan(0)
        })

        it('should apply ui.date class', async () => {
            const items = [{ value: 1, title: 'Event', date: 'Jan 1' }]
            const { container } = await render(Timeline, { items, ui: { date: 'custom-date' } })
            expect(container.querySelector('.custom-date')).not.toBeNull()
        })

        it('should apply ui.description class', async () => {
            const items = [{ value: 1, title: 'Event', description: 'Desc' }]
            const { container } = await render(Timeline, {
                items,
                ui: { description: 'custom-desc' }
            })
            expect(container.querySelector('.custom-desc')).not.toBeNull()
        })
    })

    // ==================== HTML ATTRIBUTES ====================

    describe('html attributes', () => {
        it('should pass through HTML attributes', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                id: 'my-timeline',
                title: 'Timeline'
            })
            const root = getRoot(container)
            expect(root.getAttribute('id')).toBe('my-timeline')
            expect(root.getAttribute('title')).toBe('Timeline')
        })

        it('should apply data attributes', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                'data-testid': 'timeline-1'
            } as Record<string, unknown>)
            expect(getRoot(container).getAttribute('data-testid')).toBe('timeline-1')
        })
    })

    // ==================== EMPTY STATE ====================

    describe('empty state', () => {
        it('should render empty root when no items', async () => {
            const { container } = await render(Timeline, { items: [] })
            const root = getRoot(container)
            expect(root).not.toBeNull()
            expect(getItems(container).length).toBe(0)
        })

        it('should render with single item', async () => {
            const items = [{ value: 1, title: 'Only item' }]
            const { container } = await render(Timeline, { items, value: 1 })
            expect(getItems(container).length).toBe(1)
            expect(container.textContent).toContain('Only item')
        })
    })

    // ==================== COMBINED FEATURES ====================

    describe('combined features', () => {
        it('should render with color, size, and orientation', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 2,
                color: 'success',
                size: 'lg',
                orientation: 'horizontal'
            })
            const root = getRoot(container)
            const indicators = getIndicators(container)
            expect(root.className).toContain('flex-row')
            expect(indicators[0].className).toContain('size-9')
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-success')
        })

        it('should render horizontal with reverse', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 2,
                orientation: 'horizontal',
                reverse: true
            })
            const items = getItems(container)
            // Reverse only affects visual direction, not state logic
            expect(items[0].getAttribute('data-state')).toBe('completed')
            expect(items[1].getAttribute('data-state')).toBe('active')
            expect(items[2].getAttribute('data-state')).toBe('pending')
        })

        it('should render with icons, color, and size', async () => {
            const { container } = await render(Timeline, {
                items: itemsWithIcons,
                value: 2,
                color: 'error',
                size: 'xl'
            })
            const indicators = getIndicators(container)
            expect(indicators[0].className).toContain('size-10')
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-error')
        })

        it('should render with multiple ui overrides', async () => {
            const { container } = await render(Timeline, {
                items: basicItems,
                value: 2,
                ui: {
                    root: 'custom-root',
                    item: 'custom-item',
                    indicator: 'custom-indicator'
                }
            })
            expect(getRoot(container).className).toContain('custom-root')
            expect(getItems(container)[0].className).toContain('custom-item')
            expect(getIndicators(container)[0].className).toContain('custom-indicator')
        })

        it('should handle all props together', async () => {
            const { container } = await render(Timeline, {
                items: itemsWithIcons,
                value: 2,
                color: 'tertiary',
                size: '2xl',
                orientation: 'vertical',
                reverse: false,
                class: 'my-timeline',
                ui: { root: 'ui-root' }
            })
            const root = getRoot(container)
            const indicators = getIndicators(container)
            const items = getItems(container)

            expect(root.className).toContain('my-timeline')
            expect(root.className).toContain('ui-root')
            expect(root.className).toContain('flex-col')
            expect(indicators[0].className).toContain('size-11')
            expect(indicators[0].className).toContain('group-data-[state=completed]:bg-tertiary')
            expect(items[0].getAttribute('data-state')).toBe('completed')
            expect(items[1].getAttribute('data-state')).toBe('active')
            expect(items[2].getAttribute('data-state')).toBe('pending')
        })
    })
})
