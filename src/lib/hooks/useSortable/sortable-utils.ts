export function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
    if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= items.length ||
        toIndex >= items.length
    ) {
        return items
    }

    const next = [...items]
    const [removed] = next.splice(fromIndex, 1)
    next.splice(toIndex, 0, removed)
    return next
}

export function getReorderIndex(
    pointer: number,
    rects: Array<{ id: string | number; start: number; end: number }>,
    activeId: string | number,
    axis: 'vertical' | 'horizontal'
): number {
    const activeIndex = rects.findIndex((rect) => rect.id === activeId)
    if (activeIndex === -1) return activeIndex

    const midpoint = (rect: { start: number; end: number }) => (rect.start + rect.end) / 2

    for (let index = 0; index < rects.length; index++) {
        const rect = rects[index]
        if (pointer < midpoint(rect)) {
            return index
        }
    }

    return rects.length - 1
}

export function measureSortableRects(
    container: HTMLElement,
    axis: 'vertical' | 'horizontal'
): Array<{ id: string | number; start: number; end: number; element: HTMLElement }> {
    const items = Array.from(
        container.querySelectorAll<HTMLElement>('[data-sortable-item][data-sortable-id]')
    )

    return items.map((element) => {
        const rect = element.getBoundingClientRect()
        const id = element.dataset.sortableId!

        if (axis === 'horizontal') {
            return { id, start: rect.left, end: rect.right, element }
        }

        return { id, start: rect.top, end: rect.bottom, element }
    })
}
