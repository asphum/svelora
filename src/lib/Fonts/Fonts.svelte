<script lang="ts" module>
    import type { FontsProps } from './fonts.types.js'

    export type Props = FontsProps
</script>

<script lang="ts">
    import { getConfig } from '../config.js'
    import {
        buildFontVariablesCss,
        buildGoogleFontsUrl,
        buildLocalFontFaceCss,
        fontsDefaults,
        resolveFontsOptions
    } from './fonts.js'

    const globalConfig = getConfig()
    const config = resolveFontsOptions(globalConfig.fonts)

    let {
        fonts,
        families,
        display,
        preconnect
    }: Props = $props()

    const resolvedFamilies = $derived(families ?? fonts ?? (config === false ? [] : config.families ?? []))
    const resolvedDisplay = $derived(display ?? (config === false ? fontsDefaults.display : config.display))
    const resolvedPreconnect = $derived(
        preconnect ?? (config === false ? fontsDefaults.preconnect : config.preconnect)
    )

    const href = $derived(buildGoogleFontsUrl(resolvedFamilies, resolvedDisplay))
    const localFontFaceCss = $derived(buildLocalFontFaceCss(resolvedFamilies, resolvedDisplay))
    const variableCss = $derived(buildFontVariablesCss(resolvedFamilies))
    const inlineCss = $derived([localFontFaceCss, variableCss].filter((value) => value.length > 0).join('\n\n'))
    const hasFonts = $derived(href.length > 0 || inlineCss.length > 0)
</script>

<svelte:head>
    {#if hasFonts}
        {#if resolvedPreconnect && href}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        {/if}
        {#if href}
            <link rel="stylesheet" href={href} />
        {/if}
        {#if inlineCss}
            <svelte:element this={'style'}>{inlineCss}</svelte:element>
        {/if}
    {/if}
</svelte:head>
