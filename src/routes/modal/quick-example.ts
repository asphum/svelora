export const quickExample = `<script lang="ts">
 import { Button, Modal } from 'svelora';

 let open = $state(false);
</script>

<Button label="Open modal" onclick={() => (open = true)} />
<Modal bind:open title="Confirm action" />`
