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

export function resolveSortableDropIndex(
    dragIndex: number,
    targetContainer: string | null,
    dropPosition: 'before' | 'after' | null
): number | null {
    let dropIndex = Number.parseInt(targetContainer ?? '', 10)
    if (Number.isNaN(dropIndex)) return null
    if (dropPosition === 'after') dropIndex += 1
    const adjusted = dragIndex < dropIndex ? dropIndex - 1 : dropIndex
    return adjusted
}
