// Ported from svelte-sonner (MIT License)

export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}

export const isBrowser = typeof document !== 'undefined'

export function getDefaultSwipeDirections(position: string): string[] {
    const [y, x] = position.split('-')
    const directions: string[] = []
    if (y) directions.push(y)
    if (x) directions.push(x)
    return directions
}

export function getDampening(delta: number): number {
    const factor = Math.abs(delta) / 20
    return 1 / (1.5 + factor)
}
