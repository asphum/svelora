<script lang="ts" module>
import type { ToasterProps } from './toast.types.js'

export type Props = ToasterProps
</script>

<script lang="ts">
import InternalToaster from './internal/french-toast/components/Toaster.svelte'
import { getComponentConfig } from '../../config.js'
import { toastDefaults } from './toast.variants.js'

const config = getComponentConfig('toast', toastDefaults)

let {
    variant = config.defaultVariants.variant,
    position = 'bottom-right',
    visibleToasts: _visibleToasts = 3,
    duration = 5000,
    closeButton = true,
    expand: _expand = false,
    gap = 14,
    class: className,
    theme = 'light',
    reverseOrder = false,
    toastOptions,
    successIcon,
    errorIcon,
    warningIcon,
    infoIcon,
    loadingIcon,
    closeIcon
}: Props = $props()

const toasterClass = $derived([`ps-toast-${variant}`, className].filter(Boolean).join(' '))
const mergedToastOptions = $derived({
    duration,
    ...toastOptions
})
</script>

<InternalToaster
    {position}
    {closeButton}
    gutter={gap}
    {theme}
    {reverseOrder}
    containerClassName={toasterClass}
    toastOptions={mergedToastOptions}
    iconTone={variant === 'solid' ? 'on-color' : 'standard'}
    {successIcon}
    {errorIcon}
    {warningIcon}
    {infoIcon}
    {loadingIcon}
    {closeIcon}
/>

