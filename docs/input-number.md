# InputNumber

A numeric input component with increment/decrement buttons, supporting size and color variants, min/max boundaries, step increments, error highlighting, and full slot customization.

## Usage

```svelte
<script lang="ts">
    import { InputNumber } from 'svelora'

    let qty = $state(5)
</script>

<InputNumber bind:value={qty} min={0} max={10} />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current numeric value (two-way bindable via `bind:value`). |
| `min` | `number` | `undefined` | Minimum allowed value. |
| `max` | `number` | `undefined` | Maximum allowed value. |
| `step` | `number` | `1` | Amount to change on each button press. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Controls padding and font size. |
| `color` | `'primary' \| 'secondary' \| 'tertiary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Determines the focus ring color. |
| `disabled` | `boolean` | `false` | Disables the input and both buttons. |
| `highlight` | `boolean` | `false` | Forces the colored ring to always show (useful for error states). |
| `placeholder` | `string` | `''` | Placeholder text when empty. |
| `ref` | `HTMLDivElement \| null` | `null` | Bindable reference to the root `<div>` element. |
| `class` | `ClassNameValue` | `undefined` | Additional CSS class for the root element. |
| `ui` | `Partial<Record<InputNumberSlots, ClassNameValue>>` | `undefined` | Override classes for individual slots. |

All other HTML input attributes (`id`, `name`, `aria-*`, etc.) are forwarded to the inner `<input>` element via `...restProps`.

## Examples

### Basic

```svelte
<InputNumber bind:value={qty} />
```

### With min, max, and step

```svelte
<InputNumber bind:value={qty} min={0} max={100} step={5} />
```

### Size variants

```svelte
<InputNumber size="xs" />
<InputNumber size="sm" />
<InputNumber size="md" />
<InputNumber size="lg" />
<InputNumber size="xl" />
```

### Color variants

```svelte
<InputNumber color="primary" />
<InputNumber color="secondary" />
<InputNumber color="error" />
```

### Disabled state

```svelte
<InputNumber disabled />
```

### Error / highlight state

```svelte
<InputNumber color="error" highlight />
```

### Custom slot classes (via `ui`)

```svelte
<InputNumber
    ui={{
        root: 'w-40',
        input: 'font-mono text-center',
        button: 'bg-primary text-on-primary'
    }}
/>
```

### DOM ref

```svelte
<script lang="ts">
    let ref: HTMLDivElement | null = null
</script>

<InputNumber bind:ref />
```

## Slots

| Slot | Description |
|---|---|
| `root` | Outer flex container wrapping the buttons and input. |
| `input` | The `<input type="number">` element. |
| `button` | Both increment and decrement `<button>` elements. |

## Styling

The component uses [tailwind-variants](https://www.tailwind-variants.org/) internally.
Use the `ui` prop to override Tailwind classes per slot, or the `class` prop for the root element.

## Global Config

You can configure defaults globally via `defineConfig`:

```ts
import { defineConfig } from 'svelora'

defineConfig({
    inputNumber: {
        defaultVariants: { size: 'lg', color: 'secondary' },
        slots: { button: 'rounded-full' }
    }
})
```

## Accessibility

- The decrement button has `aria-label="Decrease value"`.
- The increment button has `aria-label="Increase value"`.
- The inner input has `aria-label="Number input"` by default; override it via the `aria-label` prop which is forwarded to the input.
- Both buttons use `type="button"` to avoid unintentional form submission.

## Testing

The component is covered by `InputNumber.svelte.spec.ts` using Vitest and `vitest-browser-svelte`, testing:

- Rendering of root, input, and buttons
- Default value and step
- Props forwarding (`min`, `max`, `step`, `placeholder`)
- Disabled state
- Size and highlight variant classes
- `ui` slot overrides
- Accessibility attributes
