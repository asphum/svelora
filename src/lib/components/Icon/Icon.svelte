<script lang="ts" module>
    import type { IconProps } from './icon.types.js'

    export type Props = IconProps
</script>

<script lang="ts">
    import Iconify from '@iconify/svelte'
    import { twMerge } from 'tailwind-merge'
    import { getComponentConfig, iconsDefaults } from '../../config.js'

    const config = getComponentConfig('icons', iconsDefaults)

    let {
        name,
        size = 24,
        color,
        flipH = false,
        flipV = false,
        rotate = 0,
        class: className,
        ...restProps
    }: Props = $props()

    const flip = $derived(
        flipH && flipV
            ? 'horizontal,vertical'
            : flipH
              ? 'horizontal'
              : flipV
                ? 'vertical'
                : undefined
    )

    const rotateValue = $derived(rotate ? rotate / 90 : undefined)

    const iconClass = $derived(twMerge('shrink-0', className))

    const provider = $derived(config.provider ?? 'iconify')

    // Class-style names opt into Iconify's Tailwind 4 renderer automatically.
    // This lets callers mix `icon-[solar--clock-circle-line-duotone]` with
    // regular Iconify names without changing the global provider.
    const isTailwindName = $derived(name.startsWith('icon-[') && name.endsWith(']'))
    const useTailwindProvider = $derived(provider === 'tailwind' || isTailwindName)

    // Automatically map Iconify names to Tailwind icon classes when using the global provider.
    const tailwindClass = $derived(
        name.startsWith('icon-') || name.startsWith('i-')
            ? name
            : `icon-[${name.replace(':', '--')}]`
    )

    // Resolve size value for inline styles
    const sizeStyle = $derived(typeof size === 'number' ? `${size}px` : size)
</script>

{#if useTailwindProvider}
    <span
        class={twMerge(tailwindClass, iconClass)}
        style:width={sizeStyle}
        style:height={sizeStyle}
        style:color={color}
        style:transform={rotateValue ? `rotate(${rotateValue * 90}deg)` : undefined}
        aria-hidden="true"
        {...(restProps as any)}
    ></span>
{:else}
    <Iconify
        icon={name}
        width={size}
        height={size}
        {color}
        {flip}
        rotate={rotateValue}
        class={iconClass}
        {...restProps}
    />
{/if}
