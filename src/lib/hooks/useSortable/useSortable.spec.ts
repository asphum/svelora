import { describe, expect, it } from 'vitest'
import { moveArrayItem } from './sortable-utils.js'

describe('sortable-utils', () => {
    it('moveArrayItem moves an entry to a new index', async () => {
        expect(moveArrayItem(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a'])
        expect(moveArrayItem(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b'])
    })

    it('moveArrayItem returns the same array for invalid moves', async () => {
        const items = ['a', 'b']
        expect(moveArrayItem(items, 0, 0)).toBe(items)
        expect(moveArrayItem(items, -1, 1)).toBe(items)
    })
})
