import type { ButtonVariantProps } from '../Button/button.variants.js'
import type { AnimatedIconType } from '../Toast/internal/animated-icon.types.js'

export type ConfirmIcon = Extract<
    AnimatedIconType,
    'warning' | 'error' | 'question' | 'info' | 'success'
>

export type ConfirmColor = NonNullable<ButtonVariantProps['color']>

export interface ConfirmOptions {
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
    icon?: ConfirmIcon
    confirmColor?: ConfirmColor
    /** When false, only the confirm button is shown (alert-style). @default true */
    showCancel?: boolean
    /** When false, backdrop click and Escape do not dismiss. @default true */
    dismissible?: boolean
    inputPlaceholder?: string
    inputValue?: string
    inputType?: 'text' | 'password' | 'email' | 'number' | 'textarea'
    inputChoices?: string[]
    onConfirm?: (value?: string) => void
    onCancel?: () => void
}
