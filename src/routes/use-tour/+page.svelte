<script lang="ts">
    import { Badge, Button, Link, Tour, useTour, type TourStep } from '$lib/index.js'

    const steps: TourStep[] = [
        {
            id: 'intro',
            target: '#use-tour-hero',
            title: 'Headless controller',
            description: 'useTour holds open/step state without rendering UI.'
        },
        {
            id: 'actions',
            target: '#use-tour-actions',
            title: 'Drive navigation',
            description: 'Call start, next, prev, goTo, or stop from anywhere.'
        },
        {
            id: 'done',
            target: null,
            title: 'Done',
            description: 'Pair with <Tour controller={tour} /> for the spotlight UI.',
            disableSpotlight: true
        }
    ]

    const tour = useTour({
        steps,
        onStart: () => {
            log = [...log, 'onStart']
        },
        onComplete: () => {
            log = [...log, 'onComplete']
        },
        onSkip: () => {
            log = [...log, 'onSkip']
        },
        onStepChange: (index) => {
            log = [...log, `onStepChange: ${index}`]
        }
    })

    let log = $state<string[]>([])

    const controllerReference = [
        { name: 'isActive', type: 'boolean', description: 'Whether the tour is active.' },
        { name: 'currentIndex', type: 'number', description: 'Current step index.' },
        { name: 'currentStepData', type: 'TourStep | undefined', description: 'Current step object.' },
        { name: 'start()', type: '() => void', description: 'Open the tour at the first enabled step.' },
        { name: 'stop()', type: '() => void', description: 'Close the tour and clear persisted state.' },
        { name: 'next()', type: '() => Promise<void>', description: 'Advance, honoring onBeforeNext guards.' },
        { name: 'prev()', type: '() => Promise<void>', description: 'Go back, honoring onBeforePrev guards.' },
        { name: 'goTo(step)', type: '(number | string) => Promise<void>', description: 'Jump to a step by index or id.' }
    ] as const

    const optionsReference = [
        { name: 'steps', type: 'TourStep[]', description: 'Tour step definitions shared with <Tour />.' },
        { name: 'defaultStep', type: 'number', description: 'Initial step index. Default: 0.' },
        { name: 'persist', type: 'boolean | TourPersistOptions', description: 'Resume in-progress tours across reloads.' },
        { name: 'onStart', type: '() => void', description: 'Called when the tour opens.' },
        { name: 'onComplete', type: '() => void', description: 'Called when the last step finishes.' },
        { name: 'onSkip', type: '() => void', description: 'Called when the user dismisses the tour.' },
        { name: 'onStepChange', type: '(index: number) => void', description: 'Called after the active step changes.' }
    ] as const
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">useTour</h1>
        <p class="text-on-surface-variant">
            Headless controller สำหรับ <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">Tour</code>
            — เก็บ state แบบ reactive โดยไม่ render UI เอง เหมาะกับ multi-page tour เมื่อใช้ร่วมกับ
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">persist</code>
            และนำทาง route ใน <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">onStepChange</code>
        </p>
        <p class="text-sm text-on-surface-variant">
            ดูตัวอย่าง multi-page เต็มรูปแบบที่
            <Link href="/tour/multi" raw class="text-primary hover:underline">/tour/multi</Link>
        </p>
    </div>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Interactive demo</h2>
        <div
            id="use-tour-hero"
            class="rounded-lg border border-outline-variant bg-surface-container-high p-4 text-sm"
        >
            Hero target — ขั้นตอนแรกจะ spotlight ตรงนี้
        </div>

        <div id="use-tour-actions" class="flex flex-wrap items-center gap-3 rounded-lg bg-surface-container-high p-4">
            <Button color="primary" onclick={() => tour.start()}>Start</Button>
            <Button variant="outline" onclick={() => tour.prev()}>Prev</Button>
            <Button variant="outline" onclick={() => tour.next()}>Next</Button>
            <Button variant="soft" onclick={() => tour.stop()}>Stop</Button>
            <Badge label={tour.isActive ? 'Open' : 'Closed'} color={tour.isActive ? 'success' : 'surface'} variant="soft" />
            <Badge label={`Step ${tour.currentIndex + 1}`} color="primary" variant="soft" />
        </div>

        <Tour {steps} controller={tour} dismissible />

        {#if log.length > 0}
            <pre class="overflow-x-auto rounded-lg bg-surface-container-highest p-3 text-xs">{log.join('\n')}</pre>
        {/if}
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Options</h2>
        <div class="overflow-x-auto rounded-lg border border-outline-variant">
            <table class="w-full text-left text-sm">
                <thead class="bg-surface-container-high text-on-surface-variant">
                    <tr>
                        <th class="px-4 py-2 font-medium">Name</th>
                        <th class="px-4 py-2 font-medium">Type</th>
                        <th class="px-4 py-2 font-medium">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each optionsReference as row (row.name)}
                        <tr class="border-t border-outline-variant/60">
                            <td class="px-4 py-2 font-mono text-xs">{row.name}</td>
                            <td class="px-4 py-2 font-mono text-xs text-on-surface-variant">{row.type}</td>
                            <td class="px-4 py-2">{row.description}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section class="space-y-3">
        <h2 class="text-lg font-semibold">Controller API</h2>
        <div class="overflow-x-auto rounded-lg border border-outline-variant">
            <table class="w-full text-left text-sm">
                <thead class="bg-surface-container-high text-on-surface-variant">
                    <tr>
                        <th class="px-4 py-2 font-medium">Name</th>
                        <th class="px-4 py-2 font-medium">Type</th>
                        <th class="px-4 py-2 font-medium">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {#each controllerReference as row (row.name)}
                        <tr class="border-t border-outline-variant/60">
                            <td class="px-4 py-2 font-mono text-xs">{row.name}</td>
                            <td class="px-4 py-2 font-mono text-xs text-on-surface-variant">{row.type}</td>
                            <td class="px-4 py-2">{row.description}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>
</div>
