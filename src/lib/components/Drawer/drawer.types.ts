import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { DrawerDirection } from 'vaul-svelte'
import type { DrawerSlots } from './drawer.variants.js'
// vaul-svelte ships the underlying Root props as a runtime class type on
// `Drawer.Root`, but does not re-export a named Props type. We mirror the
// keys we actually need inline. Every field is optional so `DrawerProps`
// stays fully optional (otherwise Svelte 5 infers the wrapper component as
// `Component<Props, ...>` with required keys and `render(Drawer, {...})`
// fails type-checking).
type VaulRootProps = Partial<{
    open: boolean
    onOpenChange: (value: boolean) => void
    direction: 'left' | 'right' | 'top' | 'bottom'
    dismissible: boolean
    modal: boolean
    shouldScaleBackground: boolean
    setBackgroundColorOnScale: boolean
    closeThreshold: number
    scrollLockTimeout: number
    snapPoints: (number | string)[]
    fadeFromIndex: number
    activeSnapPoint: number | string | null
    onActiveSnapPointChange: (value: number | string | null) => void
    handleOnly: boolean
    noBodyStyles: boolean
    onDrag: (event: { currentTarget: EventTarget & HTMLElement }, percentageDragged: number) => void
    onRelease: (event: { currentTarget: EventTarget & HTMLElement }, open: boolean) => void
    onClose: () => void
    nested: boolean
    fixed: boolean
    defaultOpen: boolean
    disablePreventScroll: boolean
    repositionInputs: boolean
    snapToSequentialPoint: boolean
    container: HTMLElement | null
    onAnimationEnd: (open: boolean) => void
    preventScrollRestoration: boolean
    autoFocus: boolean
}>

export type { DrawerDirection }

export type DrawerProps = VaulRootProps & {
    /**
     * Whether to inset the drawer from the edges with rounded corners.
     * @default false
     */
    inset?: boolean

    /**
     * Title text displayed in the drawer header.
     */
    title?: string

    /**
     * Description text displayed in the drawer header.
     */
    description?: string

    /**
     * Whether to render an overlay behind the drawer.
     * @default true
     */
    overlay?: boolean

    /**
     * Whether to render a drag handle on the drawer.
     * @default true
     */
    handle?: boolean

    /**
     * Whether to render in a portal.
     * @default true
     */
    portal?: boolean

    /**
     * Override styles for specific drawer slots.
     */
    ui?: Partial<Record<DrawerSlots, ClassNameValue>>

    /**
     * Additional CSS classes for the trigger element or content (when no trigger).
     */
    class?: ClassNameValue

    /**
     * Trigger content. Spread the provided `props` onto your own focusable
     * element (e.g. a `<Button>`) so the drawer's trigger ARIA and event
     * handlers land on the real control instead of a nested wrapper button.
     *
     * @example
     * ```svelte
     * {#snippet children({ props })}
     *   <Button {...props}>Open</Button>
     * {/snippet}
     * ```
     */
    children?: Snippet<[{ props: Record<string, unknown> }]>

    /**
     * Custom content slot (replaces default layout with header/body/footer).
     */
    content?: Snippet

    /**
     * Custom header slot.
     */
    header?: Snippet

    /**
     * Custom title slot.
     */
    titleSlot?: Snippet

    /**
     * Custom description slot.
     */
    descriptionSlot?: Snippet

    /**
     * Custom body slot.
     */
    body?: Snippet

    /**
     * Custom footer slot.
     */
    footer?: Snippet
}
