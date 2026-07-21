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
        hideIcon = 'lucide:eye-off',
        showIcon = 'lucide:eye',
        hideLabel = 'Hide password',
        showLabel = 'Show password',
        size = config.defaultVariants.size ?? 'md',
        class: className,
        ui,
        ...restProps
    }: Props = $props()

    let isVisible = $state(false)

    function toggleVisibility() {
        isVisible = !isVisible
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

    /**
     * Map the filled-segment index to a colour class.
     * strength -1 → no value yet; 0 → very weak (1 red segment); …; 4 → strong (4 green segments).
     * Segment i is "filled" when  i < strength.
     */
    function getSegmentColor(index: number, currentStrength: number): string {
        if (currentStrength <= 0 || index >= currentStrength) {
            return 'bg-surface-200 dark:bg-surface-700'
        }
        if (currentStrength === 1) return 'bg-error-500'    // 1 filled — very weak
        if (currentStrength === 2) return 'bg-warning-500'  // 2 filled — weak/fair
        if (currentStrength === 3) return 'bg-success-400'  // 3 filled — good
        return 'bg-success-500'                              // 4 filled — strong
    }

    const variantSlots = $derived(passwordInputVariants({ size }))
    const classes = $derived({
        root: variantSlots.root({ class: [config.slots.root, className, ui?.root] }),
        inputWrapper: variantSlots.inputWrapper({ class: [config.slots.inputWrapper, ui?.inputWrapper] }),
        toggleBtn: variantSlots.toggleBtn({ class: [config.slots.toggleBtn, ui?.toggleBtn] }),
        toggleIcon: variantSlots.toggleIcon({ class: [config.slots.toggleIcon, ui?.toggleIcon] }),
        meterWrapper: variantSlots.meterWrapper({ class: [config.slots.meterWrapper, ui?.meterWrapper] }),
        meterSegment: variantSlots.meterSegment({ class: [config.slots.meterSegment, ui?.meterSegment] }),
        strengthText: variantSlots.strengthText({ class: [config.slots.strengthText, ui?.strengthText] })
    })
</script>

<div class={classes.root}>
    <div class={classes.inputWrapper}>
        <!--
            Pass only Input-scoped ui slots (base, root, leading, trailing, …).
            PasswordInput-only slots (toggleBtn, meterWrapper, etc.) are kept separate.
        -->
        <Input
            {...restProps}
            bind:ref
            bind:value
            {size}
            type={isVisible ? 'text' : 'password'}
            class="w-full"
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
                    <div class="{classes.meterSegment} {getSegmentColor(i, strength)}"></div>
                {/each}
            </div>
            <p class={classes.strengthText}>
                {strengthLabels[Math.max(0, strength)]}
            </p>
        </div>
    {/if}
</div>
