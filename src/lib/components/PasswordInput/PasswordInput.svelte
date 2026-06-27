<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import Icon from '../Icon/Icon.svelte'
    import Input from '../Input/Input.svelte'
    import type { PasswordInputProps } from './password-input.types.js'
    import { passwordInputVariants } from './password-input.variants.js'

    let {
        value = $bindable(''),
        showStrength = false,
        strengthFn,
        strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'],
        class: className,
        ...restProps
    }: PasswordInputProps = $props()

    let styles = $derived(passwordInputVariants())
    
    let isVisible = $state(false)

    function toggleVisibility() {
        isVisible = !isVisible
    }

    // Basic strength calculation if none provided
    function calculateStrength(pwd: string): number {
        if (!pwd) return -1
        let score = 0
        if (pwd.length > 8) score += 1
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1
        if (/[0-9]/.test(pwd)) score += 1
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1
        return score
    }

    let strength = $derived(strengthFn ? strengthFn(String(value ?? '')) : calculateStrength(String(value ?? '')))
    
    // Colors for the 4 segments based on current strength
    function getSegmentColor(index: number, currentStrength: number) {
        if (currentStrength === -1 || index > currentStrength) return 'bg-surface-200 dark:bg-surface-700'
        
        if (currentStrength === 0) return 'bg-error-500' // 1 segment red
        if (currentStrength === 1) return 'bg-warning-500' // 2 segments orange
        if (currentStrength === 2) return 'bg-success-400' // 3 segments light green
        return 'bg-success-500' // 4 segments green
    }
</script>

<div class={twMerge(styles.wrapper() as string, className)}>
    <div class={styles.inputWrapper() as string}>
        <Input 
            {...restProps as any}
            bind:value 
            type={isVisible ? 'text' : 'password'}
            class="w-full pr-10"
        />
        
        <button
            type="button"
            class={styles.toggleBtn() as string}
            onclick={toggleVisibility}
            tabindex="-1"
            aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
            {#if isVisible}
                <Icon name="lucide:eye-off" class="w-5 h-5" />
            {:else}
                <Icon name="lucide:eye" class="w-5 h-5" />
            {/if}
        </button>
    </div>

    {#if showStrength && String(value ?? '').length > 0}
        <div>
            <div class={styles.meterWrapper() as string}>
                {#each Array(4) as _, i}
                    <div class={twMerge(styles.meterSegment() as string, getSegmentColor(i, strength))}></div>
                {/each}
            </div>
            <div class={styles.strengthText() as string}>
                {strengthLabels[Math.max(0, strength)]}
            </div>
        </div>
    {/if}
</div>
