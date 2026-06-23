export const quickExample = `<script lang="ts">
 import { RadioGroup } from 'svelora';

 const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' }
 ];

 let value = $state('apple');
</script>

<RadioGroup {items} bind:value />`
