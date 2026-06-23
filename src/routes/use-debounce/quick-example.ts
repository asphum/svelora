export const quickExample = `<script lang="ts">
 import { useDebounce } from 'svelora';

 let value = $state('');
 const debounced = useDebounce(() => value, 300);
</script>

<input bind:value placeholder="Type to debounce..." />
<p>{debounced()}</p>`
