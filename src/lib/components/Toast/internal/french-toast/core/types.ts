// Vendored from svelte-french-toast (MIT License)
// https://github.com/kbrgl/svelte-french-toast

import type { Component } from 'svelte'
import type { MouseEventHandler } from 'svelte/elements'

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom' | 'warning' | 'info'

export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'

export type Renderable<T extends Record<string, unknown> = Record<string, unknown>> =
    | Component<T>
    | string
    | null

export interface IconTheme {
    primary: string
    secondary: string
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>

const isFunction = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function'

export const resolveValue = <TValue, TArg>(
    valOrFunction: ValueOrFunction<TValue, TArg>,
    arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction)

export interface ToastAction {
    label: string
    onClick: MouseEventHandler<HTMLButtonElement>
}

export interface Toast<T extends Record<string, unknown> = Record<string, unknown>> {
    type: ToastType
    id: string
    message: Renderable<T>
    description?: Renderable
    icon?: Renderable
    duration?: number
    pauseDuration: number
    position?: ToastPosition
    props?: Omit<T, 'toast'>
    ariaProps: {
        role: 'status' | 'alert'
        'aria-live': 'assertive' | 'off' | 'polite'
    }
    style?: string
    className?: string
    descriptionClass?: string
    iconTheme?: IconTheme
    action?: ToastAction
    cancel?: ToastAction
    closeButton?: boolean
    createdAt: number
    visible: boolean
    height?: number
}

export type DOMToast<T extends Record<string, unknown> = Record<string, unknown>> = Toast<T> & {
    offset: number
}

export type ToastOptions<T extends Record<string, unknown> = Record<string, unknown>> = Partial<
    Pick<
        Toast<T>,
        | 'id'
        | 'icon'
        | 'description'
        | 'duration'
        | 'ariaProps'
        | 'className'
        | 'descriptionClass'
        | 'style'
        | 'position'
        | 'iconTheme'
        | 'props'
        | 'action'
        | 'cancel'
        | 'closeButton'
    >
>

export type DefaultToastOptions = ToastOptions & {
    [key in ToastType]?: ToastOptions
}

export interface ToasterProps {
    position?: ToastPosition
    toastOptions?: DefaultToastOptions
    reverseOrder?: boolean
    gutter?: number
    containerStyle?: string
    containerClassName?: string
    closeButton?: boolean
    theme?: 'light' | 'dark' | 'system'
}