<style>
    /* ============================================
     * BASE OVERRIDES — applied to all variants
     *
     * Selector: [data-svelora-toaster] with our variant class.
     * Toaster renders via portal, so we use :global() selectors
     * scoped by our variant class on the toaster <ol> element.
     * ============================================ */

    :global([data-svelora-toaster][class*='ps-toast-'] [data-svelora-toast][data-styled='true']) {
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        min-width: min(100%, 18.5rem);
        max-width: 24rem;
        padding: 0.75rem 2.5rem 0.75rem 0.875rem;
        border-radius: 0.75rem;
        box-shadow:
            0 1px 3px oklch(0 0 0 / 0.08),
            0 1px 2px oklch(0 0 0 / 0.05);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-content]
    ) {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        flex: 1 1 auto;
        min-width: 0;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-icon]
    ) {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-icon]:has([data-avatar-root])
    ) {
        width: auto;
        height: auto;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-title]
    ) {
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-description]
    ) {
        font-size: 0.8125rem;
        line-height: 1.25rem;
        font-weight: 400;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-button]
    ) {
        font-weight: 600;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        padding: 0 0.625rem;
        height: 1.625rem;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-close-button]
    ) {
        position: absolute;
        top: 0.625rem;
        right: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.375rem;
        height: 1.375rem;
        padding: 0;
        border-radius: 50%;
        border: 1px solid transparent;
        cursor: pointer;
        line-height: 1;
        font-size: 0.875rem;
        transition:
            opacity 150ms,
            background-color 150ms,
            border-color 150ms;
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-close-button]:hover
    ) {
        opacity: 1;
    }

    /* ============================================
     * SHARED — CSS custom properties per toast type
     * ============================================ */

    :global([data-svelora-toaster][class*='ps-toast-'] [data-svelora-toast][data-styled='true']) {
        background-color: var(--toast-bg);
        border: 1px solid var(--toast-border);
        color: var(--toast-color);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-description]
    ) {
        color: var(--toast-desc);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-icon]
    ) {
        color: var(--toast-icon, inherit);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-title]
    ) {
        color: var(--toast-title, inherit);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-button]
    ) {
        background-color: var(--toast-action-bg);
        color: var(--toast-action-color);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-cancel]
    ) {
        background-color: var(--toast-cancel-bg);
        color: var(--toast-cancel-color);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']
            [data-close-button]
    ) {
        background-color: var(--toast-close-bg);
        border-color: var(--toast-close-border);
        color: var(--toast-close-color);
    }

    :global(
        [data-svelora-toaster][class*='ps-toast-']
            [data-svelora-toast][data-styled='true']:hover
            [data-close-button]:hover
    ) {
        background-color: var(--toast-close-hover-bg);
    }

    /* ============================================
     * OUTLINE VARIANT
     * ============================================ */
    :global([data-svelora-toaster].ps-toast-outline [data-svelora-toast][data-styled='true']) {
        --toast-bg: var(--color-surface-container-lowest);
        --toast-border: var(--color-outline-variant);
        --toast-color: var(--color-on-surface);
        --toast-desc: var(--color-on-surface-variant);
        --toast-icon: var(--color-on-surface-variant);
        --toast-title: var(--color-on-surface);
        --toast-action-bg: var(--color-primary);
        --toast-action-color: var(--color-on-primary);
        --toast-cancel-bg: var(--color-surface-container-highest);
        --toast-cancel-color: var(--color-on-surface);
        --toast-close-bg: var(--color-surface-container-highest);
        --toast-close-border: transparent;
        --toast-close-color: var(--color-on-surface-variant);
        --toast-close-hover-bg: var(--color-surface-container-high);
    }

    :global(
        [data-svelora-toaster].ps-toast-outline
            [data-svelora-toast][data-type='success'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-success) l c h / 0.07);
        --toast-border: oklch(from var(--color-success) l c h / 0.55);
        --toast-icon: var(--color-success);
        --toast-title: var(--color-success);
        --toast-desc: var(--color-on-surface-variant);
    }

    :global(
        [data-svelora-toaster].ps-toast-outline
            [data-svelora-toast][data-type='error'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-error) l c h / 0.07);
        --toast-border: oklch(from var(--color-error) l c h / 0.55);
        --toast-icon: var(--color-error);
        --toast-title: var(--color-error);
        --toast-desc: var(--color-on-surface-variant);
    }

    :global(
        [data-svelora-toaster].ps-toast-outline
            [data-svelora-toast][data-type='warning'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-warning) l c h / 0.07);
        --toast-border: oklch(from var(--color-warning) l c h / 0.55);
        --toast-icon: var(--color-warning);
        --toast-title: var(--color-warning);
        --toast-desc: var(--color-on-surface-variant);
    }

    :global(
        [data-svelora-toaster].ps-toast-outline
            [data-svelora-toast][data-type='info'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-info) l c h / 0.07);
        --toast-border: oklch(from var(--color-info) l c h / 0.55);
        --toast-icon: var(--color-info);
        --toast-title: var(--color-info);
        --toast-desc: var(--color-on-surface-variant);
    }

    /* ============================================
     * SOFT VARIANT
     * ============================================ */
    :global([data-svelora-toaster].ps-toast-soft [data-svelora-toast][data-styled='true']) {
        --toast-bg: var(--color-surface-container-high);
        --toast-border: transparent;
        --toast-color: var(--color-on-surface);
        --toast-desc: var(--color-on-surface-variant);
        --toast-icon: inherit;
        --toast-title: inherit;
        --toast-action-bg: var(--color-primary);
        --toast-action-color: var(--color-on-primary);
        --toast-cancel-bg: var(--color-surface-container-highest);
        --toast-cancel-color: var(--color-on-surface);
        --toast-close-bg: var(--color-surface-container-high);
        --toast-close-border: transparent;
        --toast-close-color: var(--color-on-surface-variant);
        --toast-close-hover-bg: var(--color-surface-container-highest);
    }

    :global(
        [data-svelora-toaster].ps-toast-soft
            [data-svelora-toast][data-type='success'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-success) l c h / 0.1);
        --toast-color: var(--color-success);
        --toast-desc: oklch(from var(--color-success) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-success) l c h / 0.1);
        --toast-close-color: var(--color-success);
    }

    :global(
        [data-svelora-toaster].ps-toast-soft
            [data-svelora-toast][data-type='error'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-error) l c h / 0.1);
        --toast-color: var(--color-error);
        --toast-desc: oklch(from var(--color-error) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-error) l c h / 0.1);
        --toast-close-color: var(--color-error);
    }

    :global(
        [data-svelora-toaster].ps-toast-soft
            [data-svelora-toast][data-type='warning'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-warning) l c h / 0.1);
        --toast-color: var(--color-warning);
        --toast-desc: oklch(from var(--color-warning) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-warning) l c h / 0.1);
        --toast-close-color: var(--color-warning);
    }

    :global(
        [data-svelora-toaster].ps-toast-soft
            [data-svelora-toast][data-type='info'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-info) l c h / 0.1);
        --toast-color: var(--color-info);
        --toast-desc: oklch(from var(--color-info) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-info) l c h / 0.1);
        --toast-close-color: var(--color-info);
    }

    /* ============================================
     * SUBTLE VARIANT
     * ============================================ */
    :global([data-svelora-toaster].ps-toast-subtle [data-svelora-toast][data-styled='true']) {
        --toast-bg: var(--color-surface-container-high);
        --toast-border: var(--color-outline-variant);
        --toast-color: var(--color-on-surface);
        --toast-desc: var(--color-on-surface-variant);
        --toast-icon: inherit;
        --toast-title: inherit;
        --toast-action-bg: var(--color-primary);
        --toast-action-color: var(--color-on-primary);
        --toast-cancel-bg: var(--color-surface-container-highest);
        --toast-cancel-color: var(--color-on-surface);
        --toast-close-bg: var(--color-surface-container-high);
        --toast-close-border: var(--color-outline-variant);
        --toast-close-color: var(--color-on-surface-variant);
        --toast-close-hover-bg: var(--color-surface-container-highest);
    }

    :global(
        [data-svelora-toaster].ps-toast-subtle
            [data-svelora-toast][data-type='success'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-success) l c h / 0.1);
        --toast-border: oklch(from var(--color-success) l c h / 0.3);
        --toast-color: var(--color-success);
        --toast-desc: oklch(from var(--color-success) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-success) l c h / 0.1);
        --toast-close-border: oklch(from var(--color-success) l c h / 0.3);
        --toast-close-color: var(--color-success);
    }

    :global(
        [data-svelora-toaster].ps-toast-subtle
            [data-svelora-toast][data-type='error'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-error) l c h / 0.1);
        --toast-border: oklch(from var(--color-error) l c h / 0.3);
        --toast-color: var(--color-error);
        --toast-desc: oklch(from var(--color-error) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-error) l c h / 0.1);
        --toast-close-border: oklch(from var(--color-error) l c h / 0.3);
        --toast-close-color: var(--color-error);
    }

    :global(
        [data-svelora-toaster].ps-toast-subtle
            [data-svelora-toast][data-type='warning'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-warning) l c h / 0.1);
        --toast-border: oklch(from var(--color-warning) l c h / 0.3);
        --toast-color: var(--color-warning);
        --toast-desc: oklch(from var(--color-warning) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-warning) l c h / 0.1);
        --toast-close-border: oklch(from var(--color-warning) l c h / 0.3);
        --toast-close-color: var(--color-warning);
    }

    :global(
        [data-svelora-toaster].ps-toast-subtle
            [data-svelora-toast][data-type='info'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--color-info) l c h / 0.1);
        --toast-border: oklch(from var(--color-info) l c h / 0.3);
        --toast-color: var(--color-info);
        --toast-desc: oklch(from var(--color-info) l c h / 0.8);
        --toast-close-bg: oklch(from var(--color-info) l c h / 0.1);
        --toast-close-border: oklch(from var(--color-info) l c h / 0.3);
        --toast-close-color: var(--color-info);
    }

    /* ============================================
     * SOLID VARIANT
     * ============================================ */
    :global([data-svelora-toaster].ps-toast-solid [data-svelora-toast][data-styled='true']) {
        --toast-bg: var(--color-inverse-surface);
        --toast-border: transparent;
        --toast-color: var(--color-inverse-on-surface);
        --toast-desc: var(--color-inverse-on-surface);
        --toast-icon: var(--color-inverse-on-surface);
        --toast-title: var(--color-inverse-on-surface);
        --toast-action-bg: oklch(from var(--color-inverse-on-surface) l c h / 0.2);
        --toast-action-color: var(--color-inverse-on-surface);
        --toast-cancel-bg: oklch(from var(--color-inverse-on-surface) l c h / 0.1);
        --toast-cancel-color: var(--color-inverse-on-surface);
        --toast-close-bg: var(--color-inverse-surface);
        --toast-close-border: oklch(from var(--color-inverse-on-surface) l c h / 0.2);
        --toast-close-color: var(--color-inverse-on-surface);
        --toast-close-hover-bg: oklch(from var(--color-inverse-on-surface) l c h / 0.1);
    }

    :global(
        [data-svelora-toaster].ps-toast-solid
            [data-svelora-toast][data-styled='true']
            [data-description]
    ) {
        opacity: 0.8;
    }

    :global(
        [data-svelora-toaster].ps-toast-solid
            [data-svelora-toast][data-type='success'][data-styled='true']
    ) {
        --toast-bg: var(--color-success);
        --toast-color: var(--color-on-success);
        --toast-desc: var(--color-on-success);
        --toast-icon: var(--color-on-success);
        --toast-title: var(--color-on-success);
        --toast-close-bg: var(--color-success);
        --toast-close-color: var(--color-on-success);
    }

    :global(
        [data-svelora-toaster].ps-toast-solid
            [data-svelora-toast][data-type='error'][data-styled='true']
    ) {
        --toast-bg: var(--color-error);
        --toast-color: var(--color-on-error);
        --toast-desc: var(--color-on-error);
        --toast-icon: var(--color-on-error);
        --toast-title: var(--color-on-error);
        --toast-close-bg: var(--color-error);
        --toast-close-color: var(--color-on-error);
    }

    :global(
        [data-svelora-toaster].ps-toast-solid
            [data-svelora-toast][data-type='warning'][data-styled='true']
    ) {
        --toast-bg: var(--color-warning);
        --toast-color: var(--color-on-warning);
        --toast-desc: var(--color-on-warning);
        --toast-icon: var(--color-on-warning);
        --toast-title: var(--color-on-warning);
        --toast-close-bg: var(--color-warning);
        --toast-close-color: var(--color-on-warning);
    }

    :global(
        [data-svelora-toaster].ps-toast-solid
            [data-svelora-toast][data-type='info'][data-styled='true']
    ) {
        --toast-bg: var(--color-info);
        --toast-color: var(--color-on-info);
        --toast-desc: var(--color-on-info);
        --toast-icon: var(--color-on-info);
        --toast-title: var(--color-on-info);
        --toast-close-bg: var(--color-info);
        --toast-close-color: var(--color-on-info);
    }

    /* ============================================
     * ACCENT VARIANT — left border accent strip
     * ============================================ */
    :global([data-svelora-toaster].ps-toast-accent [data-svelora-toast][data-styled='true']) {
        --toast-bg: var(--color-surface-container);
        --toast-border: var(--color-outline-variant);
        --toast-color: var(--color-on-surface);
        --toast-desc: var(--color-on-surface-variant);
        --toast-icon: inherit;
        --toast-title: inherit;
        --toast-action-bg: var(--color-primary);
        --toast-action-color: var(--color-on-primary);
        --toast-cancel-bg: var(--color-surface-container-highest);
        --toast-cancel-color: var(--color-on-surface);
        --toast-close-bg: var(--color-surface-container);
        --toast-close-border: var(--color-outline-variant);
        --toast-close-color: var(--color-on-surface-variant);
        --toast-close-hover-bg: var(--color-surface-container-highest);
        border-left: 3px solid var(--color-on-surface-variant);
        border-radius: 0.5rem;
    }

    :global(
        [data-svelora-toaster].ps-toast-accent
            [data-svelora-toast][data-type='success'][data-styled='true']
    ) {
        border-left-color: var(--color-success);
        --toast-icon: var(--color-success);
        --toast-title: var(--color-success);
    }

    :global(
        [data-svelora-toaster].ps-toast-accent
            [data-svelora-toast][data-type='error'][data-styled='true']
    ) {
        border-left-color: var(--color-error);
        --toast-icon: var(--color-error);
        --toast-title: var(--color-error);
    }

    :global(
        [data-svelora-toaster].ps-toast-accent
            [data-svelora-toast][data-type='warning'][data-styled='true']
    ) {
        border-left-color: var(--color-warning);
        --toast-icon: var(--color-warning);
        --toast-title: var(--color-warning);
    }

    :global(
        [data-svelora-toaster].ps-toast-accent
            [data-svelora-toast][data-type='info'][data-styled='true']
    ) {
        border-left-color: var(--color-info);
        --toast-icon: var(--color-info);
        --toast-title: var(--color-info);
    }

    /* ============================================
     * COLOR CLASSES — per-toast color override via class
     * ============================================ */

    :global([data-svelora-toast].ps-color-primary) {
        --svelora-c: var(--color-primary);
        --svelora-c-on: var(--color-on-primary);
    }
    :global([data-svelora-toast].ps-color-secondary) {
        --svelora-c: var(--color-secondary);
        --svelora-c-on: var(--color-on-secondary);
    }
    :global([data-svelora-toast].ps-color-tertiary) {
        --svelora-c: var(--color-tertiary);
        --svelora-c-on: var(--color-on-tertiary);
    }
    :global([data-svelora-toast].ps-color-success) {
        --svelora-c: var(--color-success);
        --svelora-c-on: var(--color-on-success);
    }
    :global([data-svelora-toast].ps-color-warning) {
        --svelora-c: var(--color-warning);
        --svelora-c-on: var(--color-on-warning);
    }
    :global([data-svelora-toast].ps-color-error) {
        --svelora-c: var(--color-error);
        --svelora-c-on: var(--color-on-error);
    }
    :global([data-svelora-toast].ps-color-info) {
        --svelora-c: var(--color-info);
        --svelora-c-on: var(--color-on-info);
    }

    /* Outline + color class */
    :global(
        [data-svelora-toaster].ps-toast-outline
            [data-svelora-toast][class*='ps-color-'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--svelora-c) l c h / 0.07);
        --toast-border: oklch(from var(--svelora-c) l c h / 0.55);
        --toast-icon: var(--svelora-c);
        --toast-title: var(--svelora-c);
        --toast-desc: var(--color-on-surface-variant);
    }

    /* Soft + color class */
    :global(
        [data-svelora-toaster].ps-toast-soft
            [data-svelora-toast][class*='ps-color-'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--svelora-c) l c h / 0.1);
        --toast-color: var(--svelora-c);
        --toast-desc: oklch(from var(--svelora-c) l c h / 0.8);
        --toast-close-bg: oklch(from var(--svelora-c) l c h / 0.1);
        --toast-close-color: var(--svelora-c);
    }

    /* Subtle + color class */
    :global(
        [data-svelora-toaster].ps-toast-subtle
            [data-svelora-toast][class*='ps-color-'][data-styled='true']
    ) {
        --toast-bg: oklch(from var(--svelora-c) l c h / 0.1);
        --toast-border: oklch(from var(--svelora-c) l c h / 0.3);
        --toast-color: var(--svelora-c);
        --toast-desc: oklch(from var(--svelora-c) l c h / 0.8);
        --toast-close-bg: oklch(from var(--svelora-c) l c h / 0.1);
        --toast-close-border: oklch(from var(--svelora-c) l c h / 0.3);
        --toast-close-color: var(--svelora-c);
    }

    /* Solid + color class */
    :global(
        [data-svelora-toaster].ps-toast-solid
            [data-svelora-toast][class*='ps-color-'][data-styled='true']
    ) {
        --toast-bg: var(--svelora-c);
        --toast-color: var(--svelora-c-on);
        --toast-desc: var(--svelora-c-on);
        --toast-icon: var(--svelora-c-on);
        --toast-title: var(--svelora-c-on);
        --toast-close-bg: var(--svelora-c);
        --toast-close-color: var(--svelora-c-on);
    }

    /* Accent + color class */
    :global(
        [data-svelora-toaster].ps-toast-accent
            [data-svelora-toast][class*='ps-color-'][data-styled='true']
    ) {
        border-left-color: var(--svelora-c);
        --toast-icon: var(--svelora-c);
        --toast-title: var(--svelora-c);
    }
</style>
