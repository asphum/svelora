export const quickExample = `<script lang="ts">
 import { useClickOutside } from 'svelora';

 let open = $state(true);
 const container = useClickOutside(() => (open = false));
</script>

<div use:container>Click outside me</div>`
