import { describe, expect, it } from 'vitest'
import { getReorderIndex, moveArrayItem } from './sortable-utils.js'

describe('sortable-utils', () => {
    it('moveArrayItem moves an entry to a new index', () => {
        expect(moveArrayItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a'])
        expect(moveArrayItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b'])
    })

    it('moveArrayItem returns the same array for invalid moves', () => {
        const items = ['a', 'b']
        expect(moveArrayItem(items, 0, 0)).toBe(items)
        expect(moveArrayItem(items, -1, 1)).toBe(items)
    })

    it('getReorderIndex finds the insertion index from pointer position', () => {
        const rects = [
            { id: 'a', start: 0, end: 40 },
            { id: 'b', start: 40, end: 80 },
            { id: 'c', start: 80, end: 120 }
        ]

        expect(getReorderIndex(10, rects, 'a', 'vertical')).toBe(0)
        expect(getReorderIndex(50, rects, 'a', 'vertical')).toBe(1)
        expect(getReorderIndex(110, rects, 'a', 'vertical')).toBe(2)
    })
})
