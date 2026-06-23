import { afterEach, beforeEach } from 'vitest'
import { cleanup } from 'vitest-browser-svelte'

const resetBrowserState = () => {
    cleanup()
    document.body.innerHTML = ''
    document.head.querySelectorAll('[data-svelte-h]').forEach((node) => node.remove())
    window.history.replaceState({}, '', '/')
}

beforeEach(() => {
    resetBrowserState()
})

afterEach(() => {
    resetBrowserState()
})
