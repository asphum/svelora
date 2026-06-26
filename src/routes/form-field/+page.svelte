<script lang="ts">
    import { FormField, Input, Textarea, Select, Checkbox, Switch, Separator } from '$lib/index.js'

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    const countryOptions = [
        { label: 'Vietnam', value: 'vn' },
        { label: 'United States', value: 'us' },
        { label: 'Japan', value: 'jp' },
        { label: 'South Korea', value: 'kr' }
    ]
</script>

<div class="space-y-8">
    <h1 class="text-2xl font-bold text-on-surface">FormField</h1>

    <!-- Basic Usage -->
    <section class="space-y-4">
        <h2 id="Basic-Usage" class="text-lg font-semibold text-on-surface">
<a href="#Basic-Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Basic Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Wrap a form control with <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">FormField</code
            > to add a label.
        </p>
        <div class="max-w-sm">
            <FormField label="Email">
                <Input type="email" placeholder="Enter your email" />
            </FormField>
        </div>
    </section>

    <!-- Required -->
    <section class="space-y-4">
        <h2 id="Required" class="text-lg font-semibold text-on-surface">
<a href="#Required" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Required
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >required</code
            > to add an asterisk indicator.
        </p>
        <div class="max-w-sm">
            <FormField label="Email" required>
                <Input type="email" placeholder="Enter your email" />
            </FormField>
        </div>
    </section>

    <!-- Description -->
    <section class="space-y-4">
        <h2 id="Description" class="text-lg font-semibold text-on-surface">
<a href="#Description" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Description
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >description</code
            > to add text below the label.
        </p>
        <div class="max-w-sm">
            <FormField label="Email" description="We'll use this to send you notifications.">
                <Input type="email" placeholder="Enter your email" />
            </FormField>
        </div>
    </section>

    <!-- Hint -->
    <section class="space-y-4">
        <h2 id="Hint" class="text-lg font-semibold text-on-surface">
<a href="#Hint" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Hint
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">hint</code> to
            add text next to the label.
        </p>
        <div class="max-w-sm">
            <FormField label="Email" hint="Optional">
                <Input type="email" placeholder="Enter your email" />
            </FormField>
        </div>
    </section>

    <!-- Help -->
    <section class="space-y-4">
        <h2 id="Help" class="text-lg font-semibold text-on-surface">
<a href="#Help" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Help
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">help</code> to
            add help text below the form control.
        </p>
        <div class="max-w-sm">
            <FormField label="Password" help="Must be at least 8 characters.">
                <Input type="password" placeholder="Enter your password" />
            </FormField>
        </div>
    </section>

    <!-- Error -->
    <section class="space-y-4">
        <h2 id="Error" class="text-lg font-semibold text-on-surface">
<a href="#Error" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Error
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">error</code
            > to display an error message. Replaces help text when present.
        </p>
        <div class="max-w-sm space-y-4">
            <FormField label="Email" error="Please enter a valid email address.">
                <Input type="email" value="invalid-email" color="error" />
            </FormField>

            <FormField
                label="Email"
                help="We'll never share your email."
                error="This email is already taken."
            >
                <Input type="email" value="taken@example.com" color="error" />
            </FormField>
        </div>
    </section>

    <!-- Size -->
    <section class="space-y-4">
        <h2 id="Size" class="text-lg font-semibold text-on-surface">
<a href="#Size" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Size
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code> to
            control the size of labels and text.
        </p>
        <div class="space-y-4">
            {#each sizes as size (size)}
                <div class="max-w-sm">
                    <FormField
                        label="Email ({size})"
                        description="Enter your email address."
                        hint="Required"
                        {size}
                        required
                    >
                        <Input type="email" placeholder="Enter your email" {size} />
                    </FormField>
                </div>
            {/each}
        </div>
    </section>

    <!-- Orientation -->
    <section class="space-y-4">
        <h2 id="Orientation" class="text-lg font-semibold text-on-surface">
<a href="#Orientation" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Orientation
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >orientation</code
            > to change the layout direction.
        </p>
        <div class="space-y-6">
            <div class="max-w-sm">
                <p class="mb-2 text-xs text-on-surface-variant">vertical (default)</p>
                <FormField label="Email" description="Your primary email." orientation="vertical">
                    <Input type="email" placeholder="Enter your email" />
                </FormField>
            </div>

            <div class="max-w-lg">
                <p class="mb-2 text-xs text-on-surface-variant">horizontal</p>
                <FormField label="Email" description="Your primary email." orientation="horizontal">
                    <Input type="email" placeholder="Enter your email" />
                </FormField>
            </div>
        </div>
    </section>

    <!-- With Different Controls -->
    <section class="space-y-4">
        <h2 id="With-Different-Controls" class="text-lg font-semibold text-on-surface">
<a href="#With-Different-Controls" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        With Different Controls
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            FormField works with any form control component.
        </p>
        <div class="max-w-sm space-y-4">
            <FormField label="Bio" help="Max 280 characters.">
                <Textarea placeholder="Tell us about yourself..." />
            </FormField>

            <FormField label="Country" hint="Required" required>
                <Select items={countryOptions} placeholder="Select a country" />
            </FormField>

            <FormField label="Notifications" description="Receive email notifications.">
                <Switch />
            </FormField>

            <FormField label="Terms" required>
                <Checkbox label="I agree to the terms and conditions" />
            </FormField>
        </div>
    </section>

    <Separator />

    <!-- Real World Examples -->
    <section class="space-y-4">
        <h2 id="Real-World-Examples" class="text-lg font-semibold text-on-surface">
<a href="#Real-World-Examples" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Real World Examples
                    </a>
</h2>

        <div class="space-y-6">
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Registration form</p>
                <div
                    class="max-w-sm space-y-4 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <FormField label="Full name" required>
                        <Input placeholder="John Doe" />
                    </FormField>

                    <FormField label="Email" required hint="Required">
                        <Input type="email" placeholder="john@example.com" />
                    </FormField>

                    <FormField
                        label="Password"
                        required
                        help="Must be at least 8 characters with one uppercase letter."
                    >
                        <Input type="password" placeholder="Create a password" />
                    </FormField>

                    <FormField
                        label="Bio"
                        hint="Optional"
                        help="Brief description for your profile."
                    >
                        <Textarea placeholder="Tell us about yourself..." />
                    </FormField>
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Validation states</p>
                <div
                    class="max-w-sm space-y-4 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <FormField label="Username" error="Username is already taken.">
                        <Input value="admin" color="error" />
                    </FormField>

                    <FormField label="Email" help="Looks good!">
                        <Input type="email" value="valid@example.com" color="success" />
                    </FormField>

                    <FormField label="Password" error="Password must be at least 8 characters.">
                        <Input type="password" value="123" color="error" />
                    </FormField>
                </div>
            </div>

            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Horizontal layout form</p>
                <div
                    class="max-w-lg space-y-4 rounded-lg border border-outline-variant bg-surface-container-low p-4"
                >
                    <FormField label="Name" orientation="horizontal" required>
                        <Input placeholder="Your name" />
                    </FormField>

                    <FormField label="Email" orientation="horizontal" required>
                        <Input type="email" placeholder="your@email.com" />
                    </FormField>

                    <FormField label="Message" orientation="horizontal">
                        <Textarea placeholder="Your message..." />
                    </FormField>
                </div>
            </div>
        </div>
    </section>
</div>
