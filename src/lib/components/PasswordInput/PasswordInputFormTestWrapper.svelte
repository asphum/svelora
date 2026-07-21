<script lang="ts">
    import Form from '../Form/Form.svelte'
    import FormField from '../FormField/FormField.svelte'
    import PasswordInput from './PasswordInput.svelte'
    import { z } from 'zod'

    const schema = z.object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
    })

    let formState = $state<{ password: string }>({ password: '' })
</script>

<Form {schema} bind:state={formState}>
    <FormField name="password" label="Password">
        <PasswordInput bind:value={formState.password} />
    </FormField>
</Form>
