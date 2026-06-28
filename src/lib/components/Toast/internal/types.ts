// Ported from svelte-sonner (MIT License)
// https://github.com/wobsoriano/svelte-sonner

import type { Component, ComponentProps, Snippet } from 'svelte'
import type { HTMLAttributes, MouseEventHandler } from 'svelte/elements'

export type AnyComponent = Component<Record<string, unknown>>

export type ToastTypes =
    | 'normal'
    | 'action'
    | 'success'
    | 'error'
    | 'loading'
    | 'info'
    | 'warning'
    | 'default'

export type PromiseT<Data = unknown> = Promise<Data> | (() => Promise<Data>)

export type PromiseExternalToast = Omit<ExternalToast, 'description'>

export type PromiseData<ToastData = unknown> = PromiseExternalToast & {
    loading?: string | (() => string)
    success?: string | ((data: ToastData) => string)
    error?: string | ((error: unknown) => string)
    description?: string | ((data: unknown) => string)
    finally?: () => void | Promise<void>
}

export type ToastAction = {
    label: string | AnyComponent
    onClick: MouseEventHandler<HTMLButtonElement>
    actionButtonStyle?: string
}

export function isAction(
    action: ToastAction | AnyComponent | undefined
): action is ToastAction {
    return (action as ToastAction).label !== undefined
}

export type ToastT<T extends AnyComponent = AnyComponent> = {
    id: number | string
    title?: string | AnyComponent
    type: ToastTypes
    icon?: AnyComponent | null
    component?: AnyComponent
    componentProps?: ComponentProps<T>
    richColors?: boolean
    invert?: boolean
    closeButton?: boolean
    dismissible?: boolean
    /** @deprecated Use `dismissible` instead. */
    dismissable?: boolean
    important?: boolean
    description?: string | AnyComponent
    duration?: number
    delete?: boolean
    action?: ToastAction | AnyComponent
    cancel?: ToastAction | AnyComponent
    onDismiss?: (toast: ToastT) => void
    onAutoClose?: (toast: ToastT) => void
    promise?: PromiseT
    cancelButtonStyle?: string
    actionButtonStyle?: string
    style?: string
    unstyled?: boolean
    class?: string
    classes?: ToastClasses
    descriptionClass?: string
    position?: Position
    dismiss?: boolean
    updated?: boolean
}

export type Position =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center'

export type HeightT = {
    height: number
    toastId: number | string
}

export type Theme = 'light' | 'dark'

export type ToastToDismiss = {
    id: number | string
    dismiss: boolean
}

export type ExternalToast<T extends AnyComponent = AnyComponent> = Omit<
    ToastT<T>,
    'id' | 'type' | 'title' | 'promise' | 'updated'
> & {
    id?: number | string
}

type Offset =
    | {
          top?: string | number
          right?: string | number
          bottom?: string | number
          left?: string | number
      }
    | string
    | number

export type ToastIcon = Snippet | null

type ToastIcons = {
    successIcon?: ToastIcon
    infoIcon?: ToastIcon
    warningIcon?: ToastIcon
    errorIcon?: ToastIcon
    loadingIcon?: ToastIcon
    closeIcon?: ToastIcon
}

export type SwipeDirection = 'top' | 'right' | 'bottom' | 'left'

export type ToastClasses = {
    toast?: string
    title?: string
    description?: string
    loader?: string
    closeButton?: string
    cancelButton?: string
    actionButton?: string
    icon?: string
    content?: string
} & Partial<Record<ToastTypes, string>>

export type ToastOptions = {
    class?: string
    descriptionClass?: string
    style?: string
    cancelButtonStyle?: string
    actionButtonStyle?: string
    duration?: number
    unstyled?: boolean
    classes?: ToastClasses
    closeButtonAriaLabel?: string
    closeButton?: boolean
}

export type ToasterProps = {
    invert?: boolean
    theme?: 'light' | 'dark' | 'system'
    position?: Position
    hotkey?: string[]
    richColors?: boolean
    expand?: boolean
    duration?: number
    gap?: number
    visibleToasts?: number
    closeButton?: boolean
    toastOptions?: ToastOptions
    offset?: Offset
    mobileOffset?: Offset
    pauseWhenPageIsHidden?: boolean
    dir?: 'ltr' | 'rtl' | 'auto'
    swipeDirections?: SwipeDirection[]
    containerAriaLabel?: string
    closeButtonAriaLabel?: string
} & HTMLAttributes<HTMLOListElement> &
    ToastIcons

export type ToastProps = {
    toast: ToastT
    index: number
    swipeDirections?: SwipeDirection[]
    expanded: boolean
    invert: boolean
    position: Position
    visibleToasts: number
    expandByDefault: boolean
    closeButton: boolean
    interacting: boolean
    cancelButtonStyle: string
    actionButtonStyle: string
    duration: number
    class: string
    descriptionClass: string
    classes: ToastClasses
    unstyled: boolean
    closeButtonAriaLabel: string
    defaultRichColors: boolean
    pauseWhenPageIsHidden: boolean
} & HTMLAttributes<HTMLLIElement> &
    ToastIcons
