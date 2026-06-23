/**
 * Svelora Configuration File
 *
 * Copy this file to your project root and customize as needed.
 * Then import it in your +layout.svelte:
 *
 * ```svelte
 * <script>
 *     import '../svelora.config'
 * </script>
 * ```
 */

import { defineConfig } from '$lib/config.js'

defineConfig({
    // Example: configure the Fonts provider once for the whole app
    // fonts: {
    //     families: [
    //         {
    //             name: 'Inter',
    //             variable: '--font-sans-family',
    //             weights: [400, 500, 600, 700]
    //         },
    //         {
    //             name: 'JetBrains Mono',
    //             variable: '--font-mono-family',
    //             weights: [400, 500, 700]
    //         }
    //     ]
    // },
    // Example: customize button defaults and slots
    // button: {
    //     defaultVariants: { variant: 'outline', color: 'secondary' },
    //     slots: { base: 'shadow-md', label: 'font-bold' }
    // },
    // Example: customize avatar
    // avatar: {
    //     defaultVariants: { size: 'lg' },
    //     slots: { root: 'ring-2 ring-primary' }
    // },
    // Example: customize icons
    // icons: { loading: 'svg-spinners:ring-resize' }
})
