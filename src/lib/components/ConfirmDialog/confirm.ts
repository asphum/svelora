import type { ConfirmOptions } from './confirm.types.js'

type ShowFn = (options?: ConfirmOptions) => Promise<boolean>

let showFn: ShowFn | null = null

export function registerConfirmDialog(fn: ShowFn | null) {
    showFn = fn
}

export const confirmDialog = {
    show(options: ConfirmOptions = {}): Promise<boolean> {
        if (!showFn) {
            console.warn(
                '[confirmDialog] ConfirmDialog is not registered — add <ConfirmDialog /> to your root layout.'
            )
            return Promise.resolve(false)
        }
        return showFn(options)
    },

    delete(options: ConfirmOptions = {}): Promise<boolean> {
        return this.show({
            title: 'Delete this item?',
            message: 'This action is permanent and cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            icon: 'warning',
            confirmColor: 'error',
            ...options
        })
    }
}

export type ConfirmDialogUtility = typeof confirmDialog
