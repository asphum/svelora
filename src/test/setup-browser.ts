import { afterAll, afterEach, beforeEach } from 'vitest'
import { cleanup } from 'vitest-browser-svelte'

const flushMicrotasks = async () => {
    await Promise.resolve()
    await Promise.resolve()
}

const flushTasks = async () => {
    for (let i = 0; i < 3; i++) {
        await flushMicrotasks()
        await new Promise<void>((resolve) => setTimeout(resolve, 0))
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    }
    await flushMicrotasks()
}

const resetBrowserState = async () => {
    await flushTasks()
    cleanup()
    await flushTasks()
    document.body.innerHTML = ''
    document.head.querySelectorAll('[data-svelte-h]').forEach((node) => node.remove())
    window.history.replaceState({}, '', '/')
}

beforeEach(async () => {
    await resetBrowserState()
})

afterEach(async () => {
    await resetBrowserState()
})

afterAll(async () => {
    await resetBrowserState()
})
