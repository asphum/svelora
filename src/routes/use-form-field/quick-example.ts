export const quickExample = `<script lang="ts">
 import { FormField, Input, useFormField } from 'svelora';
</script>

<FormField label="Email" name="email">
 <Input placeholder="you@example.com" />
</FormField>

<!-- Inside a child component -->
const formField = useFormField();`
