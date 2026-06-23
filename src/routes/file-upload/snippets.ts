import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { FileUpload } from 'svelora';

 let files = $state<File[]>([]);
</script>

<FileUpload bind:value={files} />
<p>{files.length ? files.map((file) => file.name).join(', ') : 'No files selected'}</p>`,
    'Multiple Files': `<script lang="ts">
 import { FileUpload } from 'svelora';

 let files = $state<File[]>([]);
</script>

<FileUpload
 bind:value={files}
 multiple
 label="Drop multiple files here"
 description="Upload as many files as you need"
/>`,
    Variants: `<script lang="ts">
 import { FileUpload } from 'svelora';

 let buttonFiles = $state<File[]>([]);
</script>

<FileUpload label="Drop files here" description="Supports drag and drop" />

<FileUpload
 bind:value={buttonFiles}
 variant="button"
 label="Upload file"
/>`,
    'Custom Actions': `<script lang="ts">
 import { FileUpload, Button } from 'svelora';

 let files = $state<File[]>([]);
</script>

<FileUpload
 bind:value={files}
 multiple
 interactive={false}
 label="Drag files here"
 description="or click the button below"
>
 {#snippet actionsSlot({ open })}
  <Button variant="outline" size="sm" onclick={open}>Browse files</Button>
 {/snippet}
</FileUpload>`,
    'Max size per file': `<script lang="ts">
 import { FileUpload } from 'svelora';
 import type { FileUploadRejection } from 'svelora';

 let files = $state<File[]>([]);
 let rejections = $state<FileUploadRejection[]>([]);
</script>

<FileUpload
 bind:value={files}
 multiple
 maxSize={1024 * 1024}
 label="Max 1 MB per file"
 onReject={(value) => (rejections = value)}
/>`,
    'Inside a Form (Zod schema)': `<script lang="ts">
 import { z } from 'zod';
 import { Form, FormField, FileUpload, Button } from 'svelora';

 const schema = z.object({
  avatar: z.array(z.instanceof(File)).min(1, 'Avatar is required'),
  gallery: z.array(z.instanceof(File)).min(2, 'Pick at least 2 images')
 });

 let state = $state<{ avatar: File[]; gallery: File[] }>({
  avatar: [],
  gallery: []
 });
</script>

<Form {schema} bind:state={state} class="space-y-4">
 <FormField name="avatar" label="Avatar" required>
  <FileUpload bind:value={state.avatar} accept="image/*" label="Drop avatar here" />
 </FormField>

 <FormField name="gallery" label="Gallery" required>
  <FileUpload
   bind:value={state.gallery}
   multiple
   layout="grid"
   accept="image/*"
   label="Drop at least 2 images"
  />
 </FormField>

 <Button type="submit">Submit</Button>
</Form>`
}
