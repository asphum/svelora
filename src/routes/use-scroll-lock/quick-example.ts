export const quickExample = `<script lang="ts">
 import { useScrollLock } from 'svelora';

 let open = $state(false);
 useScrollLock(() => open);
</script>

<button onclick={() => (open = !open)}>
 {open ? 'Unlock' : 'Lock'} page scroll
</button>`
