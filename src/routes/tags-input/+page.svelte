<script lang="ts">
    import { TagsInput, Button } from '$lib/index.js'
    
    let tags1 = $state(['svelte', 'tailwind', 'typescript'])
    let tags2 = $state(['apple', 'banana'])
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">TagsInput</h1>
        <p class="text-on-surface-variant">
            An input component for entering and managing multiple string values as tags (pills).
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">bind:value</code> with an array of strings. Press Enter or comma (,) to add a tag.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-4 max-w-sm">
            <TagsInput bind:value={tags1} placeholder="Add new skill..." />
            <div class="text-sm text-on-surface-variant">
                <strong>Current Value:</strong> {tags1.join(', ')}
            </div>
        </div>
    </section>

    <!-- Max Tags -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Max Tags</h2>
        <p class="text-sm text-on-surface-variant">
            Set the <code class="rounded bg-surface-container-highest px-1">maxTags</code> prop to limit how many tags can be added.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-sm">
                <TagsInput bind:value={tags2} maxTags={3} placeholder="Max 3 tags allowed" />
            </div>
        </div>
    </section>
</div>
