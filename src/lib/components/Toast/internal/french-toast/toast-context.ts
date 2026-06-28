// Svelora extensions for vendored svelte-french-toast

import { getContext, setContext } from 'svelte'
import type { Snippet } from 'svelte'

export type ToastIconSnippets = {
    successIcon?: Snippet
    errorIcon?: Snippet
    warningIcon?: Snippet
    infoIcon?: Snippet
    loadingIcon?: Snippet
    closeIcon?: Snippet
}

export type ToastToasterContext = ToastIconSnippets & {
    closeButton?: boolean
    closeButtonAriaLabel?: string
}

const TOAST_TOASTER_CONTEXT = Symbol('svelora-toast-toaster')

export function setToastToasterContext(getter: () => ToastToasterContext) {
    setContext(TOAST_TOASTER_CONTEXT, getter)
}

export function getToastToasterContext(): ToastToasterContext {
    const getter = getContext<(() => ToastToasterContext) | undefined>(TOAST_TOASTER_CONTEXT)
    return getter?.() ?? {}
}
