import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/lib/paraglide',
            strategy: ['cookie', 'globalVariable', 'baseLocale']
        })
    ],
    optimizeDeps: {
        include: ['bits-ui', 'tailwind-variants', 'vaul-svelte', 'joi', 'yup', 'zod']
    },
    ssr: { noExternal: ['mode-watcher', 'runed'] },
    test: {
        expect: { requireAssertions: true },
        onConsoleLog(log: string, type: string) {
            if (type !== 'warn') return true
            if (log.includes('derived_inert')) return false
            if (log.includes('https://svelte.dev/e/derived_inert')) return false
            return true
        },
        projects: [
            {
                extends: './vite.config.ts',
                test: {
                    name: 'client',
                    setupFiles: ['./src/test/setup-browser.ts'],
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium', headless: true }]
                    },
                    include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
                    exclude: ['src/lib/server/**']
                }
            },

            {
                extends: './vite.config.ts',
                test: {
                    name: 'server',
                    environment: 'node',
                    include: ['src/**/*.{test,spec}.{js,ts}'],
                    exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
                }
            }
        ]
    }
})
