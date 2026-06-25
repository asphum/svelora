export const quickExample = `<script lang="ts">
 import { Rating } from 'svelora';
 let score = $state(3.5);
</script>

<Rating bind:value={score} allowHalf={true} />`
