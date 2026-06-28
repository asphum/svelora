// Vendored from svelte-french-toast (MIT License)
// https://github.com/kbrgl/svelte-french-toast

import { dismiss, remove, upsert } from './store.svelte.js'
import {
    type Toast,
    type Renderable,
    type DefaultToastOptions,
    type ToastOptions,
    type ToastType,
    type ValueOrFunction,
    resolveValue
} from './types.js'
import { genId } from './utils.js'

type Message<T extends Record<string, unknown> = Record<string, unknown>> = Renderable<T>

type ToastHandler = <T extends Record<string, unknown> = Record<string, unknown>>(
    message: Message<T>,
    options?: ToastOptions<T>
) => string

const createToast = <T extends Record<string, unknown> = Record<string, unknown>>(
    message: Message<T>,
    type: ToastType = 'blank',
    opts?: ToastOptions<T>
): Toast<T> => ({
    createdAt: Date.now(),
    visible: true,
    type,
    ariaProps: {
        role: type === 'error' ? 'alert' : 'status',
        'aria-live': type === 'error' ? 'assertive' : 'polite'
    },
    message,
    pauseDuration: 0,
    icon: opts?.icon,
    description: opts?.description,
    duration: opts?.duration,
    iconTheme: opts?.iconTheme,
    position: opts?.position,
    props: opts?.props,
    className: opts?.className,
    descriptionClass: opts?.descriptionClass,
    style: opts?.style,
    action: opts?.action,
    cancel: opts?.cancel,
    closeButton: opts?.closeButton,
    id: opts?.id?.toString() || genId()
})

const createHandler =
    (type?: ToastType): ToastHandler =>
    (message, options) => {
        const nextToast = createToast(message, type, options)
        upsert(nextToast as Toast<Record<string, unknown>>)
        return nextToast.id
    }

const toast = <T extends Record<string, unknown> = Record<string, unknown>>(
    message: Message<T>,
    opts?: ToastOptions<T>
) => createHandler('blank')(message, opts)

toast.error = createHandler('error')
toast.success = createHandler('success')
toast.loading = createHandler('loading')
toast.custom = createHandler('custom')
toast.warning = createHandler('warning')
toast.info = createHandler('info')
toast.message = createHandler('blank')

toast.dismiss = (toastId?: string) => {
    dismiss(toastId)
}

toast.remove = (toastId?: string) => remove(toastId)

toast.promise = <T>(
    promise: Promise<T>,
    msgs: {
        loading: Renderable
        success: ValueOrFunction<Renderable, T>
        error: ValueOrFunction<Renderable, unknown>
    },
    opts?: DefaultToastOptions
) => {
    const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading })

    promise
        .then((p) => {
            toast.success(resolveValue(msgs.success, p), {
                id,
                ...opts,
                ...opts?.success
            })
            return p
        })
        .catch((e) => {
            toast.error(resolveValue(msgs.error, e), {
                id,
                ...opts,
                ...opts?.error
            })
        })

    return promise
}

export default toast
