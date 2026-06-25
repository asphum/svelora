<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import type { TagsInputProps } from './tags-input.types.js'
    import { tagsInputVariants } from './tags-input.variants.js'

    let {
        value = $bindable([]),
        placeholder = 'Add a tag...',
        disabled = false,
        maxTags,
        separators = [',', 'Enter'],
        class: className,
        onchange,
        ...restProps
    }: TagsInputProps = $props()

    let styles = $derived(tagsInputVariants({ disabled }))
    
    let inputValue = $state('')
    let inputRef = $state<HTMLInputElement | null>(null)

    function addTag(tag: string) {
        const t = tag.trim()
        if (!t) return
        if (maxTags && value.length >= maxTags) return
        if (value.includes(t)) return // Prevent duplicates (optional, could be configurable)

        value = [...value, t]
        inputValue = ''
        onchange?.(value)
    }

    function removeTag(index: number) {
        if (disabled) return
        value = value.filter((_, i) => i !== index)
        onchange?.(value)
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (disabled) return

        // Backspace to remove last tag if input is empty
        if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
            removeTag(value.length - 1)
            return
        }

        // Add tag on separator
        if (separators.includes(e.key)) {
            e.preventDefault()
            addTag(inputValue)
        }
    }

    // Also handle pasting comma-separated values
    function handlePaste(e: ClipboardEvent) {
        if (disabled) return
        const pasteData = e.clipboardData?.getData('text')
        if (pasteData) {
            e.preventDefault()
            const tags = pasteData.split(separators.includes(',') ? ',' : '\n').map(t => t.trim()).filter(Boolean)
            
            let newTags = [...value]
            for (const t of tags) {
                if (maxTags && newTags.length >= maxTags) break
                if (!newTags.includes(t)) {
                    newTags.push(t)
                }
            }
            
            if (newTags.length !== value.length) {
                value = newTags
                onchange?.(value)
            }
        }
    }

    function handleContainerClick() {
        if (!disabled && inputRef) {
            inputRef.focus()
        }
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class={twMerge(styles.base() as any, className)} 
    onclick={handleContainerClick}
    {...restProps}
>
    {#each value as tag, i}
        <span class={styles.tag() as any}>
            <span class={styles.tagText() as any}>{tag}</span>
            <button
                type="button"
                class={styles.removeButton() as any}
                onclick={(e) => {
                    e.stopPropagation()
                    removeTag(i)
                }}
                {disabled}
                aria-label={`Remove tag ${tag}`}
            >
                <Icon name="lucide:x" class="w-3 h-3" />
            </button>
        </span>
    {/each}

    {#if !maxTags || value.length < maxTags}
        <input
            bind:this={inputRef}
            bind:value={inputValue}
            type="text"
            {placeholder}
            {disabled}
            class={styles.input() as any}
            onkeydown={handleKeyDown}
            onpaste={handlePaste}
            onblur={() => addTag(inputValue)}
        />
    {/if}
</div>
