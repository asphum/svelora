import { describe, expect, it } from 'vitest'
import { type CodeBlockVariantProps, codeBlockDefaults } from './code-block.variants.js'

describe('code-block.variants', () => {
    it('should have outline as default variant', () => {
        expect(codeBlockDefaults.defaultVariants.variant).toBe('outline')
    })

    it('should have md as default size', () => {
        expect(codeBlockDefaults.defaultVariants.size).toBe('md')
    })

    it('should export variant type with all expected values', () => {
        const validVariants: NonNullable<CodeBlockVariantProps['variant']>[] = [
            'outline',
            'soft',
            'subtle',
            'solid',
            'ghost',
            'none'
        ]
        expect(validVariants).toHaveLength(6)
    })

    it('should export size type with all expected values', () => {
        const validSizes: NonNullable<CodeBlockVariantProps['size']>[] = ['sm', 'md', 'lg']
        expect(validSizes).toHaveLength(3)
    })
})

