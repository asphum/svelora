// Vendored from svelte-french-toast (MIT License)
// https://github.com/kbrgl/svelte-french-toast

import type { DefaultToastOptions, Toast, ToastType } from './types.js'

const TOAST_LIMIT = 20

const defaultTimeouts: Record<ToastType, number> = {
    blank: 4000,
    error: 4000,
    success: 2000,
    loading: Number.POSITIVE_INFINITY,
    custom: 4000,
    warning: 4000,
    info: 4000
}

class ToastStore {
    toasts = $state<Toast[]>([])
    pausedAt = $state<number | null>(null)
}

export const toastStore = new ToastStore()

const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
    if (toastTimeouts.has(toastId)) {
        return
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId)
        remove(toastId)
    }, 1000)

    toastTimeouts.set(toastId, timeout)
}

const clearFromRemoveQueue = (toastId: string) => {
    const timeout = toastTimeouts.get(toastId)
    if (timeout) {
        clearTimeout(timeout)
    }
}

export function update(toast: Partial<Toast>, clearTimeout = true) {
    if (clearTimeout && toast.id) {
        clearFromRemoveQueue(toast.id)
    }
    toastStore.toasts = toastStore.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t))
}

export function add(toast: Toast) {
    toastStore.toasts = [toast, ...toastStore.toasts].slice(0, TOAST_LIMIT)
}

export function upsert(toast: Toast) {
    if (toastStore.toasts.find((t) => t.id === toast.id)) {
        update(toast)
    } else {
        add(toast)
    }
}

export function dismiss(toastId?: Toast['id']) {
    if (toastId) {
        addToRemoveQueue(toastId)
    } else {
        toastStore.toasts.forEach((toast) => {
            addToRemoveQueue(toast.id)
        })
    }

    toastStore.toasts = toastStore.toasts.map((t) =>
        t.id === toastId || toastId === undefined ? { ...t, visible: false } : t
    )
}

export function remove(toastId?: Toast['id']) {
    if (toastId === undefined) {
        toastStore.toasts = []
        return
    }
    toastStore.toasts = toastStore.toasts.filter((t) => t.id !== toastId)
}

export function startPause(time: number) {
    toastStore.pausedAt = time
}

export function endPause(time: number) {
    const diff = time - (toastStore.pausedAt || 0)
    toastStore.pausedAt = null
    toastStore.toasts = toastStore.toasts.map((t) => ({
        ...t,
        pauseDuration: t.pauseDuration + diff
    }))
}

export function mergeToastOptions(
    toasts: Toast[],
    toastOptions: DefaultToastOptions = {}
): Toast[] {
    return toasts.map((t) => ({
        ...toastOptions,
        ...toastOptions[t.type],
        ...t,
        duration:
            t.duration ||
            toastOptions[t.type]?.duration ||
            toastOptions?.duration ||
            defaultTimeouts[t.type],
        style: [toastOptions.style, toastOptions[t.type]?.style, t.style].filter(Boolean).join(';')
    }))
}
