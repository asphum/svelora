<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { getContext } from 'svelte'
    import type { ChatMessageProps } from './chat.types.js'
    import { chatVariants, type ChatVariantProps } from './chat.variants.js'

    let {
        variant = 'surface',
        position: propPosition,
        class: className,
        children,
        ...restProps
    }: ChatMessageProps = $props()

    const getPositionContext = getContext<() => ChatVariantProps['position']>('chat-bubble-position')
    let position = $derived(propPosition ?? (getPositionContext ? getPositionContext() : 'start'))

    let styles = $derived(chatVariants({ variant, position }))
</script>

<div class={twMerge(styles.messageBase() as string, className as string)} {...restProps}>
    {@render children?.()}
</div>
