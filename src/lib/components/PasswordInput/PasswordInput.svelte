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
        maskIcon,
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
     * Returns a Tailwind `bg-*` colour class for filled bar segments.
     * Segment i is "filled" when i < strength.
     */
    function getSegmentBgColor(index: number, currentStrength: number): string {
        if (currentStrength <= 0 || index >= currentStrength) {
            return 'bg-surface-200 dark:bg-surface-700'
        }
        if (currentStrength === 1) return 'bg-error-500'    // 1 filled — very weak
        if (currentStrength === 2) return 'bg-warning-500'  // 2 filled — weak/fair
        if (currentStrength === 3) return 'bg-success-400'  // 3 filled — good
        return 'bg-success-500'                              // 4 filled — strong
    }

    /**
     * Returns a Tailwind `text-*` colour class for icon mode segments.
     */
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
        strengthText: variantSlots.strengthText({ class: [config.slots.strengthText, ui?.strengthText] }),
        maskOverlay: variantSlots.maskOverlay({ class: [config.slots.maskOverlay, ui?.maskOverlay] }),
        maskIconItem: variantSlots.maskIconItem({ class: [config.slots.maskIconItem, ui?.maskIconItem] })
    })

    /** Number of characters in the current value — used to render mask icons. */
    const charCount = $derived(String(value ?? '').length)
</script>

<div class={classes.root}>
    <div class={classes.inputWrapper}>
        <!--
            Forward only Input-scoped ui slots. PasswordInput-only slots
            (toggleBtn, meterWrapper, etc.) are kept in `classes` above.
        -->
        <Input
            {...restProps}
            bind:ref
            bind:value
            {size}
            {color}
            {variant}
            type={maskIcon || isVisible ? 'text' : 'password'}
            class="w-full"
            ui={{
                base: maskIcon && !isVisible
                    ? [ui?.base, 'text-transparent caret-current']
                    : ui?.base,
                root: ui?.inputRoot,
                leading: ui?.leading,
                leadingIcon: ui?.leadingIcon,
                trailing: ui?.trailing,
                trailingIcon: ui?.trailingIcon
            }}
            trailing
        />

        <!--
            maskIcon overlay: an absolutely-positioned row of icons rendered
            on top of the transparent input text when hidden.
            pointer-events-none ensures all keyboard/mouse events reach the real input.
        -->
        {#if maskIcon && !isVisible}
            <div class={classes.maskOverlay} aria-hidden="true">
                {#each { length: charCount } as _}
                    <Icon name={maskIcon} class={classes.maskIconItem} />
                {/each}
            </div>
        {/if}

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
                        <!-- Icon mode: four icons coloured by strength level -->
                        <Icon
                            name={segmentIcon}
                            class="{classes.meterIcon} {getSegmentTextColor(i, strength)}"
                        />
                    {:else}
                        <!-- Bar mode (default): coloured filled rectangles -->
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
