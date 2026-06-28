// Vendored from svelte-french-toast (MIT License)
// https://github.com/kbrgl/svelte-french-toast

export const genId = (() => {
    let count = 0

    return () => {
        count += 1
        return count.toString()
    }
})()

export const prefersReducedMotion = (() => {
    let shouldReduceMotion: boolean | undefined

    return () => {
        if (shouldReduceMotion === undefined && typeof window !== 'undefined') {
            const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)')
            shouldReduceMotion = !mediaQuery || mediaQuery.matches
        }
        return shouldReduceMotion
    }
})()

export function parsePosition(position: string) {
    const [y = 'bottom', x = 'right'] = position.split('-')
    const xPosition = x === 'center' ? 'center' : x === 'left' || x === 'start' ? 'left' : 'right'
    const yPosition = y === 'top' ? 'top' : 'bottom'

    return { xPosition, yPosition }
}
