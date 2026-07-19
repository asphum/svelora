import type { IconProps as IconifyProps } from '@iconify/svelte'
import type { SVGAttributes } from 'svelte/elements'
import type { ClassNameValue } from 'tailwind-merge'

/** Per-breakpoint icon sizes using Tailwind's default viewport breakpoints. */
export type ResponsiveIconSize = Partial<
    Record<'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number | string>
>

export interface IconProps
    extends Omit<IconifyProps, 'icon' | 'width' | 'height' | 'rotate' | 'flip' | 'class'>,
        Pick<
            SVGAttributes<SVGSVGElement>,
            | 'role'
            | 'tabindex'
            | 'aria-label'
            | 'aria-labelledby'
            | 'aria-describedby'
            | 'aria-hidden'
            | 'onclick'
            | 'onkeydown'
            | 'onmouseenter'
            | 'onmouseleave'
            | 'onfocus'
            | 'onblur'
        > {
    /** Custom data attributes are forwarded to the rendered `<svg>`. */
    [key: `data-${string}`]: string | number | boolean | null | undefined
    /**
     * Icon name in Iconify format (`collection:icon-name`) or Iconify Tailwind 4 class syntax.
     * Class-style names automatically use the Tailwind renderer.
     * @example "lucide:home", "mdi:account", "icon-[solar--clock-circle-line-duotone]"
     * @see https://icon-sets.iconify.design/
     */
    name: string

    /**
     * Icon size (applied to both width and height).
     * Accepts a number (pixels) or CSS string value.
     * @default 24
     * @example 24, "1.5rem", "20px"
     */
    size?: number | string

    /**
     * Icon size per viewport breakpoint. Values can be pixels (numbers) or CSS sizes (strings).
     * Missing breakpoints inherit the next-smallest specified size.
     * @example { base: 16, sm: 20, md: 24 }
     */
    responsiveSize?: ResponsiveIconSize

    /**
     * Icon color (CSS color value).
     * Defaults to `currentColor`, inheriting the parent's text color.
     * Use Tailwind `text-*` classes on the parent or via `class` prop as an alternative.
     * @default "currentColor"
     * @example "red", "#ff0000", "rgb(255, 0, 0)"
     */
    color?: string

    /**
     * Flip icon horizontally.
     * @default false
     */
    flipH?: boolean

    /**
     * Flip icon vertically.
     * @default false
     */
    flipV?: boolean

    /**
     * Rotate icon by specified degrees (quarter turns only).
     * For arbitrary rotation, use a CSS class like `rotate-45`.
     * @default 0
     */
    rotate?: 0 | 90 | 180 | 270

    /**
     * Additional CSS classes for the icon.
     * Merged with `shrink-0` via tailwind-merge, so conflicting utilities are resolved correctly.
     * In Tailwind mode, use utilities such as `size-20` to override the default 24px size.
     */
    class?: ClassNameValue
}
