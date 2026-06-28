<script lang="ts">
    import AnimatedIcon from '../AnimatedIcon.svelte'
    import { getToastToasterContext } from '../french-toast/toast-context.js'
    import type { ToastIconProps } from './toast-icon.types.js'

    let { tone }: ToastIconProps = $props()
    const toasterContext = getToastToasterContext()
    const resolvedTone = $derived(tone ?? toasterContext.iconTone ?? 'standard')
</script>

<AnimatedIcon type="error" size={24} tone={resolvedTone} forceMotion idle={false} />
