<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { setContext } from 'svelte'
    import type { ChatBubbleProps } from './chat.types.js'
    import { chatVariants } from './chat.variants.js'

    let {
        position = 'start',
        name,
        time,
        class: className,
        avatar,
        children,
        ...restProps
    }: ChatBubbleProps = $props()

    let styles = $derived(chatVariants({ position }))

    // Provide position context to child ChatMessage components for proper rounded corners
    setContext('chat-bubble-position', () => position)
</script>

<div class={twMerge(styles.bubbleBase() as string, className as string)} {...restProps}>
    {#if avatar}
        <div class={styles.bubbleAvatar()}>
            {@render avatar()}
        </div>
    {/if}
    
    <div class={styles.bubbleContent()}>
        {#if name || time}
            <div class={styles.bubbleHeader()}>
                {#if name}
                    <span class={styles.bubbleName()}>{name}</span>
                {/if}
                {#if time}
                    <span class={styles.bubbleTime()}>{time}</span>
                {/if}
            </div>
        {/if}
        {@render children?.()}
    </div>
</div>
