<script lang="ts" module>
    import type { InputNumberProps } from './inputNumber.types.js'

    export type Props = InputNumberProps
</script>

<script lang="ts">
    import { getComponentConfig } from '../../config.js'
    import { inputNumberDefaults, inputNumberVariants } from './inputNumber.variants.js'

    const config = getComponentConfig('inputNumber', inputNumberDefaults)

    let {
        ref = $bindable(null),
        value = $bindable(0),
        min = undefined,
        max = undefined,
        step = 1,
        color = config.defaultVariants.color,
        size = config.defaultVariants.size,
        disabled = false,
        placeholder = '',
        highlight = false,
        class: className,
        ui,
        ...restProps
    }: Props = $props()

    const classes = $derived.by(() => {
        const slots = inputNumberVariants({ color, size, highlight })
        return {
            root: slots.root({ class: [config.slots.root, className, ui?.root] }),
            input: slots.input({ class: [config.slots.input, ui?.input] }),
            button: slots.button({ class: [config.slots.button, ui?.button] })
        }
    })

    function inc() {
        if (disabled) return
        value = max !== undefined ? Math.min(value + step, max) : value + step
    }

    function dec() {
        if (disabled) return
        value = min !== undefined ? Math.max(value - step, min) : value - step
    }
</script>

<div bind:this={ref} class={classes.root}>
    <button type="button" class={classes.button} onclick={dec} {disabled} aria-label="Decrease value">
        -
    </button>
    <input
        {...restProps}
        type="number"
        bind:value
        {min}
        {max}
        {step}
        class={classes.input}
        {placeholder}
        {disabled}
        aria-label="Number input"
    />
    <button type="button" class={classes.button} onclick={inc} {disabled} aria-label="Increase value">
        +
    </button>
</div>
