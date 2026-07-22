import type { DialogContentPropsWithoutHTML, DialogRootPropsWithoutHTML } from 'bits-ui'
import type { Snippet } from 'svelte'
import type { ClassNameValue } from 'tailwind-merge'
import type { LightboxSlots, LightboxVariantProps } from './lightbox.variants.js'

export interface LightboxImage {
    src: string
    alt?: string
    title?: string
    description?: string
    downloadUrl?: string
}

export type LightboxSource = string | LightboxImage

type RootProps = Pick<DialogRootPropsWithoutHTML, 'open' | 'onOpenChange'>

type ContentProps = Pick<
    DialogContentPropsWithoutHTML,
    | 'trapFocus'
    | 'preventScroll'
    | 'onOpenAutoFocus'
    | 'onCloseAutoFocus'
    | 'onEscapeKeydown'
    | 'onInteractOutside'
    | 'forceMount'
>

export interface LightboxProps extends RootProps, ContentProps {
    /**
     * Bindable reference to the root container element.
     */
    ref?: HTMLElement | null

    /**
     * Single image URL or array of images (URLs or LightboxImage objects).
     */
    images?: LightboxSource[]

    /**
     * Convenient shorthand for a single image URL.
     */
    src?: string

    /**
     * Alt text for single image mode.
     */
    alt?: string

    /**
     * Title displayed in the top header.
     */
    title?: string

    /**
     * Description displayed below the title.
     */
    description?: string

    /**
     * Currently active image index in multi-image gallery mode. Supports two-way binding with `bind:index`.
     * @default 0
     */
    index?: number

    /**
     * Callback when active image index changes.
     */
    onIndexChange?: (index: number) => void

    /**
     * Enable looping through gallery images (from last to first and vice versa).
     * @default true
     */
    loop?: boolean

    /**
     * Enable zoom in/out controls and gestures.
     * @default true
     */
    zoom?: boolean

    /**
     * Enable image rotation control.
     * @default true
     */
    rotate?: boolean

    /**
     * Enable image download button.
     * @default true
     */
    download?: boolean

    /**
     * Enable fullscreen toggle button.
     * @default true
     */
    fullscreen?: boolean

    /**
     * Show thumbnail carousel bar at the bottom for gallery mode.
     * @default true
     */
    thumbnails?: boolean

    /**
     * Show image counter badge (e.g. "2 / 8").
     * @default true
     */
    counter?: boolean

    /**
     * Render the lightbox popover inside a Portal.
     * @default true
     */
    portal?: boolean

    /**
     * Size variant for maximum image bounds.
     * @default 'md'
     */
    size?: NonNullable<LightboxVariantProps['size']>

    /**
     * Custom header snippet.
     */
    headerSlot?: Snippet<
        [{ image: LightboxImage; index: number; total: number; close: () => void }]
    >

    /**
     * Custom footer snippet.
     */
    footerSlot?: Snippet<[{ image: LightboxImage; index: number; total: number }]>

    /**
     * Custom overlay snippet for image content.
     */
    children?: Snippet<[{ image: LightboxImage; index: number }]>

    /**
     * Additional CSS class for root element.
     */
    class?: ClassNameValue

    /**
     * Override styles for specific lightbox slots.
     */
    ui?: Partial<Record<LightboxSlots, ClassNameValue>>
}
