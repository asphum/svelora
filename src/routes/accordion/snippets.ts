import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic Usage': `<script lang="ts">
 import { Accordion } from 'svelora';

 const items = [
  { label: 'What is Svelora?', content: 'A Svelte 5 UI component library.' },
  { label: 'Is it customizable?', content: 'Yes. Components support variants and UI overrides.' }
 ];
</script>

<Accordion items={items} />`,
    'Single vs Multiple': `<script lang="ts">
 import { Accordion } from 'svelora';

 const items = [
  { label: 'Getting started', content: 'Install the package and import components.' },
  { label: 'Theming', content: 'Use semantic colors and Tailwind utilities.' }
 ];
</script>

<Accordion type="single" items={items} />
<Accordion type="multiple" items={items} />`,
    'Controlled Value': `<script lang="ts">
 import { Accordion, Button } from 'svelora';

 const items = [
  { label: 'Account', content: 'Manage account settings.' },
  { label: 'Billing', content: 'Review invoices and payment methods.' },
  { label: 'Team', content: 'Invite and manage collaborators.' }
 ];

 let value = $state('0');
</script>

<Button label="Open Billing" onclick={() => (value = '1')} />
<Accordion type="single" items={items} bind:value />`
}
