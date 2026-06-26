<script lang="ts" module>
    import type { IconProps } from './icon.types.js'

    export type Props = IconProps
</script>

<script lang="ts">
    import Iconify from '@iconify/svelte'
    import { twMerge } from 'tailwind-merge'
    import { getComponentConfig, iconsDefaults } from '../config.js'

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

    // Automatically map "lucide:bell" to "icon-[lucide--bell]" if using tailwind provider
    const tailwindClass = $derived(
        name.startsWith('icon-') || name.startsWith('i-')
            ? name
            : `icon-[${name.replace(':', '--')}]`
    )

    // Resolve size value for inline styles
    const sizeStyle = $derived(typeof size === 'number' ? `${size}px` : size)
</script>

{#if provider === 'tailwind'}
    <span
        class={twMerge(tailwindClass, iconClass)}
        style:width={sizeStyle}
        style:height={sizeStyle}
        style:color={color}
        style:transform={rotateValue ? `rotate(${rotateValue * 90}deg)` : undefined}
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
