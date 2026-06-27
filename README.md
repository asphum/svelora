<p align="center">
  <img src="https://img.shields.io/badge/Svelora-ff3e00?style=for-the-badge&logo=svelte&logoColor=white" alt="Svelora" />
</p>

<h1 align="center">Svelora</h1>

<p align="center">
  <strong>Modern UI component library for Svelte 5</strong><br/>
  Tailwind CSS 4 &middot; OKLCH Color Tokens &middot; Fully Typed &middot; 60+ Components &middot; 16 Hooks
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/svelora"><img src="https://img.shields.io/npm/v/svelora?style=flat-square&colorA=18181b&colorB=ff3e00" alt="npm" /></a>
  <a href="https://www.npmjs.com/package/svelora"><img src="https://img.shields.io/npm/dm/svelora?style=flat-square&colorA=18181b&colorB=ff3e00" alt="downloads" /></a>
  <a href="https://github.com/asphum/svelora/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/svelora?style=flat-square&colorA=18181b&colorB=ff3e00" alt="license" /></a>
</p>

<p align="center">
  <a href="https://svelora-ui.vercel.app/"><strong>Live Demo</strong></a> &middot;
  <a href="https://svelora-ui.vercel.app/docs/installation"><strong>Getting Started</strong></a> &middot;
  <a href="https://github.com/asphum/svelora/blob/main/CHANGELOG.md"><strong>Changelog</strong></a>
</p>

---

## Install

```bash
bun add svelora mode-watcher
# npm install svelora mode-watcher
# pnpm add svelora mode-watcher
# yarn add svelora mode-watcher
```

```svelte
<script lang="ts">
    import 'svelora/theme.css'
    import { ModeWatcher } from 'mode-watcher'
</script>

<ModeWatcher />
```

```css
/* layout.css */
@import 'svelora/theme.css';
```

```svelte
<script lang="ts">
    import { Avatar, Button, ThemeModeButton, toast } from 'svelora'
    import { ModeWatcher } from 'mode-watcher'
</script>

<ModeWatcher />
<Button variant="soft" color="primary" leadingIcon="lucide:edit">Edit</Button>
<ThemeModeButton />
<Avatar src="/photo.jpg" alt="Jane" size="lg" />
```

## Features

- **Svelte 5** — Runes, snippets, latest reactivity
- **Tailwind CSS 4** — Utility-first with [Tailwind Variants](https://www.tailwind-variants.org/)
- **Fully Typed** — Strict TypeScript, exported prop types
- **Accessible** — Built on [Bits UI](https://bits-ui.com) & [Vaul Svelte](https://vaul-svelte.com)
- **200,000+ Icons** — [Iconify](https://iconify.design) integration
- **Themeable** — OKLCH color tokens, light/dark mode, global config
- **Hooks** — 16 reactive hooks for common UI patterns

## Hooks

Reactive hooks built on Svelte 5 runes and actions.

```svelte
<script>
    import { useMediaQuery, useClipboard, useEventListener } from 'svelora'

    const isMobile = useMediaQuery('(max-width: 640px)')
    const clipboard = useClipboard()
    let width = $state(0)

    useEventListener(() => window, 'resize', () => {
        width = window.innerWidth
    })
</script>

{#if isMobile.matches}
    <MobileLayout />
{/if}

<Button onclick={() => clipboard.copy('Hello!')}>
    {clipboard.copied ? 'Copied!' : 'Copy'}
</Button>

<p>{width}px</p>
```

| Hook                | Type           | Description                                    |
| ------------------- | -------------- | ---------------------------------------------- |
| `useMediaQuery`     | Runes          | Reactive CSS media query tracking              |
| `useClipboard`      | Runes          | Copy text with auto-reset state                |
| `useFormField`      | Context        | Access FormField context from child components |
| `useClickOutside`   | Action         | Detect clicks outside an element               |
| `useInfiniteScroll` | Runes + Action | Auto-load on scroll with loading state         |
| `useEscapeKeydown`  | Action         | Listen for Escape key                          |
| `useDebounce`       | Runes          | Debounce with pending, cancel, flush           |
| `useDebouncedState` | Runes          | Bindable debounced state helper                |
| `useEventListener`  | Runes          | Reactive event listeners with cleanup          |
| `useResizeObserver` | Runes          | Observe element size changes                   |
| `useElementSize`    | Runes          | Read reactive element width and height         |
| `useIntersectionObserver` | Runes    | Track viewport intersection state              |
| `useScrollLock`     | Runes          | Lock and restore document scrolling            |
| `useFocusTrap`      | Runes          | Keep focus inside a container                  |
| `useLocalStorage`   | Runes          | SSR-safe localStorage binding                  |
| `useThrottle`       | Runes          | Throttle reactive updates                      |
| `useTimeout`        | Runes          | Schedule cancellable one-shot timers           |
| `useInterval`       | Runes          | Schedule cancellable repeating timers          |

## Customization

```svelte
<!-- Per-instance -->
<Button ui={{ base: 'rounded-full shadow-lg' }}>Custom</Button>
```

```ts
// Global defaults
import { defineConfig } from 'svelora'

defineConfig({
    button: { defaultVariants: { variant: 'outline' } },
    icons: { loading: 'lucide:loader' }
})
```

```css
/* Custom colors */
:root {
    --color-primary: oklch(0.55 0.25 270);
}
```

## Publish

Release checklist: [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)

```bash
bun run release:verify
```

One command publish:

```bash
bun run public
```

The publish command generates `CHANGELOG.md` automatically from unreleased git commits.
It groups commit messages into `Added`, `Changed`, and `Fixed`, writes the next version section, resets `## [Unreleased]` back to the template automatically, commits local changes if needed, publishes to npm, tags the release, and pushes everything.

Refresh the template manually if needed:

```bash
bun run changelog:template
```

Other version bumps:

```bash
bun run public:minor
# bun run public:major
```

Full verification before publish:

```bash
bun run public:full
```

Dry run:

```bash
bun run public:dry
```

```bash
bun run public:minor:dry
# bun run public:major:dry
```

```bash
npm login
npm publish --access public
```

If you want to include the full test suite before publishing:

```bash
bun run release:verify:full
```

## License

[MIT](LICENSE) &copy; [asphum](https://github.com/asphum)
