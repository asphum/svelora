import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Transpile <script lang="ts"> → JS when packaging so dist is plain JS,
    // not TS (Rolldown / Vite 8 compatibility). See #138.
    preprocess: vitePreprocess({ script: true }),
    kit: {
        alias: {
            $internal: 'src/internal'
        },
        adapter: adapter({
            runtime: 'nodejs22.x'
        })
    }
}

export default config
