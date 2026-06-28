import { describe, expect, it } from 'vitest'
import { useDragDrop } from './useDragDrop.svelte.js'

describe('useDragDrop', () => {
    it('is exported as a factory function', () => {
        expect(useDragDrop).toBeTypeOf('function')
    })
})
