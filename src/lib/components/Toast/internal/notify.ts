import { toast } from '../toast.js'
import type { ToastOptions as SveloraToastOptions } from '../toast.js'
import {
    ToastError,
    ToastInfo,
    ToastLoading,
    ToastSuccess,
    ToastWarning
} from './toast-icons/index.js'

export interface NotifyOptions extends SveloraToastOptions {
    /** Inline style map (merged into `style`). */
    styles?: Record<string, string>
    /** Class map (merged into `class`). */
    classes?: Record<string, string>
}

export interface NotifyPromiseOptions<T = unknown> extends NotifyOptions {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((error: unknown) => string)
    /** Treat API responses with `success: false` as errors. */
    checkSuccess?: (data: T) => boolean
    loadingOptions?: NotifyOptions
    successOptions?: NotifyOptions
    errorOptions?: NotifyOptions
    /** Minimum time to show the loading toast (ms). Default 800. */
    minDuration?: number
}

function getErrorMessage(err: unknown): string {
    if (typeof err === 'string') return err
    if (err instanceof Error) return err.message
    if (err && typeof err === 'object') {
        const obj = err as Record<string, unknown>
        if (typeof obj.message === 'string') return obj.message
        if (typeof obj.error === 'string') return obj.error
        return JSON.stringify(err)
    }
    return 'An unknown error occurred'
}

function mapNotifyOptions(options?: NotifyOptions): SveloraToastOptions | undefined {
    if (!options) return options

    const { styles, classes, ...rest } = options
    const resolved = { ...rest } as SveloraToastOptions

    if (styles && Object.keys(styles).length > 0) {
        const inline = Object.entries(styles)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ')
        resolved.style = [resolved.style, inline].filter(Boolean).join('; ')
    }

    if (classes && Object.keys(classes).length > 0) {
        const classNames = Object.values(classes).join(' ')
        resolved.class = [resolved.class, classNames].filter(Boolean).join(' ')
    }

    return resolved
}

function withIcon(
    icon: SveloraToastOptions['icon'],
    options?: NotifyOptions
): SveloraToastOptions | undefined {
    const resolved = mapNotifyOptions(options)
    if (!resolved) return { icon }
    if (resolved.icon !== undefined) return resolved
    return { ...resolved, icon }
}

export const notify = {
    success(message: string, options?: NotifyOptions) {
        return toast.success(message, withIcon(ToastSuccess, options))
    },

    error(message: string | unknown, options?: NotifyOptions) {
        return toast.error(getErrorMessage(message), withIcon(ToastError, options))
    },

    info(message: string, options?: NotifyOptions) {
        return toast.info(message, withIcon(ToastInfo, options))
    },

    warning(message: string, options?: NotifyOptions) {
        return toast.warning(message, withIcon(ToastWarning, options))
    },

    loading(message: string, options?: NotifyOptions) {
        return toast.loading(
            message,
            withIcon(ToastLoading, {
                duration: Number.POSITIVE_INFINITY,
                ...options
            })
        )
    },

    processing(message: string, options?: NotifyOptions) {
        return toast.processing(message, options)
    },

    default(message: string, options?: NotifyOptions) {
        return toast(message, mapNotifyOptions(options))
    },

    promise<T>(promise: Promise<T>, options: NotifyPromiseOptions<T>): Promise<T> {
        const {
            loading,
            success,
            error,
            checkSuccess,
            loadingOptions,
            successOptions,
            errorOptions,
            minDuration = 800,
            ...rest
        } = options

        const toastId = notify.loading(loading, {
            ...rest,
            ...loadingOptions
        })

        const minDelay = new Promise<void>((resolve) => setTimeout(resolve, minDuration))

        Promise.all([Promise.resolve(promise), minDelay])
            .then(([data]) => {
                if (checkSuccess && !checkSuccess(data)) {
                    throw data
                }

                const message = typeof success === 'function' ? success(data) : success
                notify.success(message, {
                    id: toastId,
                    ...rest,
                    ...successOptions
                })
            })
            .catch((err) => {
                const message = typeof error === 'function' ? error(err) : getErrorMessage(err)
                notify.error(message, {
                    id: toastId,
                    ...rest,
                    ...errorOptions
                })
            })

        return promise
    },

    dismiss(id?: string | number) {
        toast.dismiss(id !== undefined ? String(id) : undefined)
    }
}

export type NotifyUtility = typeof notify
