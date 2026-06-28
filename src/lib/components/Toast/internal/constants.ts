// Ported from svelte-sonner (MIT License)
// https://github.com/wobsoriano/svelte-sonner

/** Default lifetime of a toast in ms */
export const TOAST_LIFETIME = 4000

/** Default gap between toasts */
export const GAP = 14

/** Swipe threshold to dismiss a toast */
export const SWIPE_THRESHOLD = 45

/** Equal to exit animation duration */
export const TIME_BEFORE_UNMOUNT = 200

export const SCALE_MULTIPLIER = 0.05

export const DEFAULT_TOAST_CLASSES = {
    toast: '',
    title: '',
    description: '',
    loader: '',
    closeButton: '',
    cancelButton: '',
    actionButton: '',
    action: '',
    warning: '',
    error: '',
    success: '',
    default: '',
    info: '',
    loading: ''
}
