import { describe, expect, it } from 'vitest'
import { moveArrayItem, resolveSortableDropIndex } from './sortable-utils.js'

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

    it('resolveSortableDropIndex matches sveltednd before/after semantics', () => {
        expect(resolveSortableDropIndex(0, '2', 'before')).toBe(1)
        expect(resolveSortableDropIndex(0, '2', 'after')).toBe(2)
        expect(resolveSortableDropIndex(2, '0', 'before')).toBe(0)
        expect(resolveSortableDropIndex(2, '0', 'after')).toBe(1)
    })
})
