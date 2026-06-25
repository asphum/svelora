export const quickExample = `<script lang="ts">
 import { useInterval, useTimeout } from 'svelora';

 let count = $state(0);
 useInterval(() => count++, 1000);
 const timeout = useTimeout(() => console.log('done'), 3000);
</script>

<button onclick={timeout.restart}>{count}</button>`
