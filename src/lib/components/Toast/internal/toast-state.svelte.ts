// Ported from svelte-sonner (MIT License)
// https://github.com/wobsoriano/svelte-sonner

import { untrack } from 'svelte'
import { isBrowser } from './helpers.js'
import type {
    AnyComponent,
    ExternalToast,
    HeightT,
    PromiseData,
    PromiseT,
    ToastT,
    ToastTypes
} from './types.js'

let toastsCounter = 0

class ToastState {
    toasts: ToastT[] = $state([])
    heights: HeightT[] = $state([])

    #findToastIdx = (id: number | string) => {
        const idx = this.toasts.findIndex((toast) => toast.id === id)
        if (idx === -1) return null
        return idx
    }

    addToast = (data: ToastT) => {
        if (!isBrowser) return
        this.toasts.unshift(data)
    }

    updateToast = ({
        id,
        data,
        type,
        message
    }: {
        id: number | string
        data: ExternalToast
        type: ToastTypes
        message?: string | AnyComponent
    }) => {
        const toastIdx = this.toasts.findIndex((toast) => toast.id === id)
        const toastToUpdate = this.toasts[toastIdx]
        this.toasts[toastIdx] = {
            ...toastToUpdate,
            ...data,
            id,
            title: message,
            type,
            updated: true
        }
    }

    create = (
        data: (ExternalToast & { message?: string | AnyComponent; type?: ToastTypes; promise?: PromiseT }) 
    ) => {
        const { message, ...rest } = data
        const id =
            typeof data?.id === 'number' || (data.id && (data.id as string)?.length > 0)
                ? data.id
                : toastsCounter++

        const dismissible =
            data.dismissible !== undefined
                ? data.dismissible
                : data.dismissable !== undefined
                  ? data.dismissable
                  : true

        const type = data.type === undefined ? 'default' : data.type

        untrack(() => {
            const alreadyExists = this.toasts.find((toast) => toast.id === id)
            if (alreadyExists) {
                this.updateToast({ id, data, type, message })
            } else {
                this.addToast({ ...rest, id, title: message, dismissible, type } as ToastT)
            }
        })

        return id
    }

    dismiss = (id?: number | string) => {
        untrack(() => {
            if (id === undefined) {
                this.toasts = this.toasts.map((toast) => ({ ...toast, dismiss: true }))
                return
            }
            const toastIdx = this.toasts.findIndex((toast) => toast.id === id)
            if (this.toasts[toastIdx]) {
                this.toasts[toastIdx] = { ...this.toasts[toastIdx], dismiss: true }
            }
        })
        return id
    }

    remove = (id?: number | string) => {
        if (id === undefined) {
            this.toasts = []
            return
        }
        const toastIdx = this.#findToastIdx(id)
        if (toastIdx === null) return
        this.toasts.splice(toastIdx, 1)
        return id
    }

    message = (message: string, data?: ExternalToast) => {
        return this.create({ ...data, type: 'default', message })
    }

    error = (message: string, data?: ExternalToast) => {
        return this.create({ ...data, type: 'error', message })
    }

    success = (message: string, data?: ExternalToast) => {
        return this.create({ ...data, type: 'success', message })
    }

    info = (message: string, data?: ExternalToast) => {
        return this.create({ ...data, type: 'info', message })
    }

    warning = (message: string, data?: ExternalToast) => {
        return this.create({ ...data, type: 'warning', message })
    }

    loading = (message: string, data?: ExternalToast) => {
        return this.create({ ...data, type: 'loading', message })
    }

    promise = <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => {
        if (!data) return

        let id: string | number | undefined = undefined

        if (data.loading !== undefined) {
            id = this.create({
                ...data,
                promise,
                type: 'loading',
                message: typeof data.loading === 'string' ? data.loading : data.loading()
            } as Parameters<typeof this.create>[0])
        }

        const p = promise instanceof Promise ? promise : promise()
        let shouldDismiss = id !== undefined

        p.then((response) => {
            if (data.success !== undefined) {
                shouldDismiss = false
                const message =
                    typeof data.success === 'function' ? data.success(response) : data.success
                this.create({ id, type: 'success', message })
            }
        })
            .catch((error) => {
                if (data.error !== undefined) {
                    shouldDismiss = false
                    const message =
                        typeof data.error === 'function' ? data.error(error) : data.error
                    this.create({ id, type: 'error', message })
                }
            })
            .finally(() => {
                if (shouldDismiss) {
                    this.dismiss(id)
                    id = undefined
                }
                data.finally?.()
            })

        return id
    }

    custom = (component: AnyComponent, data?: ExternalToast) => {
        const id = data?.id || toastsCounter++
        this.create({ component, id, ...data })
        return id
    }

    removeHeight = (id: number | string) => {
        this.heights = this.heights.filter((height) => height.toastId !== id)
    }

    setHeight = (data: HeightT) => {
        const toastIdx = this.#findToastIdx(data.toastId)
        if (toastIdx === null) {
            this.heights.push(data)
            return
        }
        this.heights[toastIdx] = data
    }

    reset = () => {
        this.toasts = []
        this.heights = []
    }
}

export const toastState = new ToastState()

function toastFunction(message: string, data?: ExternalToast) {
    return toastState.create({ message, ...data })
}

export const toast = Object.assign(toastFunction, {
    success: toastState.success,
    info: toastState.info,
    warning: toastState.warning,
    error: toastState.error,
    custom: toastState.custom,
    message: toastState.message,
    promise: toastState.promise,
    dismiss: toastState.dismiss,
    loading: toastState.loading,
    getActiveToasts: () => toastState.toasts.filter((t) => !t.dismiss)
})
