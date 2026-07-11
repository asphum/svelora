import { describe, expect, it } from 'vitest'
import { useDragDrop } from './useDragDrop.svelte.js'

describe('useDragDrop', () => {
    it('is exported as a factory function', async () => {
        expect(useDragDrop).toBeTypeOf('function')
    })
})
