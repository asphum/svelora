// Vendored from svelte-french-toast (MIT License)
// https://github.com/kbrgl/svelte-french-toast

import toast from './toast.js'
import {
    endPause as _endPause,
    mergeToastOptions,
    startPause as _startPause,
    toastStore,
    update
} from './store.svelte.js'
import type { DefaultToastOptions, Toast, ToastPosition } from './types.js'

function calculateOffset(
    toastItem: Toast,
    list: Toast[],
    opts?: {
        reverseOrder?: boolean
        gutter?: number
        defaultPosition?: ToastPosition
    }
) {
    const { reverseOrder, gutter = 8, defaultPosition } = opts || {}

    const relevantToasts = list.filter(
        (t) =>
            (t.position || defaultPosition) === (toastItem.position || defaultPosition) && t.height
    )
    const toastIndex = relevantToasts.findIndex((t) => t.id === toastItem.id)
    const toastsBefore = relevantToasts.filter((item, i) => i < toastIndex && item.visible).length

    const offset = relevantToasts
        .filter((t) => t.visible)
        .slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
        .reduce((acc, t) => acc + (t.height || 0) + gutter, 0)

    return offset
}

const handlers = {
    startPause() {
        _startPause(Date.now())
    },
    endPause() {
        _endPause(Date.now())
    },
    updateHeight: (toastId: string, height: number) => {
        update({ id: toastId, height }, false)
    },
    calculateOffset
}

export function useToaster(getToastOptions: () => DefaultToastOptions = () => ({})) {
    const timeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>()

    const mergedToasts = $derived(mergeToastOptions(toastStore.toasts, getToastOptions()))

    $effect(() => {
        if (toastStore.pausedAt) {
            for (const [, timeoutId] of timeouts) {
                clearTimeout(timeoutId)
            }
            timeouts.clear()
            return
        }

        const now = Date.now()

        for (const t of mergedToasts) {
            if (timeouts.has(t.id)) {
                continue
            }
            if (t.duration === Number.POSITIVE_INFINITY) {
                continue
            }

            const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt)

            if (durationLeft < 0) {
                if (t.visible) {
                    toast.dismiss(t.id)
                }
                continue
            }

            timeouts.set(
                t.id,
                setTimeout(() => toast.dismiss(t.id), durationLeft)
            )
        }
    })

    $effect(() => {
        return () => {
            for (const [, timeoutId] of timeouts) {
                clearTimeout(timeoutId)
            }
            timeouts.clear()
        }
    })

    return {
        get mergedToasts() {
            return mergedToasts
        },
        handlers
    }
}
