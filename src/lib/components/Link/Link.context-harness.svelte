<script lang="ts">
    import { setContext } from 'svelte'
    import Link from './Link.svelte'
    import { LINK_LOCATION_CONTEXT_KEY, type LinkLocationContext } from './location-context.js'

    let { url }: { url: URL } = $props()

    setContext<LinkLocationContext>(LINK_LOCATION_CONTEXT_KEY, {
        currentUrl: () => url
    })
</script>

<Link href="/from-context" />
