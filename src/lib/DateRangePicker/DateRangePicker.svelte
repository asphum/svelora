<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { DateFormatter, type DateValue } from '@internationalized/date'
    import Icon from '../Icon/Icon.svelte'
    import Popover from '../Popover/Popover.svelte'
    import Calendar from '../Calendar/Calendar.svelte'
    import type { DateRangePickerProps } from './date-range-picker.types.js'
    import { dateRangePickerVariants } from './date-range-picker.variants.js'

    let {
        value = $bindable({ start: undefined, end: undefined }),
        placeholder = 'Select date range',
        numberOfMonths = 2,
        disabled = false,
        class: className,
        onchange,
        ...restProps
    }: DateRangePickerProps = $props()

    let styles = $derived(dateRangePickerVariants({ disabled }))
    
    // Internal state for popover
    let open = $state(false)

    // Formatter for displaying dates
    const df = new DateFormatter('en-US', {
        dateStyle: 'medium'
    })

    let displayText = $derived.by(() => {
        if (value.start) {
            if (value.end) {
                return `${df.format(value.start.toDate('UTC'))} - ${df.format(value.end.toDate('UTC'))}`
            }
            return df.format(value.start.toDate('UTC'))
        }
        return placeholder
    })

    function handleDateChange(v: unknown) {
        // Range calendar passes an object with start/end
        const rangeValue = v as { start: DateValue | undefined, end: DateValue | undefined }
        value = rangeValue
        onchange?.(rangeValue)
    }
</script>

<Popover bind:open>
    {#snippet children({ open })}
        <button
            type="button"
            class={twMerge(styles.trigger() as string, className, !value.start && 'text-surface-500')}
            {disabled}
            {...restProps}
        >
            <div class="flex items-center gap-2 overflow-hidden">
                <Icon name="lucide:calendar" class={styles.icon() as string} />
                <span class={styles.triggerText() as string}>{displayText}</span>
            </div>
            <Icon name="lucide:chevron-down" class={styles.icon() as string} />
        </button>
    {/snippet}

    {#snippet content()}
        <div class={styles.popoverContent() as string}>
            <Calendar 
                range={true}
                value={value as any}
                {numberOfMonths}
                onValueChange={handleDateChange}
            />
        </div>
    {/snippet}
</Popover>
