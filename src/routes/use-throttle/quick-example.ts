export const quickExample = `<script lang="ts">
 import { useThrottle } from 'svelora';

 const throttle = useThrottle({ delay: 200 });

 function handleScroll() {
  throttle.run(() => console.log('scroll'));
 }
</script>

<svelte:window onscroll={handleScroll} />`
