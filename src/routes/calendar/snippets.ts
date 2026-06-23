import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { Calendar } from 'svelora';
</script>

<Calendar bind:value={singleValue} />`,
    'Multiple Selection': `<script lang="ts">
 import { Calendar } from 'svelora';
</script>

<Calendar type="multiple" bind:value={multipleValues} />`,
    'Range Selection': `<script lang="ts">
 import { Calendar } from 'svelora';
</script>

<Calendar range bind:value={rangeValue} numberOfMonths={2} />`
}
