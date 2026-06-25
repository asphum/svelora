export const quickExample = `<script lang="ts">
 import { useDebouncedState } from 'svelora';

 const search = useDebouncedState('', 300);
</script>

<input bind:value={search.current} placeholder="Search..." />
<p>{search.debounced}</p>`
