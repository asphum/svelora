export const quickExample = `<script lang="ts">
 import { ConfirmDialog, confirmDialog, registerConfirmDialog } from 'svelora';
 import { onMount } from 'svelte';

 let confirmDialogRef: { show: (options?: import('svelora').ConfirmOptions) => Promise<boolean> };

 onMount(() => {
   registerConfirmDialog((options) => confirmDialogRef.show(options));
 });

 async function handleDelete() {
   const ok = await confirmDialog.delete();
   if (ok) console.log('Deleted');
 }
</script>

<button type="button" onclick={handleDelete}>Delete item</button>
<ConfirmDialog bind:this={confirmDialogRef} />`
