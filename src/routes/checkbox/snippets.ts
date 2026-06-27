import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Basic Usage': `<script lang="ts">
 import { Checkbox } from 'svelora';
</script>

<Checkbox />
<Checkbox checked={true} />`,
    'Two-way Binding': `<script lang="ts">
 import { Checkbox } from 'svelora';

 let bindChecked = $state(false);
</script>

<Checkbox bind:checked={bindChecked} label="Toggle me" />`,
    Indeterminate: `<script lang="ts">
 import { Checkbox } from 'svelora';

 let allChecked = $state(false);
 let indeterminate = $state(true);
</script>

<Checkbox
 checked={allChecked}
 {indeterminate}
 label="Select all"
 onCheckedChange={toggleAll}
/>`,
    'Custom Slots': `<script lang="ts">
 import { Checkbox } from 'svelora';
</script>

<Checkbox checked={true} color="success">
 {#snippet labelSlot()}
  <span class="text-sm font-medium text-on-surface">System online</span>
 {/snippet}
</Checkbox>`
}
