import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { Popover, Button } from 'svelora';
</script>

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
</script>

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
</script>

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
</script>

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
</script>

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
}
