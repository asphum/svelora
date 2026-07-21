<script lang="ts" module>
    import type { PasswordInputProps } from './password-input.types.js'

    export type Props = PasswordInputProps
</script>

<script lang="ts">
    import { getComponentConfig } from '../../config.js'
    import Icon from '../Icon/Icon.svelte'
    import Input from '../Input/Input.svelte'
    import { passwordInputVariants, passwordInputDefaults } from './password-input.variants.js'

    const config = getComponentConfig('passwordInput', passwordInputDefaults)

    let {
        ref = $bindable(null),
        value = $bindable(''),
        showStrength = false,
        strengthFn,
        strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'],
        segmentIcon,
        maskChar = '✦',
        hideIcon = 'lucide:eye-off',
        showIcon = 'lucide:eye',
        hideLabel = 'Hide password',
        showLabel = 'Show password',
        size = config.defaultVariants.size ?? 'md',
        color = config.defaultVariants.color ?? 'primary',
        variant = config.defaultVariants.variant ?? 'outline',
        class: className,
        ui,
        ...restProps
    }: Props = $props()

    let isVisible = $state(false)

    function toggleVisibility() {
        isVisible = !isVisible
    }

    const useMaskChar = $derived(maskChar && maskChar !== '•' && !isVisible)

    let displayValue = $state('')

    $effect(() => {
        const val = String(value ?? '')
        if (useMaskChar) {
            displayValue = (maskChar ?? '✦').repeat(val.length)
        } else {
            displayValue = val
        }
    })

    function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
        if (useMaskChar) {
            const input = e.currentTarget
            const newStr = input.value
            const oldVal = String(value ?? '')
            const char = maskChar ?? '✦'
            const oldMask = char.repeat(oldVal.length)

            const cursorPos = input.selectionStart ?? newStr.length
            const delta = newStr.length - oldMask.length

            if (delta > 0) {
                const inserted = newStr.slice(cursorPos - delta, cursorPos)
                const start = cursorPos - delta
                value = oldVal.slice(0, start) + inserted + oldVal.slice(start)
            } else if (delta < 0) {
                const delCount = -delta
                value = oldVal.slice(0, cursorPos) + oldVal.slice(cursorPos + delCount)
            } else if (cursorPos > 0) {
                const inserted = newStr[cursorPos - 1]
                if (inserted && inserted !== char) {
                    value = oldVal.slice(0, cursorPos - 1) + inserted + oldVal.slice(cursorPos)
                }
            }

            const updatedVal = String(value ?? '')
            displayValue = char.repeat(updatedVal.length)
            input.value = displayValue
            try {
                input.setSelectionRange(cursorPos, cursorPos)
            } catch {
                // Ignore if not focused
            }
        } else {
            value = e.currentTarget.value
        }
    }

    // Built-in strength heuristic: returns -1 when empty, 0–4 otherwise.
    function calculateStrength(pwd: string): number {
        if (!pwd) return -1
        let score = 0
        if (pwd.length >= 8) score += 1
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1
        if (/[0-9]/.test(pwd)) score += 1
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1
        return score
    }

    const strength = $derived(
        strengthFn ? strengthFn(String(value ?? '')) : calculateStrength(String(value ?? ''))
    )

    function getSegmentBgColor(index: number, currentStrength: number): string {
        if (currentStrength <= 0 || index >= currentStrength) {
            return 'bg-surface-200 dark:bg-surface-700'
        }
        if (currentStrength === 1) return 'bg-error-500'
        if (currentStrength === 2) return 'bg-warning-500'
        if (currentStrength === 3) return 'bg-success-400'
        return 'bg-success-500'
    }

    function getSegmentTextColor(index: number, currentStrength: number): string {
        if (currentStrength <= 0 || index >= currentStrength) {
            return 'text-surface-200 dark:text-surface-700'
        }
        if (currentStrength === 1) return 'text-error-500'
        if (currentStrength === 2) return 'text-warning-500'
        if (currentStrength === 3) return 'text-success-400'
        return 'text-success-500'
    }

    const variantSlots = $derived(passwordInputVariants({ size, color, variant }))
    const classes = $derived({
        root: variantSlots.root({ class: [config.slots.root, className, ui?.root] }),
        inputWrapper: variantSlots.inputWrapper({ class: [config.slots.inputWrapper, ui?.inputWrapper] }),
        toggleBtn: variantSlots.toggleBtn({ class: [config.slots.toggleBtn, ui?.toggleBtn] }),
        toggleIcon: variantSlots.toggleIcon({ class: [config.slots.toggleIcon, ui?.toggleIcon] }),
        meterWrapper: variantSlots.meterWrapper({ class: [config.slots.meterWrapper, ui?.meterWrapper] }),
        meterSegment: variantSlots.meterSegment({ class: [config.slots.meterSegment, ui?.meterSegment] }),
        meterIcon: variantSlots.meterIcon({ class: [config.slots.meterIcon, ui?.meterIcon] }),
        strengthText: variantSlots.strengthText({ class: [config.slots.strengthText, ui?.strengthText] })
    })
</script>

<div class={classes.root}>
    <div class={classes.inputWrapper}>
        <Input
            {...restProps}
            bind:ref
            value={useMaskChar ? displayValue : value}
            {size}
            {color}
            {variant}
            type={useMaskChar || isVisible ? 'text' : 'password'}
            class="w-full"
            oninput={handleInput}
            ui={{
                base: ui?.base,
                root: ui?.inputRoot,
                leading: ui?.leading,
                leadingIcon: ui?.leadingIcon,
                trailing: ui?.trailing,
                trailingIcon: ui?.trailingIcon
            }}
            trailing
        />

        <button
            type="button"
            class={classes.toggleBtn}
            onclick={toggleVisibility}
            aria-label={isVisible ? hideLabel : showLabel}
            aria-pressed={isVisible}
        >
            {#if isVisible}
                <Icon name={hideIcon} class={classes.toggleIcon} />
            {:else}
                <Icon name={showIcon} class={classes.toggleIcon} />
            {/if}
        </button>
    </div>

    {#if showStrength && String(value ?? '').length > 0}
        <div>
            <div class={classes.meterWrapper}>
                {#each { length: 4 } as _, i}
                    {#if segmentIcon}
                        <Icon
                            name={segmentIcon}
                            class="{classes.meterIcon} {getSegmentTextColor(i, strength)}"
                        />
                    {:else}
                        <div class="{classes.meterSegment} {getSegmentBgColor(i, strength)}"></div>
                    {/if}
                {/each}
            </div>
            <p class={classes.strengthText}>
                {strengthLabels[Math.max(0, strength)]}
            </p>
        </div>
    {/if}
</div>

