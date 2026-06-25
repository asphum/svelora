import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { ChatVariantProps } from './chat.variants.js'

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Position of the chat bubble (start for receiver, end for sender).
     * @default 'start'
     */
    position?: ChatVariantProps['position']

    /**
     * Name of the sender.
     */
    name?: string

    /**
     * Timestamp of the message.
     */
    time?: string

    /**
     * Snippet for the avatar element.
     */
    avatar?: Snippet

    /**
     * The actual chat messages.
     */
    children?: Snippet
}

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Style variant of the message bubble.
     */
    variant?: ChatVariantProps['variant']

    /**
     * Position inheritance (used internally for rounded corners).
     * Automatically inherited from ChatBubble if used within it.
     */
    position?: ChatVariantProps['position']

    /**
     * The message text or content.
     */
    children?: Snippet
}

export interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Value of the input field.
     */
    value?: string

    /**
     * Placeholder text.
     */
    placeholder?: string

    /**
     * Whether the input is disabled.
     */
    disabled?: boolean

    /**
     * Snippet for leading actions (e.g. attachment button).
     */
    leading?: Snippet

    /**
     * Snippet for trailing actions (e.g. send button).
     */
    trailing?: Snippet
}
