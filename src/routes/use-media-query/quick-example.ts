export const quickExample = `<script lang="ts">
 import { useMediaQuery } from 'svelora';

 const isDesktop = useMediaQuery('(min-width: 1024px)');
</script>

<p>{isDesktop.current ? 'Desktop' : 'Mobile'}</p>`
