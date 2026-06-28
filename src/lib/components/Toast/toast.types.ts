import type { ClassNameValue } from 'tailwind-merge'
import type { Snippet } from 'svelte'
import type { DefaultToastOptions, ToastPosition } from './internal/french-toast/core/types.js'
import type { ToastVariant } from './toast.variants.js'

export type ToasterProps = {
    /**
     * The visual style variant.
     * @default 'outline'
     */
    variant?: ToastVariant

    /**
     * Additional CSS classes for the toaster container.
     */
    class?: ClassNameValue

    position?: ToastPosition
    duration?: number
    closeButton?: boolean
    /** @deprecated French-toast does not support expand stacking. Kept for API compatibility. */
    expand?: boolean
    /** @deprecated French-toast manages visible toasts internally. Kept for API compatibility. */
    visibleToasts?: number
    gap?: number
    theme?: 'light' | 'dark' | 'system'
    reverseOrder?: boolean
    toastOptions?: DefaultToastOptions
    successIcon?: Snippet
    errorIcon?: Snippet
    warningIcon?: Snippet
    infoIcon?: Snippet
    loadingIcon?: Snippet
    closeIcon?: Snippet
}
