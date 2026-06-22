<script lang="ts">
    import { Alert, Button, Card, Icon, Link } from '$lib/index.js'
</script>

<div class="space-y-8">
    <div class="space-y-3">
        <h1 class="text-3xl font-bold">Introduction</h1>
        <p class="text-lg text-on-surface-variant">
            Welcome to <strong>Svelora</strong> — a modern, accessible UI component library built
            natively for <strong>Svelte 5</strong> and <strong>Tailwind CSS 4</strong>.
        </p>
    </div>

    <Alert
        variant="soft"
        color="info"
        title="What is Svelora?"
        description="A collection of 53+ production-ready components, primitives built on bits-ui, full TypeScript types, OKLCH color tokens, and dark mode out of the box."
    />

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Why Svelora?</h2>
        <div class="grid gap-3 sm:grid-cols-2">
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:zap" class="mt-0.5 text-primary" />
                    <div>
                        <h3 class="font-semibold">Svelte 5 Native</h3>
                        <p class="text-sm text-on-surface-variant">
                            Built with runes, snippets, and modern reactivity primitives.
                        </p>
                    </div>
                </div>
            </Card>
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:palette" class="mt-0.5 text-secondary" />
                    <div>
                        <h3 class="font-semibold">Tailwind CSS 4</h3>
                        <p class="text-sm text-on-surface-variant">
                            OKLCH color tokens and full theme customization via CSS variables.
                        </p>
                    </div>
                </div>
            </Card>
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:layers" class="mt-0.5 text-tertiary" />
                    <div>
                        <h3 class="font-semibold">Headless Primitives</h3>
                        <p class="text-sm text-on-surface-variant">
                            Built on <a
                                href="https://bits-ui.com"
                                target="_blank"
                                rel="noopener"
                                class="text-primary hover:underline">bits-ui</a
                            > for accessibility and behavior.
                        </p>
                    </div>
                </div>
            </Card>
            <Card>
                <div class="flex items-start gap-3">
                    <Icon name="lucide:code" class="mt-0.5 text-info" />
                    <div>
                        <h3 class="font-semibold">Fully Typed</h3>
                        <p class="text-sm text-on-surface-variant">
                            TypeScript types exported for every component and slot.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-xl font-semibold">Next steps</h2>
        <div class="flex flex-wrap gap-3">
            <Button
                label="Installation"
                variant="solid"
                color="primary"
                trailingIcon="lucide:arrow-right"
                href="/getting-started/installation"
            />
            <Button
                label="Theming"
                variant="outline"
                trailingIcon="lucide:arrow-right"
                href="/getting-started/theming"
            />
            <Button
                label="Dark Mode"
                variant="outline"
                trailingIcon="lucide:arrow-right"
                href="/getting-started/dark-mode"
            />
            <Button
                label="Components"
                variant="ghost"
                trailingIcon="lucide:arrow-right"
                href="/getting-started/components"
            />
        </div>
    </section>
</div>
