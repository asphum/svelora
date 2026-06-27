import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { CodeBlockVariantProps, CodeBlockSlots } from './code-block.variants.js'

export type CodeBlockProps = {
    title?: string
    code?: string
    copyText?: string
    copyable?: boolean
    html?: string
    variant?: NonNullable<CodeBlockVariantProps['variant']>
    size?: NonNullable<CodeBlockVariantProps['size']>
    class?: ClassNameValue
    ui?: Partial<Record<CodeBlockSlots, ClassNameValue>>
    children?: Snippet
}
