export const quickExample = `<script lang="ts">
 import { useLocalStorage } from 'svelora';

 const theme = useLocalStorage('theme', 'system');
</script>

<button onclick={() => (theme.current = 'dark')}>
 {theme.current}
</button>`
