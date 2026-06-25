export const quickExample = `<script lang="ts">
 import { TagsInput } from 'svelora';
 let tags = $state(['svelte', 'components']);
</script>

<TagsInput bind:value={tags} placeholder="Add a tag..." />`
