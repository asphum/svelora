export const quickExample = `<script lang="ts">
 import { useIntersectionObserver } from 'svelora';

 let target = $state<Element | null>(null);
 const io = useIntersectionObserver(() => target);
</script>

<div bind:this={target}>
 {io.isIntersecting ? 'Visible' : 'Hidden'}
</div>`
