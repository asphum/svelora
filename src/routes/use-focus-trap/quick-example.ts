export const quickExample = `<script lang="ts">
 import { useFocusTrap } from 'svelora';

 let active = $state(true);
 let panel = $state<HTMLElement | null>(null);

 useFocusTrap(() => panel, { active: () => active });
</script>

<div bind:this={panel} tabindex="-1">
 <button>First</button>
 <button>Second</button>
</div>`
