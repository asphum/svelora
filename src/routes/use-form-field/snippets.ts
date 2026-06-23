import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { FormField, Input } from 'svelora';
</script>

<FormField label="Username" name="username" description="Choose a unique username">
 <Input placeholder="Enter username" />
</FormField>

<FormField label="Email" name="email" description="We'll never share your email">
 <Input type="email" placeholder="you@example.com" />
</FormField>`,
    'Size Inheritance': `<script lang="ts">
 import { FormField, Input } from 'svelora';
</script>

{#each ['sm', 'md', 'lg'] as size (size)}
 {@const formSize = size as 'sm' | 'md' | 'lg'}
 <FormField label={'Size: ' + formSize} name={'size-' + formSize} size={formSize}>
  <Input placeholder={'Inherits size=' + formSize} />
 </FormField>
{/each}`,
    'Error Propagation': `<script lang="ts">
 import { FormField, Input, Badge } from 'svelora';

 let name = $state('');
 let email = $state('');
 let nameError = $state<string | boolean>(false);
 let emailError = $state<string | boolean>(false);

 function validateName(): void {
  if (!name) nameError = 'Name is required';
  else if (name.length < 2) nameError = 'Name must be at least 2 characters';
  else nameError = false;
 }

 function validateEmail(): void {
  if (!email) emailError = 'Email is required';
  else if (!email.includes('@')) emailError = 'Please enter a valid email';
  else emailError = false;
 }
</script>

<FormField label="Name" name="name-validate" error={nameError} required>
 <Input bind:value={name} placeholder="Enter your name" oninput={validateName} />
</FormField>

<FormField label="Email" name="email-validate" error={emailError} required>
 <Input bind:value={email} type="email" placeholder="you@example.com" oninput={validateEmail} />
</FormField>

<Badge label={'Name: ' + (nameError || 'valid')} color={nameError ? 'error' : 'success'} variant="soft" />
<Badge label={'Email: ' + (emailError || 'valid')} color={emailError ? 'error' : 'success'} variant="soft" />`,
    'Works with All Form Controls': `<script lang="ts">
 import { FormField, Input, Select, Switch, Checkbox } from 'svelora';
</script>

<FormField label="Full Name" name="full-name" help="Your legal full name">
 <Input placeholder="John Doe" />
</FormField>

<FormField label="Country" name="country" help="Select your country">
 <Select
  placeholder="Choose a country"
  items={[
   { label: 'Vietnam', value: 'vn' },
   { label: 'United States', value: 'us' },
   { label: 'Japan', value: 'jp' }
  ]}
 />
</FormField>

<FormField label="Notifications" name="notifications">
 <Switch label="Enable email notifications" />
</FormField>

<FormField label="Terms" name="terms" error="You must accept the terms">
 <Checkbox label="I agree to the terms and conditions" />
 </FormField>`
}
