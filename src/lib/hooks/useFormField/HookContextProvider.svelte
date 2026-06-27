<script lang="ts">
    import { setContext } from 'svelte'
    import HookContextProbe from './HookContextProbe.svelte'
    import { FORM_FIELD_CONTEXT_KEY } from './useFormField.svelte.js'

    setContext(FORM_FIELD_CONTEXT_KEY, { name: 'email', size: 'md', ariaId: 'ff' })
</script>

<HookContextProbe />
