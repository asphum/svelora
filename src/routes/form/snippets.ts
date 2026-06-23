import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic — Login form with Zod': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, Input, Button } from 'svelora';

 const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters')
 });

 let state = $state({ email: '', password: '' });
 let submitted = $state<string | null>(null);

 function handleSubmit(event: { data: unknown }): void {
  submitted = JSON.stringify(event.data, null, 2);
 }
</script>

<Form bind:state={state} {schema} onsubmit={handleSubmit} class="max-w-md space-y-4">
 <FormField name="email" label="Email" required>
  <Input type="email" bind:value={state.email} placeholder="you@example.com" />
 </FormField>

 <FormField name="password" label="Password" required help="Must be at least 8 characters">
  <Input type="password" bind:value={state.password} />
 </FormField>

 <Button type="submit">Sign in</Button>
</Form>`,
    'Schema validation — Zod / Valibot / Yup / Joi': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, Input, Textarea, Select, Checkbox, Switch, RadioGroup, PinInput, Slider, Button } from 'svelora';

 const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  age: z.number({ message: 'Age is required' }).min(18, 'You must be at least 18 years old'),
  country: z.string().min(1, 'Please select a country'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  otp: z.string().length(5, 'Please enter the 5-digit code'),
  volume: z.number(),
  newsletter: z.boolean(),
  terms: z.literal(true, { message: 'You must accept the terms' })
 });

 let state = $state({
  name: '',
  email: '',
  age: undefined as number | undefined,
  country: '',
  role: '',
  bio: '',
  otp: '',
  volume: 50,
  newsletter: true,
  terms: false
 });
</script>

<Form bind:state={state} {schema} class="max-w-2xl space-y-4">
 <div class="grid gap-4 sm:grid-cols-2">
  <FormField name="name" label="Name" required>
   <Input bind:value={state.name} placeholder="Jane Doe" />
  </FormField>

  <FormField name="email" label="Email" required>
   <Input type="email" bind:value={state.email} placeholder="jane@example.com" />
  </FormField>
 </div>

 <FormField name="role" label="Role" required>
  <RadioGroup
   bind:value={state.role}
   items={[
    { label: 'Developer', value: 'dev', description: 'Write code' },
    { label: 'Designer', value: 'design', description: 'Create experiences' }
   ]}
  />
 </FormField>

 <FormField name="bio" label="Bio" required>
  <Textarea bind:value={state.bio} rows={3} placeholder="Tell us about yourself..." />
 </FormField>

 <FormField name="otp" label="Verification code" required>
  <PinInput bind:value={state.otp} length={5} />
 </FormField>

 <FormField name="volume" label="Notification volume">
  <Slider bind:value={state.volume} min={0} max={100} tooltip />
 </FormField>

 <FormField name="newsletter">
  <Switch bind:checked={state.newsletter} label="Subscribe to newsletter" />
 </FormField>

 <FormField name="terms" required>
  <Checkbox bind:checked={state.terms} label="I accept the terms and conditions" />
 </FormField>

 <Button type="submit">Create account</Button>
</Form>`,
    'Async submit — loading state': `<script lang="ts">
 import { Form, FormField, Input, Button } from 'svelora';
 import type { FormError } from 'svelora';

 let state = $state({ username: '' });
 let result = $state<string | null>(null);

 function validate(raw: unknown): FormError[] {
  const formState = raw as { username: string };
  if (!formState.username) return [{ name: 'username', message: 'Username is required' }];
  if (formState.username.length < 3) return [{ name: 'username', message: 'Username must be at least 3 characters' }];
  return [];
 }

 async function handleSubmit(event: { data: unknown }): Promise<void> {
  result = null;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  result = 'Created user: ' + (event.data as { username: string }).username;
 }
</script>

<Form bind:state={state} validate={validate} onsubmit={handleSubmit} class="max-w-md space-y-4">
 <FormField name="username" label="Username" required>
  <Input bind:value={state.username} placeholder="johndoe" />
 </FormField>

 <Button type="submit">Create user</Button>
</Form>

{#if result}
 <p>{result}</p>
{/if}`,
    'Programmatic API — bind:api': `<script lang="ts">
 import { Form, FormField, Textarea, Button } from 'svelora';
 import type { FormApi, FormError } from 'svelora';

 let state = $state({ note: '' });
 let api = $state<FormApi<unknown>>();

 function validate(raw: unknown): FormError[] {
  const formState = raw as { note: string };
  return formState.note ? [] : [{ name: 'note', message: 'Note is required' }];
 }
</script>

<Form bind:api={api} bind:state={state} validate={validate} class="max-w-md space-y-4">
 <FormField name="note" label="Note">
  <Textarea bind:value={state.note} rows={2} />
 </FormField>
</Form>

<Button size="sm" onclick={() => api?.submit()}>submit()</Button>
<Button size="sm" variant="outline" onclick={() => api?.validate({ silent: true })}>validate(silent)</Button>
<Button
 size="sm"
 variant="outline"
 onclick={() => api?.setErrors([{ name: 'note', message: 'Custom error from outside' }])}
>
 setErrors()
</Button>`,
    'Async validation': `<script lang="ts">
 import { Form, FormField, Input, Button } from 'svelora';
 import type { FormError } from 'svelora';

 let state = $state({ username: '' });
 let result = $state<string | null>(null);
 const takenUsernames = new Set(['admin', 'root', 'test', 'user', 'svelte']);

 async function validate(raw: unknown): Promise<FormError[]> {
  const formState = raw as { username: string };
  if (!formState.username || formState.username.length < 3) {
   return [{ name: 'username', message: 'Username must be at least 3 characters' }];
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  if (takenUsernames.has(formState.username.toLowerCase())) {
   return [{ name: 'username', message: '"' + formState.username + '" is already taken' }];
  }

  return [];
 }

 async function handleSubmit(event: { data: unknown }): Promise<void> {
  result = 'Registered: ' + (event.data as { username: string }).username;
 }
</script>

<Form bind:state={state} validate={validate} onsubmit={handleSubmit} class="max-w-md space-y-4">
 <FormField name="username" label="Username" required help="Try admin or svelte">
  <Input bind:value={state.username} placeholder="your-handle" />
 </FormField>

 <Button type="submit">Check availability</Button>
</Form>`,
    'Array fields (repeater)': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, Input, Button } from 'svelora';
 import type { FormApi, FormError } from 'svelora';

 const guestItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email')
 });

 let state = $state<{ guests: { name: string; email: string }[] }>({
  guests: [{ name: '', email: '' }]
 });
 let api = $state<FormApi<unknown>>();

 function validateGuests(raw: unknown): FormError[] {
  const formState = raw as typeof state;
  return formState.guests.length === 0 ? [{ message: 'Add at least one guest' }] : [];
 }

 function addGuest(): void {
  state.guests = [...state.guests, { name: '', email: '' }];
 }

 function removeGuest(index: number): void {
  state.guests = state.guests.filter((_, itemIndex) => itemIndex !== index);
 }
