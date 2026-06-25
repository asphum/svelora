<script lang="ts">
    import { List, ListItem, Avatar } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">List</h1>
        <p class="text-on-surface-variant">
            A versatile component for displaying continuous, vertical indexes of text or images.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Usage</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">List</code> to wrap multiple <code class="rounded bg-surface-container-highest px-1">ListItem</code> components.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <List class="w-full max-w-md bg-surface border border-outline-variant rounded-lg">
                <ListItem title="Account Settings" description="Manage your profile and preferences" />
                <ListItem title="Security" description="Password, 2FA, and sessions" />
                <ListItem title="Notifications" description="Email and push alerts" />
            </List>
        </div>
    </section>

    <!-- Avatars & Actions -->
    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Avatars & Actions</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1">leading</code> and <code class="rounded bg-surface-container-highest px-1">trailing</code> snippets to add avatars, icons, or buttons.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <List class="w-full max-w-md bg-surface border border-outline-variant rounded-lg">
                <ListItem title="Alice" description="Active 2m ago" href="#">
                    {#snippet leading()}
                        <Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" />
                    {/snippet}
                </ListItem>
                <ListItem title="Bob" description="Offline" href="#">
                    {#snippet leading()}
                        <Avatar src="https://i.pravatar.cc/150?img=2" alt="Bob" />
                    {/snippet}
                </ListItem>
            </List>
        </div>
    </section>
</div>
