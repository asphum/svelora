export const quickExample = `<script lang="ts">
 import { useElementSize } from 'svelora';

 let box = $state<HTMLElement | null>(null);
 const size = useElementSize(() => box);
</script>

<div bind:this={box}>
 {Math.round(size.width)} x {Math.round(size.height)}
</div>`
