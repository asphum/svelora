import { codeToHtml } from 'shiki'

export type DocSectionSnippet = {
    heading: string
    snippet: string
}

const sectionSnippetOverrides: Record<string, Record<string, string>> = {
    accordion: {
        'Basic Usage': `<script lang="ts">
 import { Accordion } from 'svelora';

 const items = [
  { label: 'What is Svelora?', content: 'A Svelte 5 UI component library.' },
  { label: 'Is it customizable?', content: 'Yes. Components support variants and UI overrides.' }
 ];
<` + `/script>

<Accordion items={items} />`,
        'Single vs Multiple': `<script lang="ts">
 import { Accordion } from 'svelora';

 const items = [
  { label: 'Getting started', content: 'Install the package and import components.' },
  { label: 'Theming', content: 'Use semantic colors and Tailwind utilities.' }
 ];
<` + `/script>

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
<` + `/script>

<Button label="Open Billing" onclick={() => (value = '1')} />
<Accordion type="single" items={items} bind:value />`
    },
    'select-menu': {
        'Basic Usage': `<script lang="ts">
 import { SelectMenu } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
 ];
<` + `/script>

<SelectMenu items={items} placeholder="Pick a fruit..." />`,
        'Two-way Binding': `<script lang="ts">
 import { SelectMenu } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
 ];

 let value = $state('');
<` + `/script>

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
<` + `/script>

<SelectMenu multiple bind:value items={items} placeholder="Choose technologies..." />`,
        'Create new items on the fly': `<script lang="ts">
 import { SelectMenu } from 'svelora';
 import type { SelectMenuItem } from 'svelora';

 let value = $state<string[]>(['svelte']);
 let items = $state<SelectMenuItem[]>([
  { value: 'svelte', label: 'Svelte' },
  { value: 'tailwind', label: 'Tailwind' }
 ]);
<` + `/script>

<SelectMenu
 multiple
 bind:value
 bind:items
 createable
 placeholder="Add tags..."
/>`
    },
    table: {
        Basic: `<script lang="ts">
 import { Table } from 'svelora';

 const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Charlie', email: 'charlie@example.com', role: 'Editor' }
 ];
<` + `/script>

<Table {data} />`,
        Sorting: `<script lang="ts">
 import { Table } from 'svelora';

 const data = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
 ];

 const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true }
 ];

 let sorting = $state([{ key: 'name', direction: 'asc' as const }]);
<` + `/script>

<Table data={data} {columns} bind:sorting rowKey="id" />`,
        Pagination: `<script lang="ts">
 import { Table } from 'svelora';

 const data = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: \`User \${index + 1}\`,
  email: \`user\${index + 1}@example.com\`
 }));

 let page = $state(1);
 const pageSize = 10;
<` + `/script>

<Table {data} bind:page {pageSize} rowKey="id" />`,
        'Row Selection': `<script lang="ts">
 import { Table } from 'svelora';

 const data = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
 ];

 let rowSelection = $state<Record<string, boolean>>({});
<` + `/script>

<Table data={data} selectable bind:rowSelection rowKey="id" />`
    },
    editor: {
        Basic: `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state('<p>Hello Svelora</p>');
<` + `/script>

<Editor bind:value placeholder="Write something..." />`,
        'JSON output': `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state({});
<` + `/script>

<Editor bind:value output="json" placeholder="JSON-backed editor..." />`,
        'Custom toolbar config': `<script lang="ts">
 import { Editor } from 'svelora/editor';

 let value = $state('<p>Custom toolbar</p>');
<` + `/script>

<Editor bind:value toolbar={['bold', 'italic', '|', 'undo', 'redo']} />`,
        'Form integration (Phase 2)': `<script lang="ts">
 import { Editor, FormField } from 'svelora';

 let value = $state('<p>Tell us about your project.</p>');
<` + `/script>

<FormField label="Description" name="description">
 <Editor bind:value />
</FormField>`
    },
    'dropdown-menu': {
        Basic: `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';

 const items = [
  { label: 'New File', icon: 'lucide:file-plus' },
  { label: 'Open File...', icon: 'lucide:folder-open' },
  { type: 'separator' as const },
  { label: 'Save', icon: 'lucide:save' }
 ];
<` + `/script>

<DropdownMenu {items}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">File</Button>
 {/snippet}
</DropdownMenu>`,
        'Checkbox Items': `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';

 let showStatusBar = $state(true);
 let showPanel = $state(true);

 const items = $derived([
  { type: 'label' as const, label: 'Appearance' },
  {
   type: 'checkbox' as const,
   label: 'Status Bar',
   checked: showStatusBar,
   onCheckedChange: (value: boolean) => (showStatusBar = value)
  },
  {
   type: 'checkbox' as const,
   label: 'Panel',
   checked: showPanel,
   onCheckedChange: (value: boolean) => (showPanel = value)
  }
 ]);
<` + `/script>

<DropdownMenu {items}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">View</Button>
 {/snippet}
</DropdownMenu>`,
        'Radio Items': `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';
 import type { DropdownMenuItem, DropdownMenuRadioGroup } from 'svelora';

 let value = $state('system');

 const items: DropdownMenuItem[] = [
  { type: 'label', label: 'Theme' },
  { type: 'radio', label: 'Light', value: 'light' },
  { type: 'radio', label: 'Dark', value: 'dark' },
  { type: 'radio', label: 'System', value: 'system' }
 ];

 const radioGroups: DropdownMenuRadioGroup[] = [
  {
   name: 'theme',
   value,
   onValueChange: (next: string) => (value = next)
  }
 ];
<` + `/script>

<DropdownMenu {items} {radioGroups}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">Theme</Button>
 {/snippet}
</DropdownMenu>`,
        Controlled: `<script lang="ts">
 import { DropdownMenu, Button } from 'svelora';

 const items = [
  { label: 'Profile' },
  { label: 'Settings' },
  { type: 'separator' as const },
  { label: 'Log out' }
 ];

 let open = $state(false);
<` + `/script>

<DropdownMenu {items} bind:open>
 {#snippet children({ props })}
  <Button {...props} variant={open ? 'solid' : 'outline'}>Menu</Button>
 {/snippet}
</DropdownMenu>

<Button variant="soft" onclick={() => (open = !open)}>
 {open ? 'Close' : 'Open'}
</Button>`,
        'Custom Header/Footer': `<script lang="ts">
 import { DropdownMenu, Button, Separator } from 'svelora';

 const items = [
  { label: 'Profile' },
  { label: 'Billing' },
  { label: 'Settings' }
 ];
<` + `/script>

<DropdownMenu {items}>
 {#snippet children({ props })}
  <Button {...props} variant="outline">Account</Button>
 {/snippet}

 {#snippet header()}
  <div class="px-3 py-2">
   <p class="text-sm font-medium">John Doe</p>
   <p class="text-xs text-on-surface-variant">john@example.com</p>
  </div>
  <Separator />
 {/snippet}

 {#snippet footer({ close })}
  <Separator />
  <div class="p-1">
   <Button variant="ghost" size="sm" class="w-full justify-start" onclick={close}>
    Log out
   </Button>
  </div>
 {/snippet}
</DropdownMenu>`
    },
    'context-menu': {
        Basic: `<script lang="ts">
 import { ContextMenu } from 'svelora';

 const items = [
  { label: 'Back', icon: 'lucide:arrow-left' },
  { label: 'Reload', icon: 'lucide:refresh-cw' },
  { type: 'separator' as const },
  { label: 'Save As...', icon: 'lucide:save' }
 ];
<` + `/script>

<ContextMenu {items}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click here
 </div>
</ContextMenu>`,
        'Checkbox Items': `<script lang="ts">
 import { ContextMenu } from 'svelora';

 let showStatusBar = $state(true);
 let showPanel = $state(true);

 const items = $derived([
  { type: 'label' as const, label: 'Appearance' },
  {
   type: 'checkbox' as const,
   label: 'Status Bar',
   checked: showStatusBar,
   closeOnSelect: false,
   onCheckedChange: (value: boolean) => (showStatusBar = value)
  },
  {
   type: 'checkbox' as const,
   label: 'Panel',
   checked: showPanel,
   closeOnSelect: false,
   onCheckedChange: (value: boolean) => (showPanel = value)
  }
 ]);
<` + `/script>

<ContextMenu {items}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for checkboxes
 </div>
</ContextMenu>`,
        'Radio Items': `<script lang="ts">
 import { ContextMenu } from 'svelora';
 import type { ContextMenuItem, ContextMenuRadioGroup } from 'svelora';

 let value = $state('system');

 const items: ContextMenuItem[] = [
  { type: 'label', label: 'Theme' },
  { type: 'radio', label: 'Light', value: 'light' },
  { type: 'radio', label: 'Dark', value: 'dark' },
  { type: 'radio', label: 'System', value: 'system' }
 ];

 const radioGroups: ContextMenuRadioGroup[] = [
  {
   name: 'theme',
   value,
   onValueChange: (next: string) => (value = next)
  }
 ];
<` + `/script>

<ContextMenu {items} {radioGroups}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for radio items
 </div>
</ContextMenu>`,
        'Custom Header/Footer': `<script lang="ts">
 import { ContextMenu, Separator } from 'svelora';

 const items = [
  { label: 'Profile' },
  { label: 'Billing' },
  { label: 'Settings' }
 ];
<` + `/script>

<ContextMenu {items}>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for header/footer
 </div>

 {#snippet header()}
  <div class="px-3 py-2">
   <p class="text-sm font-medium">John Doe</p>
   <p class="text-xs text-on-surface-variant">john@example.com</p>
  </div>
  <Separator />
 {/snippet}

 {#snippet footer({ close })}
  <Separator />
  <button class="w-full px-2 py-1.5 text-left text-sm text-error" onclick={close}>
   Log out
  </button>
 {/snippet}
</ContextMenu>`,
        'Custom Content': `<script lang="ts">
 import { ContextMenu } from 'svelora';
<` + `/script>

<ContextMenu>
 <div class="flex h-36 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant">
  Right-click for custom content
 </div>

 {#snippet content({ close })}
  <div class="p-4">
   <p class="mb-3 text-sm font-medium">Choose a color</p>
   <div class="grid grid-cols-5 gap-2">
    {#each ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'] as color (color)}
     <button class={'size-8 rounded-full ' + color} onclick={close} aria-label={color}></button>
    {/each}
   </div>
  </div>
 {/snippet}
</ContextMenu>`
    },
    'file-upload': {
        Basic: `<script lang="ts">
 import { FileUpload } from 'svelora';

 let files = $state<File[]>([]);
<` + `/script>

<FileUpload bind:value={files} />
<p>{files.length ? files.map((file) => file.name).join(', ') : 'No files selected'}</p>`,
        'Multiple Files': `<script lang="ts">
 import { FileUpload } from 'svelora';

 let files = $state<File[]>([]);
<` + `/script>

<FileUpload
 bind:value={files}
 multiple
 label="Drop multiple files here"
 description="Upload as many files as you need"
/>`,
        Variants: `<script lang="ts">
 import { FileUpload } from 'svelora';

 let buttonFiles = $state<File[]>([]);
<` + `/script>

<FileUpload label="Drop files here" description="Supports drag and drop" />

<FileUpload
 bind:value={buttonFiles}
 variant="button"
 label="Upload file"
/>`,
        'Custom Actions': `<script lang="ts">
 import { FileUpload, Button } from 'svelora';

 let files = $state<File[]>([]);
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
    },
    popover: {
        Basic: `<script lang="ts">
 import { Popover, Button } from 'svelora';
<` + `/script>

<Popover>
 <Button variant="outline">Click me</Button>

 {#snippet content()}
  <div class="w-72 p-4">
   <p class="text-sm font-medium">Popover Content</p>
   <p class="mt-1 text-sm text-on-surface-variant">
    This is a simple popover with some informational text.
   </p>
  </div>
 {/snippet}
</Popover>`,
        Positions: `<script lang="ts">
 import { Popover, Button } from 'svelora';
<` + `/script>

{#each ['top', 'right', 'bottom', 'left'] as side (side)}
 <Popover side={side}>
  <Button variant="soft">{side}</Button>

  {#snippet content()}
   <div class="p-3 text-sm">Popover on {side}</div>
  {/snippet}
 </Popover>
{/each}`,
        'Close Action': `<script lang="ts">
 import { Popover, Button } from 'svelora';
<` + `/script>

<Popover>
 <Button variant="outline">Confirm Action</Button>

 {#snippet content({ close })}
  <div class="w-72 p-4">
   <p class="font-medium">Confirm Action</p>
   <p class="mt-2 text-sm text-on-surface-variant">
    Are you sure you want to proceed with this action?
   </p>
   <div class="mt-4 flex justify-end gap-2">
    <Button variant="outline" size="sm" onclick={close}>Cancel</Button>
    <Button size="sm" onclick={close}>Confirm</Button>
   </div>
  </div>
 {/snippet}
</Popover>`,
        Controlled: `<script lang="ts">
 import { Popover, Button } from 'svelora';

 let open = $state(false);
<` + `/script>

<Popover bind:open>
 <Button variant={open ? 'solid' : 'outline'}>Toggle</Button>

 {#snippet content()}
  <div class="w-64 p-4 text-sm">Controlled popover content</div>
 {/snippet}
</Popover>

<Button variant="soft" onclick={() => (open = !open)}>
 {open ? 'Close' : 'Open'}
</Button>`,
        'Non-dismissible': `<script lang="ts">
 import { Popover, Button } from 'svelora';
<` + `/script>

<Popover dismissible={false}>
 <Button variant="outline">Non-dismissible</Button>

 {#snippet content({ close })}
  <div class="w-72 p-4">
   <p class="text-sm font-medium">Cannot dismiss by clicking outside</p>
   <p class="mt-1 text-sm text-on-surface-variant">
    Use the close button to dismiss this popover.
   </p>
   <div class="mt-3 flex justify-end">
    <Button size="sm" onclick={close}>Got it</Button>
   </div>
  </div>
 {/snippet}
</Popover>`
    },
    'pin-input': {
        Basic: `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
<` + `/script>

<PinInput bind:value />
<p>Value: "{value}"</p>`,
        Length: `<script lang="ts">
 import { PinInput } from 'svelora';

 let otp = $state('');
<` + `/script>

<PinInput length={4} />
<PinInput />
<PinInput bind:value={otp} length={6} otp />`,
        Type: `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
<` + `/script>

<PinInput bind:value type="number" length={6} />
<p>Value: "{value}"</p>`,
        Mask: `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
<` + `/script>

<PinInput bind:value mask />
<p>Value: "{value}"</p>`,
        'Form Integration': `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
<` + `/script>

<form
 onsubmit={(event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  alert('otp = ' + formData.get('otp'));
 }}
>
 <PinInput bind:value name="otp" inputId="otp-input" length={6} type="number" otp />
 <button type="submit">Verify</button>
</form>`,
        'FormField Integration': `<script lang="ts">
 import { PinInput, FormField } from 'svelora';

 let code = $state('');
 let pin = $state('');
<` + `/script>

<FormField label="Verification Code" description="Enter the 6-digit code sent to you.">
 <PinInput bind:value={code} length={6} type="number" otp class="mt-1" />
</FormField>

<FormField label="PIN" error={pin.length > 0 && pin.length < 4 ? 'PIN must be 4 digits.' : undefined}>
 <PinInput bind:value={pin} length={4} class="mt-1" />
</FormField>`,
        Loading: `<script lang="ts">
 import { PinInput } from 'svelora';
<` + `/script>

<PinInput loading length={6} />
<PinInput loading mask color="primary" length={4} />`
    },
    'use-clipboard': {
        Basic: `<script lang="ts">
 import { useClipboard, Button, Badge } from 'svelora';

 const clipboard = useClipboard();
<` + `/script>

<Button
 onclick={() => clipboard.copy('Hello from Svelora!')}
 icon={clipboard.copied ? 'lucide:check' : 'lucide:copy'}
 color={clipboard.copied ? 'success' : 'primary'}
>
 {clipboard.copied ? 'Copied!' : 'Copy Text'}
</Button>

<Badge
 label={clipboard.copied ? 'Copied' : 'Ready'}
 color={clipboard.copied ? 'success' : 'surface'}
 variant="subtle"
/>`,
        'Custom Timeout': `<script lang="ts">
 import { useClipboard, Button } from 'svelora';

 const clipboard = useClipboard({ timeout: 5000 });
<` + `/script>

<Button
 onclick={() => clipboard.copy('Copied with 5s timeout!')}
 icon={clipboard.copied ? 'lucide:check' : 'lucide:copy'}
 color={clipboard.copied ? 'success' : 'secondary'}
 variant="outline"
>
 {clipboard.copied ? 'Copied! (5s reset)' : 'Copy (5s timeout)'}
</Button>`,
        'Copy from Input': `<script lang="ts">
 import { useClipboard, Button, Input } from 'svelora';

 const clipboard = useClipboard();
 let value = $state('Hello, Svelora!');
<` + `/script>

<div class="flex items-center gap-2">
 <Input bind:value />
 <Button
  onclick={() => clipboard.copy(value)}
  icon={clipboard.copied ? 'lucide:check' : 'lucide:copy'}
  variant="outline"
  square
 />
</div>`,
        'Real World: Install Commands': `<script lang="ts">
 import { useClipboard, Button, Icon } from 'svelora';

 const clipboard = useClipboard();

 const snippets = [
  { label: 'npm', text: 'npm install svelora' },
  { label: 'pnpm', text: 'pnpm add svelora' },
  { label: 'yarn', text: 'yarn add svelora' }
 ];
<` + `/script>

{#each snippets as snippet (snippet.label)}
 <div class="flex items-center justify-between rounded-md p-3">
  <div class="flex items-center gap-3">
   <Icon name="lucide:terminal" size="16" />
   <code>{snippet.text}</code>
  </div>
  <Button
   onclick={() => clipboard.copy(snippet.text)}
   icon={clipboard.copied ? 'lucide:check' : 'lucide:clipboard'}
   variant="ghost"
   size="xs"
   square
  />
 </div>
{/each}`,
        'Real World: Share Link': `<script lang="ts">
 import { useClipboard, Button, Card } from 'svelora';

 const clipboard = useClipboard();
 const url = 'https://svelora.vercel.app/use-clipboard';
<` + `/script>

<Card class="p-4">
 <div class="space-y-3">
  <p class="text-sm font-medium">Share this page</p>
  <div class="flex items-center gap-2">
   <div class="flex-1 truncate rounded-md px-3 py-2 font-mono text-xs">{url}</div>
   <Button
    onclick={() => clipboard.copy(url)}
    icon={clipboard.copied ? 'lucide:check' : 'lucide:link'}
    variant="soft"
    size="sm"
   >
    {clipboard.copied ? 'Copied!' : 'Copy Link'}
   </Button>
  </div>
 </div>
</Card>`
    },
    'use-form-field': {
        Basic: `<script lang="ts">
 import { FormField, Input } from 'svelora';
<` + `/script>

<FormField label="Username" name="username" description="Choose a unique username">
 <Input placeholder="Enter username" />
</FormField>

<FormField label="Email" name="email" description="We'll never share your email">
 <Input type="email" placeholder="you@example.com" />
</FormField>`,
        'Size Inheritance': `<script lang="ts">
 import { FormField, Input } from 'svelora';
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
    },
    command: {
        Basic: `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'suggestions',
   label: 'Suggestions',
   items: [
    { value: 'calendar', label: 'Calendar', icon: 'lucide:calendar' },
    { value: 'search-emoji', label: 'Search Emoji', icon: 'lucide:smile' },
    { value: 'calculator', label: 'Calculator', icon: 'lucide:calculator' }
   ]
  }
 ];
<` + `/script>

<Command groups={groups} placeholder="Type a command or search..." />`,
        'Items with Descriptions': `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'general',
   label: 'General',
   items: [
    {
     value: 'appearance',
     label: 'Appearance',
     icon: 'lucide:paintbrush',
     description: 'Change theme and colors'
    },
    {
     value: 'language',
     label: 'Language',
     icon: 'lucide:globe',
     description: 'Select preferred language'
    }
   ]
  }
 ];
<` + `/script>

<Command groups={groups} placeholder="Search settings..." />`,
        'onSelect Callback': `<script lang="ts">
 import { Command, Badge } from 'svelora';
 import type { CommandGroup } from 'svelora';

 let lastSelected = $state('');

 const groups: CommandGroup[] = [
  {
   id: 'fruits',
   label: 'Fruits',
   items: [
    {
     value: 'apple',
     label: 'Apple',
     icon: 'lucide:apple',
     onSelect: () => (lastSelected = 'Apple')
    },
    {
     value: 'banana',
     label: 'Banana',
     icon: 'lucide:banana',
     onSelect: () => (lastSelected = 'Banana')
    }
   ]
  }
 ];
<` + `/script>

<Badge label={lastSelected || 'None'} color={lastSelected ? 'success' : 'surface'} />
<Command groups={groups} placeholder="Select a fruit..." />`,
        'Custom Empty Slot': `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'suggestions',
   label: 'Suggestions',
   items: [{ value: 'calendar', label: 'Calendar', icon: 'lucide:calendar' }]
  }
 ];
<` + `/script>

<Command {groups} placeholder="Search something that does not exist...">
 {#snippet empty({ search })}
  <div class="flex flex-col items-center gap-2 py-6">
   <span class="text-2xl">Search</span>
   <span class="text-sm text-on-surface-variant">
    {search ? 'No results for "' + search + '"' : 'Start typing to search'}
   </span>
  </div>
 {/snippet}
</Command>`,
        'Footer Slot': `<script lang="ts">
 import { Command, Kbd } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'suggestions',
   label: 'Suggestions',
   items: [{ value: 'calendar', label: 'Calendar', icon: 'lucide:calendar' }]
  }
 ];
<` + `/script>

<Command {groups} placeholder="Search...">
 {#snippet footer()}
  <div class="flex items-center justify-between px-3 py-2 text-xs text-on-surface-variant">
   <div class="flex items-center gap-2">
    <span class="flex items-center gap-1"><Kbd value="↑" size="sm" /><Kbd value="↓" size="sm" /> Navigate</span>
    <span class="flex items-center gap-1"><Kbd value="↵" size="sm" /> Select</span>
   </div>
   <span class="flex items-center gap-1"><Kbd value="Esc" size="sm" /> Close</span>
  </div>
 {/snippet}
</Command>`,
        'External Filtering (shouldFilter=false)': `<script lang="ts">
 import { Command } from 'svelora';
 import type { CommandGroup } from 'svelora';

 let search = $state('');

 const allCountries = [
  { value: 'us', label: 'United States', icon: 'circle-flags:us' },
  { value: 'jp', label: 'Japan', icon: 'circle-flags:jp' },
  { value: 'vn', label: 'Vietnam', icon: 'circle-flags:vn' }
 ];

 const filteredCountries = $derived(
  search ? allCountries.filter((country) => country.label.toLowerCase().includes(search.toLowerCase())) : allCountries
 );

 const groups = $derived<CommandGroup[]>([
  {
   id: 'countries',
   label: search ? 'Results for "' + search + '" (' + filteredCountries.length + ')' : 'All countries (' + allCountries.length + ')',
   items: filteredCountries
  }
 ]);
<` + `/script>

<Command
 shouldFilter={false}
 bind:search
 groups={groups}
 placeholder="Search countries..."
/>`,
        'Inside Modal': `<script lang="ts">
 import { Command, Modal, Button, Kbd } from 'svelora';
 import type { CommandGroup } from 'svelora';

 const groups: CommandGroup[] = [
  {
   id: 'general',
   label: 'General',
   items: [
    { value: 'appearance', label: 'Appearance', icon: 'lucide:paintbrush' },
    { value: 'language', label: 'Language', icon: 'lucide:globe' }
   ]
  }
 ];
<` + `/script>

<Modal>
 <Button variant="outline" leadingIcon="lucide:search">
  Search...
  <Kbd value="meta" size="sm" />
  <Kbd value="K" size="sm" />
 </Button>

 {#snippet content()}
  <Command groups={groups} placeholder="Search settings..." />
 {/snippet}
</Modal>`
    },
    input: {
        'Basic Usage': `<script lang="ts">
 import { Input } from 'svelora';
<` + `/script>

<Input placeholder="Enter text..." />`,
        'Two-way Binding': `<script lang="ts">
 import { Input } from 'svelora';

 let value = $state('');
<` + `/script>

<Input bind:value leadingIcon="lucide:pencil" placeholder="Type something..." />
<p>Value: {value || '(empty)'}</p>
<p>Length: {value.length}</p>`,
        Icons: `<script lang="ts">
 import { Input } from 'svelora';
<` + `/script>

<Input leadingIcon="lucide:search" placeholder="Search..." />
<Input trailingIcon="lucide:eye" placeholder="Password" type="password" />
<Input leadingIcon="lucide:mail" trailingIcon="lucide:check" placeholder="Email" type="email" />`,
        'FormField Integration': `<script lang="ts">
 import { Input, FormField } from 'svelora';
<` + `/script>

<FormField
 label="Email"
 description="We will use this to send you notifications."
 required
>
 <Input leadingIcon="lucide:mail" placeholder="Enter your email" type="email" />
</FormField>

<FormField
 label="Password"
 help="Must be at least 8 characters."
 error="Password is too short."
>
 <Input trailingIcon="lucide:eye" placeholder="Enter your password" type="password" />
</FormField>`,
        'FieldGroup Integration': `<script lang="ts">
 import { Input, FieldGroup } from 'svelora';
<` + `/script>

<FieldGroup orientation="horizontal">
 <Input placeholder="First name" />
 <Input placeholder="Last name" />
 <Input placeholder="Email" />
</FieldGroup>

<FieldGroup orientation="vertical">
 <Input placeholder="Street address" />
 <Input placeholder="City" />
 <Input placeholder="Zip code" />
</FieldGroup>`,
        'Real World Examples': `<script lang="ts">
 import { Input, FormField, FieldGroup } from 'svelora';
<` + `/script>

<FieldGroup>
 <Input leadingIcon="lucide:search" placeholder="Search products..." />
 <Input leadingIcon="lucide:map-pin" placeholder="Location" />
</FieldGroup>

<FormField label="Email" required>
 <Input leadingIcon="lucide:mail" placeholder="john@example.com" type="email" />
</FormField>

<FormField label="Password" required help="Must be at least 8 characters.">
 <Input leadingIcon="lucide:lock" placeholder="Enter your password" type="password" />
</FormField>`
    },
    select: {
        'Basic Usage': `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
 ];
<` + `/script>

<Select {items} placeholder="Pick a fruit..." />`,
        'Two-way Binding': `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
 ];

 let value = $state('');
<` + `/script>

<Select bind:value {items} placeholder="Select a fruit..." leadingIcon="lucide:apple" />
<p>Value: {value || '(empty)'}</p>`,
        'Items with Icons': `<script lang="ts">
 import { Select } from 'svelora';

 const items = [
  { value: 'home', label: 'Home', icon: 'lucide:home' },
  { value: 'settings', label: 'Settings', icon: 'lucide:settings' },
  { value: 'profile', label: 'Profile', icon: 'lucide:user' }
 ];
<` + `/script>

<Select {items} placeholder="Choose a page..." />`,
        'Grouped Items': `<script lang="ts">
 import { Select } from 'svelora';
 import type { SelectItemType } from 'svelora';

 const items: SelectItemType[] = [
  { type: 'label', label: 'Fruits' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { type: 'separator' },
  { type: 'label', label: 'Vegetables' },
  { value: 'carrot', label: 'Carrot' }
 ];
<` + `/script>

<Select {items} placeholder="Pick an item..." />`,
        'FormField Integration': `<script lang="ts">
 import { Select, FormField } from 'svelora';
<` + `/script>

<FormField label="Country" description="Select your country of residence." required>
 <Select
  leadingIcon="lucide:globe"
  items={[
   { value: 'us', label: 'United States' },
   { value: 'uk', label: 'United Kingdom' },
   { value: 'ca', label: 'Canada' }
  ]}
  placeholder="Choose a country"
 />
</FormField>

<FormField label="Role" error="Please select a role.">
 <Select
  items={[
   { value: 'admin', label: 'Admin' },
   { value: 'editor', label: 'Editor' },
   { value: 'viewer', label: 'Viewer' }
  ]}
  placeholder="Choose a role"
 />
</FormField>`,
        'Multiple selection': `<script lang="ts">
 import { Select } from 'svelora';

 const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'grape', label: 'Grape' }
 ];

 const sections = [
  { value: 'home', label: 'Home', icon: 'lucide:home' },
  { value: 'settings', label: 'Settings', icon: 'lucide:settings' },
  { value: 'profile', label: 'Profile', icon: 'lucide:user' }
 ];

 let value = $state<string[]>(['apple', 'banana']);
<` + `/script>

<Select multiple bind:value items={fruits} placeholder="Pick fruits..." />
<p>Selected: {JSON.stringify(value)}</p>

<Select
 multiple
 items={sections}
 separator=" • "
 leadingIcon="lucide:list-checks"
 placeholder="Pick sections..."
/>`
    },
    form: {
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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
<` + `/script>

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
    },
    checkbox: {
        'Basic Usage': `<script lang="ts">
 import { Checkbox } from 'svelora';
<` + `/script>

<Checkbox />
<Checkbox checked={true} />`,
        'Two-way Binding': `<script lang="ts">
 import { Checkbox } from 'svelora';

 let bindChecked = $state(false);
<` + `/script>

<Checkbox bind:checked={bindChecked} label="Toggle me" />`,
        Indeterminate: `<script lang="ts">
 import { Checkbox } from 'svelora';

 let allChecked = $state(false);
 let indeterminate = $state(true);
<` + `/script>

<Checkbox
 checked={allChecked}
 {indeterminate}
 label="Select all"
 onCheckedChange={toggleAll}
/>`,
        'Custom Slots': `<script lang="ts">
 import { Checkbox } from 'svelora';
<` + `/script>

<Checkbox checked={true} color="success">
 {#snippet labelSlot()}
  <span class="text-sm font-medium text-on-surface">System online</span>
 {/snippet}
</Checkbox>`
    },
    textarea: {
        'Basic Usage': `<script lang="ts">
 import { Textarea } from 'svelora';
<` + `/script>

<Textarea placeholder="Enter text..." />`,
        Autoresize: `<script lang="ts">
 import { Textarea } from 'svelora';
<` + `/script>

<Textarea autoresize placeholder="Type to grow..." rows={1} />
<Textarea autoresize maxrows={5} placeholder="Grows up to 5 rows..." rows={1} />`,
        'FormField Integration': `<script lang="ts">
 import { Textarea, FormField } from 'svelora';
<` + `/script>

<FormField label="Description" required>
 <Textarea leadingIcon="lucide:file-text" placeholder="Describe the issue..." />
</FormField>`
    },
    tooltip: {
        Basic: `<script lang="ts">
 import { Tooltip, Button } from 'svelora';
<` + `/script>

<Tooltip text="This is a tooltip">
 <Button variant="outline">Hover me</Button>
</Tooltip>`,
        Positions: `<script lang="ts">
 import { Tooltip, Button } from 'svelora';
<` + `/script>

<Tooltip text="I appear on top" side="top">
 <Button variant="soft">Top</Button>
</Tooltip>`,
        'Keyboard Shortcuts': `<script lang="ts">
 import { Tooltip, Button } from 'svelora';
<` + `/script>

<Tooltip text="Search" kbds={['meta', 'k']}>
 <Button icon="lucide:search" variant="outline">Search</Button>
</Tooltip>`,
        Controlled: `<script lang="ts">
 import { Tooltip, Button } from 'svelora';

 let open = $state(false);
<` + `/script>

<Tooltip text="Hover to see state change" bind:open>
 <Button variant={open ? 'solid' : 'outline'}>Hover me</Button>
</Tooltip>`
    },
    calendar: {
        Basic: `<script lang="ts">
 import { Calendar } from 'svelora';
<` + `/script>

<Calendar bind:value={singleValue} />`,
        'Multiple Selection': `<script lang="ts">
 import { Calendar } from 'svelora';
<` + `/script>

<Calendar type="multiple" bind:value={multipleValues} />`,
        'Range Selection': `<script lang="ts">
 import { Calendar } from 'svelora';
<` + `/script>

<Calendar range bind:value={rangeValue} numberOfMonths={2} />`
    }
}

export function normalizeCode(code: string): string {
    const lines = code.replaceAll('\r\n', '\n').split('\n')
    const firstNonEmpty = lines.findIndex((line) => line.trim().length > 0)
    const lastNonEmptyFromEnd = [...lines].reverse().findIndex((line) => line.trim().length > 0)

    if (firstNonEmpty < 0 || lastNonEmptyFromEnd < 0) {
        return ''
    }

    const trimmed = lines.slice(firstNonEmpty, lines.length - lastNonEmptyFromEnd)
    const indents = trimmed
        .filter((line) => line.trim().length > 0)
        .map((line) => line.match(/^(\s*)/)?.[1].length ?? 0)

    const minIndent = indents.length > 0 ? Math.min(...indents) : 0
    return trimmed.map((line) => line.slice(minIndent)).join('\n').trim()
}

function unwrapPreviewWrappers(source: string): string {
    let current = source.trim()

    for (let pass = 0; pass < 3; pass += 1) {
        const match = current.match(/^<div\b([^>]*)>([\s\S]*)<\/div>$/)
        if (!match) break

        const attrs = match[1]
        const classMatch = attrs.match(/\bclass=(?:"([^"]*)"|'([^']*)')/)
        const classValue = (classMatch?.[1] ?? classMatch?.[2] ?? '').trim()
        const tokens = classValue.length > 0 ? classValue.split(/\s+/) : []

        const isPreviewBg = tokens.some((token) => token.startsWith('bg-surface-container'))
        const isBordered = tokens.some((token) => token.startsWith('border-outline-variant'))
        const isRounded = tokens.some((token) => token.startsWith('rounded'))
        const hasPadding = tokens.some((token) => /^p[trblxy]?-\d+$/.test(token))
        const isMaxWidth = tokens.some((token) => token.startsWith('max-w-'))
        const isLayout = tokens.some(
            (token) =>
                token.startsWith('grid') ||
                token.startsWith('flex') ||
                token.startsWith('space-') ||
                token.startsWith('overflow-')
        )

        const shouldUnwrap = (isPreviewBg || isBordered || isRounded) && hasPadding
        const shouldUnwrapMaxWidth = isMaxWidth && !isLayout

        if (!shouldUnwrap && !shouldUnwrapMaxWidth) break

        current = match[2].trim()
    }

    return current
}

export function extractSectionSnippet(sectionSource: string): string {
    const openTagEnd = sectionSource.indexOf('>')
    const closeTagStart = sectionSource.lastIndexOf('</section>')

    if (openTagEnd < 0 || closeTagStart < 0) {
        return normalizeCode(sectionSource)
    }

    let inner = sectionSource.slice(openTagEnd + 1, closeTagStart)
    inner = inner.replace(/^\s*<h2\b[\s\S]*?<\/h2>\s*/, '')
    inner = inner.replace(/^\s*<!--[\s\S]*?-->\s*/g, '')

    while (/^\s*<p\b[\s\S]*?<\/p>\s*/.test(inner)) {
        inner = inner.replace(/^\s*<p\b[\s\S]*?<\/p>\s*/, '')
    }

    inner = inner.replace(/\s*<!--[\s\S]*?-->\s*$/g, '')
    inner = unwrapPreviewWrappers(inner)
    return normalizeCode(inner)
}

function decodeHeading(value: string): string {
    return value
        .replaceAll('&amp;', '&')
        .replaceAll('&times;', '×')
        .replaceAll('&#39;', "'")
        .replaceAll('&quot;', '"')
        .trim()
}

function extractSectionHeading(sectionSource: string): string {
    const match = sectionSource.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)
    if (!match) return ''

    return decodeHeading(match[1].replace(/<[^>]+>/g, ' '))
}

export function getSectionSnippets(source: string, slug?: string): DocSectionSnippet[] {
    const overrides = slug ? sectionSnippetOverrides[slug] : undefined

    return [...source.matchAll(/<section\b[\s\S]*?<\/section>/g)].map((match) => {
        const sectionSource = match[0]
        const heading = extractSectionHeading(sectionSource)
        const overrideSnippet = heading && overrides ? overrides[heading] : undefined

        return {
            heading,
            snippet: overrideSnippet ?? extractSectionSnippet(sectionSource)
        }
    })
}

function detectLanguage(code: string): 'svelte' | 'ts' | 'js' | 'css' | 'html' | 'json' | 'bash' {
    const source = code.trim()

    if (
        source.includes('<script lang="ts">') ||
        source.includes('$state(') ||
        source.includes('{#each') ||
        source.includes('<Button') ||
        source.includes('<FormField')
    ) {
        return 'svelte'
    }

    if (source.startsWith('{') || source.startsWith('[')) {
        return 'json'
    }

    if (source.startsWith('@import') || source.includes('{') && source.includes(':') && source.includes(';')) {
        return 'css'
    }

    if (source.includes('import ') || source.includes('export ') || source.includes('interface ')) {
        return 'ts'
    }

    if (source.startsWith('<') && source.endsWith('>')) {
        return 'html'
    }

    if (source.startsWith('npm ') || source.startsWith('bun ') || source.startsWith('pnpm ')) {
        return 'bash'
    }

    return 'js'
}

function decorateHighlightedHtml(html: string): string {
    return html.replace(
        /<pre class="shiki[\s\S]*?"[^>]*>/,
        '<pre class="shiki overflow-x-auto p-4 text-sm leading-6 m-0 rounded-none">'
    )
}

export async function renderHighlightedCode(code: string, isDarkMode = true): Promise<string> {
    const html = await codeToHtml(code, {
        lang: detectLanguage(code),
        theme: isDarkMode ? 'github-dark' : 'github-light'
    })

    return decorateHighlightedHtml(html)
}
