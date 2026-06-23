import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic Usage': `<script lang="ts">
 import { SelectMenu } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
 ];
</script>

<SelectMenu items={items} placeholder="Pick a fruit..." />`,
    'Two-way Binding': `<script lang="ts">
 import { SelectMenu } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
 ];

 let value = $state('');
</script>

<SelectMenu bind:value items={items} placeholder="Select a fruit..." />
<p>{value || '(empty)'}</p>`,
    'Multiple selection': `<script lang="ts">
 import { SelectMenu } from 'svelora';

 const items = [
  { value: 'svelte', label: 'Svelte' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'vite', label: 'Vite' }
 ];

 let value = $state(['svelte']);
</script>

<SelectMenu multiple bind:value items={items} placeholder="Choose technologies..." />`,
    'Create new items on the fly': `<script lang="ts">
 import { SelectMenu } from 'svelora';
 import type { SelectMenuItem } from 'svelora';

 let value = $state<string[]>(['svelte']);
 let items = $state<SelectMenuItem[]>([
  { value: 'svelte', label: 'Svelte' },
  { value: 'tailwind', label: 'Tailwind' }
 ]);
</script>

<SelectMenu
 multiple
 bind:value
 bind:items
 createable
 placeholder="Add tags..."
/>`
}
