export const quickExample = `<script lang="ts">
 import { useEventListener } from 'svelora';

 let button = $state<HTMLButtonElement | null>(null);

 useEventListener(() => button, 'click', () => {
  console.log('clicked');
 });
</script>

<button bind:this={button}>Click me</button>`
