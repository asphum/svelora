import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state('<p>Hello Svelora</p>');
</script>

<Editor bind:value placeholder="Write something..." />`,
    'JSON output': `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state({});
</script>

<Editor bind:value output="json" placeholder="JSON-backed editor..." />`,
    'Custom toolbar config': `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state('<p>Custom toolbar</p>');
</script>

<Editor bind:value toolbar={['bold', 'italic', '|', 'undo', 'redo']} />`,
    'Form integration (Phase 2)': `<script lang="ts">
 import { Editor, FormField } from 'svelora';

 let value = $state('<p>Tell us about your project.</p>');
</script>

<FormField label="Description" name="description">
 <Editor bind:value />
</FormField>`
}
