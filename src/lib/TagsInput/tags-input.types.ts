import type { HTMLAttributes } from 'svelte/elements'

export interface TagsInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
    /**
     * Array of tag strings.
     */
    value?: string[]

    /**
     * Placeholder text for the input field.
     */
    placeholder?: string

    /**
     * Whether the input is disabled.
     */
    disabled?: boolean

    /**
     * Maximum number of tags allowed.
     */
    maxTags?: number

    /**
     * Array of characters that trigger tag creation.
     * @default [',', 'Enter']
     */
    separators?: string[]

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Event fired when tags change.
     */
    onchange?: (tags: string[]) => void
}
