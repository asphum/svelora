<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import type { ChatInputProps } from './chat.types.js'
    import { chatVariants } from './chat.variants.js'

    let {
        value = $bindable(''),
        placeholder = 'Type a message...',
        disabled = false,
        class: className,
        leading,
        trailing,
        ...restProps
    }: ChatInputProps = $props()

    let styles = $derived(chatVariants())

    // Auto-resize textarea function could be added here
    function autoResize(node: HTMLTextAreaElement) {
        function resize() {
            node.style.height = 'auto'
            node.style.height = node.scrollHeight + 'px'
        }
        node.addEventListener('input', resize)
        // Initial resize
        setTimeout(resize, 0)
        return {
            destroy() {
                node.removeEventListener('input', resize)
            }
        }
    }
</script>

<div class={twMerge(styles.inputBase() as string, className as string)} {...restProps}>
    {#if leading}
        <div class={styles.inputActions()}>
            {@render leading()}
        </div>
    {/if}

    <div class={styles.inputFieldWrapper()}>
        <textarea
            bind:value
            {placeholder}
            {disabled}
            rows="1"
            use:autoResize
            class={styles.inputField()}
            onkeydown={(e) => {
                // If you want Shift+Enter for new line, and Enter to submit:
                // if (e.key === 'Enter' && !e.shiftKey) {
                //     e.preventDefault()
                //     // Dispatch submit event
                // }
            }}
        ></textarea>
    </div>

    {#if trailing}
        <div class={styles.inputActions()}>
            {@render trailing()}
        </div>
    {/if}
</div>
