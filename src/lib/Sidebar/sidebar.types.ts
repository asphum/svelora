import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { SidebarVariantProps } from './sidebar.variants.js'

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
    /**
     * Whether the sidebar is collapsed (icons only).
     * @default false
     */
    collapsed?: boolean

    /**
     * Position of the sidebar.
     * @default 'left'
     */
    position?: SidebarVariantProps['position']

    /**
     * Additional CSS classes.
     */
    class?: string

    /**
     * Snippet for the top header section (e.g. Logo).
     */
    header?: Snippet<[{ collapsed: boolean }]>

    /**
     * Snippet for the main content (e.g. Navigation Menu).
     */
    children?: Snippet<[{ collapsed: boolean }]>

    /**
     * Snippet for the bottom footer section (e.g. User Profile).
     */
    footer?: Snippet<[{ collapsed: boolean }]>
}
