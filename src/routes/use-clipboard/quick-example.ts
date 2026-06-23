export const quickExample = `<script lang="ts">
 import { useClipboard } from 'svelora';

 const clipboard = useClipboard();
</script>

<button onclick={() => clipboard.copy('Hello Svelora!')}>
 {clipboard.copied ? 'Copied!' : 'Copy'}
</button>`