</script>

<Form bind:api={api} bind:state={state} validate={validateGuests} class="space-y-4">
 {#each state.guests as guest, index (index)}
  <div class="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
   <Form nested name="guests.{index}" schema={guestItemSchema} class="contents">
    <FormField name="name" label="Name">
     <Input bind:value={guest.name} placeholder="Jane Doe" />
    </FormField>

    <FormField name="email" label="Email">
     <Input type="email" bind:value={guest.email} placeholder="jane@example.com" />
    </FormField>

    <Button type="button" variant="ghost" color="error" onclick={() => removeGuest(index)}>
     Remove
    </Button>
   </Form>
  </div>
 {/each}

 <Button type="button" variant="outline" onclick={addGuest}>Add guest</Button>
</Form>`,
    'Dependent fields': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, Input, Button } from 'svelora';

 const schema = z
  .object({
   password: z.string().min(8, 'Password must be at least 8 characters'),
   confirm: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirm, {
   message: 'Passwords do not match',
   path: ['confirm']
  });

 let state = $state({ password: '', confirm: '' });
</script>

<Form bind:state={state} {schema} class="max-w-md space-y-4">
 <FormField name="password" label="Password" required>
  <Input type="password" bind:value={state.password} />
 </FormField>

 <FormField name="confirm" label="Confirm password" required>
  <Input type="password" bind:value={state.confirm} />
 </FormField>

 <Button type="submit">Set password</Button>
</Form>`,
    'Nested forms': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, Input, Button } from 'svelora';

 const parentSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters')
 });

 const addressSchema = z.object({
  street: z.string().min(3, 'Street must be at least 3 characters'),
  city: z.string().min(2, 'City must be at least 2 characters')
 });

 let state = $state({
  fullName: '',
  address: { street: '', city: '' }
 });
</script>

<Form bind:state={state} schema={parentSchema} class="max-w-xl space-y-4">
 <FormField name="fullName" label="Full name" required>
  <Input bind:value={state.fullName} placeholder="Jane Doe" />
 </FormField>

 <Form nested name="address" schema={addressSchema}>
  <FormField name="street" label="Street" required>
   <Input bind:value={state.address.street} placeholder="123 Main St" />
  </FormField>

  <FormField name="city" label="City" required>
   <Input bind:value={state.address.city} placeholder="Hanoi" />
  </FormField>
 </Form>

 <Button type="submit">Submit</Button>
</Form>`,
    'Error summary + reset': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, Input, Textarea, Select, Button } from 'svelora';
 import type { FormApi } from 'svelora';

 const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category')
 });

 const initialState = { title: '', description: '', category: '' };
 let state = $state({ ...initialState });
 let api = $state<FormApi<unknown>>();

 function resetSummary(): void {
  api?.reset();
  state = { ...initialState };
 }
</script>

<Form bind:api={api} bind:state={state} {schema} class="max-w-xl space-y-4">
 {#if api && api.errors.length > 0}
  <div class="rounded-md border border-error/30 bg-error-container p-3 text-sm text-on-error-container">
   <p class="font-medium">Please fix the validation errors:</p>
   <ul class="mt-1 list-inside list-disc">
    {#each api.errors as error (error.name)}
     <li><strong>{error.name}:</strong> {error.message}</li>
    {/each}
   </ul>
  </div>
 {/if}

 <FormField name="title" label="Title" required>
  <Input bind:value={state.title} />
 </FormField>

 <FormField name="description" label="Description" required>
  <Textarea bind:value={state.description} rows={3} />
 </FormField>

 <FormField name="category" label="Category" required>
  <Select
   bind:value={state.category}
   items={[
    { label: 'Bug', value: 'bug' },
    { label: 'Feature', value: 'feature' },
    { label: 'Question', value: 'question' }
   ]}
   placeholder="Choose..."
  />
 </FormField>

 <Button type="submit">Submit</Button>
 <Button type="button" variant="ghost" color="secondary" onclick={resetSummary}>Reset</Button>
</Form>`
}
