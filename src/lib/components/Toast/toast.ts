import type { Component } from 'svelte'
import { mount, unmount } from 'svelte'
import type { ExternalToast } from './internal/types.js'
import { toast as internalToast } from './internal/toast-state.svelte.js'
import Avatar from '../Avatar/Avatar.svelte'
import type { AvatarProps } from '../Avatar/avatar.types.js'
import Icon from '../Icon/Icon.svelte'
import type { ToastColor } from './toast.variants.js'

type ToastAvatarOptions = Pick<AvatarProps, 'src' | 'alt' | 'text' | 'icon' | 'size'>

type SveloraToastOptions = Omit<ExternalToast, 'icon'> & {
    /**
     * Semantic color for the toast.
     * Works with all Toaster variants (outline, soft, subtle, solid, accent).
     * @example toast('Message', { color: 'primary' })
     */
    color?: ToastColor

    /**
     * Iconify icon name to display in the toast.
     * Replaces the default type icon (success checkmark, error X, etc.)
     * @example toast('Launched!', { icon: 'lucide:rocket' })
     */
    icon?: string | ExternalToast['icon']

    /**
     * Avatar to display in the icon slot.
     * Pass an object with Avatar props (src, alt, text, icon, size).
     * @example toast('John commented', { avatar: { src: '/avatar.jpg', alt: 'John' } })
     */
    avatar?: ToastAvatarOptions
}

function createIconComponent(name: string): Component {
    function SveloraIcon(anchor: Node) {
        if (!anchor.parentNode) return { destroy() {} }
        const instance = mount(Icon, {
            target: anchor.parentNode as Element,
            anchor,
            props: { name, size: '18' }
        })
        return {
            destroy() {
                unmount(instance)
            }
        }
    }
    return SveloraIcon as unknown as Component
}

function createAvatarComponent(props: ToastAvatarOptions): Component {
    function SveloraAvatar(anchor: Node) {
        if (!anchor.parentNode) return { destroy() {} }
        const instance = mount(Avatar, {
            target: anchor.parentNode as Element,
            anchor,
            props: { size: 'sm', ...props }
        })
        return {
            destroy() {
                unmount(instance)
            }
        }
    }
    return SveloraAvatar as unknown as Component
}

function resolveOptions(data?: SveloraToastOptions): ExternalToast | undefined {
    if (!data) return data

    const { color, icon, avatar, ...rest } = data
    const resolved: ExternalToast = { ...rest }

    // Color → class
    if (color) {
        const existing = resolved.class ?? ''
        resolved.class = `${existing} ps-color-${color}`.trim()
    }

    // Avatar takes priority over icon
    if (avatar) {
        resolved.icon = createAvatarComponent(avatar)
    } else if (typeof icon === 'string') {
        resolved.icon = createIconComponent(icon)
    } else if (icon !== undefined) {
        resolved.icon = icon
    }

    return resolved
}

function toastFn(message: string, data?: SveloraToastOptions) {
    return internalToast(message, resolveOptions(data))
}

toastFn.success = (message: string, data?: SveloraToastOptions) =>
    internalToast.success(message, resolveOptions(data))

toastFn.error = (message: string, data?: SveloraToastOptions) =>
    internalToast.error(message, resolveOptions(data))

toastFn.warning = (message: string, data?: SveloraToastOptions) =>
    internalToast.warning(message, resolveOptions(data))

toastFn.info = (message: string, data?: SveloraToastOptions) =>
    internalToast.info(message, resolveOptions(data))

toastFn.loading = (message: string, data?: SveloraToastOptions) =>
    internalToast.loading(message, resolveOptions(data))

toastFn.promise = internalToast.promise

toastFn.dismiss = internalToast.dismiss

toastFn.custom = internalToast.custom

toastFn.message = internalToast.message

export type { SveloraToastOptions as ToastOptions }
export { toastFn as toast }
