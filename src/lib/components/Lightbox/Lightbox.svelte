<script lang="ts" module>
    import type { LightboxImage, LightboxProps } from './lightbox.types.js'

    export type Props = LightboxProps
</script>

<script lang="ts">
    import { Dialog } from 'bits-ui'
    import { getComponentConfig, iconsDefaults } from '../../config.js'
    import Icon from '../Icon/Icon.svelte'
    import { lightboxDefaults, lightboxVariants } from './lightbox.variants.js'

    const config = getComponentConfig('lightbox', lightboxDefaults)
    const icons = getComponentConfig('icons', iconsDefaults)

    let {
        ref = $bindable(null),
        open = $bindable(false),
        onOpenChange,
        images = [],
        src,
        alt,
        title,
        description,
        index = $bindable(0),
        onIndexChange,
        loop = true,
        zoom = true,
        rotate = true,
        download = true,
        fullscreen = true,
        thumbnails = true,
        counter = true,
        portal = true,
        preventScroll = true,
        trapFocus = true,
        onOpenAutoFocus,
        onCloseAutoFocus,
        onEscapeKeydown,
        onInteractOutside,
        forceMount,
        size = config.defaultVariants.size ?? 'md',
        headerSlot,
        footerSlot,
        children,
        class: className,
        ui,
        ...restProps
    }: Props = $props()

    let zoomScale = $state(1)
    let rotationDeg = $state(0)
    let isFullscreen = $state(false)
    let isDragging = $state(false)
    let dragStartX = $state(0)
    let dragStartY = $state(0)
    let panX = $state(0)
    let panY = $state(0)
    let rootContainerNode = $state<HTMLElement | null>(null)

    // Normalize images input
    const itemsList = $derived.by<LightboxImage[]>(() => {
        if (src) {
            return [{ src, alt, title, description }]
        }
        if (!images.length) return []
        return images.map((item) => {
            if (typeof item === 'string') {
                return { src: item }
            }
            return item
        })
    })

    const totalCount = $derived(itemsList.length)
    const currentItem = $derived<LightboxImage | undefined>(itemsList[index] ?? itemsList[0])

    const variantSlots = $derived(lightboxVariants({ size }))
    const classes = $derived({
        root: variantSlots.root({ class: [config.slots.root, className, ui?.root] }),
        header: variantSlots.header({ class: [config.slots.header, ui?.header] }),
        titleGroup: variantSlots.titleGroup({ class: [config.slots.titleGroup, ui?.titleGroup] }),
        title: variantSlots.title({ class: [config.slots.title, ui?.title] }),
        description: variantSlots.description({
            class: [config.slots.description, ui?.description]
        }),
        toolbar: variantSlots.toolbar({ class: [config.slots.toolbar, ui?.toolbar] }),
        toolButton: variantSlots.toolButton({ class: [config.slots.toolButton, ui?.toolButton] }),
        body: variantSlots.body({ class: [config.slots.body, ui?.body] }),
        imageWrapper: variantSlots.imageWrapper({
            class: [config.slots.imageWrapper, ui?.imageWrapper]
        }),
        image: variantSlots.image({ class: [config.slots.image, ui?.image] }),
        navButton: variantSlots.navButton({ class: [config.slots.navButton, ui?.navButton] }),
        prevButton: variantSlots.prevButton({ class: [config.slots.prevButton, ui?.prevButton] }),
        nextButton: variantSlots.nextButton({ class: [config.slots.nextButton, ui?.nextButton] }),
        footer: variantSlots.footer({ class: [config.slots.footer, ui?.footer] }),
        counter: variantSlots.counter({ class: [config.slots.counter, ui?.counter] }),
        thumbnails: variantSlots.thumbnails({ class: [config.slots.thumbnails, ui?.thumbnails] }),
        thumbnail: variantSlots.thumbnail({ class: [config.slots.thumbnail, ui?.thumbnail] }),
        thumbnailActive: variantSlots.thumbnailActive({
            class: [config.slots.thumbnailActive, ui?.thumbnailActive]
        }),
        thumbnailInactive: variantSlots.thumbnailInactive({
            class: [config.slots.thumbnailInactive, ui?.thumbnailInactive]
        })
    })

    function resetView() {
        zoomScale = 1
        rotationDeg = 0
        panX = 0
        panY = 0
    }

    function close() {
        open = false
        resetView()
    }

    function goToIndex(newIndex: number) {
        if (!totalCount) return
        let targetIndex = newIndex
        if (targetIndex < 0) {
            targetIndex = loop ? totalCount - 1 : 0
        } else if (targetIndex >= totalCount) {
            targetIndex = loop ? 0 : totalCount - 1
        }
        if (targetIndex !== index) {
            index = targetIndex
            onIndexChange?.(index)
            resetView()
        }
    }

    function next() {
        goToIndex(index + 1)
    }

    function prev() {
        goToIndex(index - 1)
    }

    function handleZoomIn() {
        if (zoomScale < 3) {
            zoomScale = Math.min(3, +(zoomScale + 0.5).toFixed(1))
        }
    }

    function handleZoomOut() {
        if (zoomScale > 1) {
            zoomScale = Math.max(1, +(zoomScale - 0.5).toFixed(1))
            if (zoomScale === 1) {
                panX = 0
                panY = 0
            }
        }
    }

    function handleRotate() {
        rotationDeg = (rotationDeg + 90) % 360
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            rootContainerNode?.requestFullscreen?.().then(() => {
                isFullscreen = true
            })
        } else {
            document.exitFullscreen?.().then(() => {
                isFullscreen = false
            })
        }
    }

    function triggerDownload() {
        if (!currentItem?.src) return
        const targetUrl = currentItem.downloadUrl ?? currentItem.src
        const filename =
            currentItem.title ?? targetUrl.split('/').pop()?.split('?')[0] ?? 'image'

        const a = document.createElement('a')
        a.href = targetUrl
        a.download = filename
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    function handleMouseDown(e: MouseEvent) {
        if (zoomScale <= 1) return
        isDragging = true
        dragStartX = e.clientX - panX
        dragStartY = e.clientY - panY
    }

    function handleMouseMove(e: MouseEvent) {
        if (!isDragging || zoomScale <= 1) return
        panX = e.clientX - dragStartX
        panY = e.clientY - dragStartY
    }

    function handleMouseUp() {
        isDragging = false
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (!open) return

        if (e.key === 'ArrowRight') {
            e.preventDefault()
            next()
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            prev()
        } else if (e.key === '+' || e.key === '=') {
            e.preventDefault()
            handleZoomIn()
        } else if (e.key === '-') {
            e.preventDefault()
            handleZoomOut()
        } else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault()
            resetView()
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

<Dialog.Root bind:open {onOpenChange}>
    <Dialog.Portal disabled={!portal}>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md" />
        <Dialog.Content
            {...restProps}
            bind:ref
            {preventScroll}
            {trapFocus}
            {onOpenAutoFocus}
            {onCloseAutoFocus}
            {onEscapeKeydown}
            {onInteractOutside}
            {forceMount}
            class={classes.root}
        >
            <div bind:this={rootContainerNode} class="relative flex size-full flex-col">
                <!-- Header -->
                {#if headerSlot && currentItem}
                    {@render headerSlot({ image: currentItem, index, total: totalCount, close })}
                {:else}
                    <div class={classes.header}>
                        <div class={classes.titleGroup}>
                            <Dialog.Title class={classes.title}>
                                {currentItem?.title ?? currentItem?.alt ?? 'Image Preview'}
                            </Dialog.Title>
                            {#if currentItem?.description}
                                <Dialog.Description class={classes.description}>
                                    {currentItem.description}
                                </Dialog.Description>
                            {/if}
                        </div>

                        <div class={classes.toolbar}>
                            {#if zoom}
                                <button
                                    type="button"
                                    class={classes.toolButton}
                                    onclick={handleZoomIn}
                                    aria-label="Zoom in"
                                    title="Zoom in (+)"
                                >
                                    <Icon name={icons.zoomIn ?? 'lucide:zoom-in'} class="size-5" />
                                </button>
                                <button
                                    type="button"
                                    class={classes.toolButton}
                                    onclick={handleZoomOut}
                                    disabled={zoomScale <= 1}
                                    aria-label="Zoom out"
                                    title="Zoom out (-)"
                                >
                                    <Icon name="lucide:zoom-out" class="size-5" />
                                </button>
                            {/if}

                            {#if rotate}
                                <button
                                    type="button"
                                    class={classes.toolButton}
                                    onclick={handleRotate}
                                    aria-label="Rotate image"
                                    title="Rotate 90deg"
                                >
                                    <Icon name="lucide:rotate-cw" class="size-5" />
                                </button>
                            {/if}

                            {#if zoomScale > 1 || rotationDeg !== 0}
                                <button
                                    type="button"
                                    class={classes.toolButton}
                                    onclick={resetView}
                                    aria-label="Reset zoom and rotation"
                                    title="Reset view (R)"
                                >
                                    <Icon name="lucide:rotate-ccw" class="size-5" />
                                </button>
                            {/if}

                            {#if download && currentItem?.src}
                                <button
                                    type="button"
                                    class={classes.toolButton}
                                    onclick={triggerDownload}
                                    aria-label="Download image"
                                    title="Download image"
                                >
                                    <Icon name="lucide:download" class="size-5" />
                                </button>
                            {/if}

                            {#if fullscreen}
                                <button
                                    type="button"
                                    class={classes.toolButton}
                                    onclick={toggleFullscreen}
                                    aria-label="Toggle fullscreen"
                                    title="Toggle fullscreen"
                                >
                                    <Icon
                                        name={isFullscreen
                                            ? 'lucide:minimize'
                                            : 'lucide:maximize'}
                                        class="size-5"
                                    />
                                </button>
                            {/if}

                            <Dialog.Close
                                class={classes.toolButton}
                                onclick={close}
                                aria-label="Close lightbox"
                            >
                                <Icon name={icons.close} class="size-5" />
                            </Dialog.Close>
                        </div>
                    </div>
                {/if}

                <!-- Body (Image Display) -->
                <div class={classes.body}>
                    {#if totalCount > 1}
                        <button
                            type="button"
                            class={[classes.navButton, classes.prevButton]}
                            onclick={prev}
                            aria-label="Previous image"
                        >
                            <Icon name={icons.chevronLeft} class="size-6" />
                        </button>
                    {/if}

                    <div class={classes.imageWrapper}>
                        {#if currentItem}
                            {#if children}
                                {@render children({ image: currentItem, index })}
                            {:else}
                                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                                <img
                                    src={currentItem.src}
                                    alt={currentItem.alt ?? currentItem.title ?? ''}
                                    class={classes.image}
                                    style="transform: scale({zoomScale}) rotate({rotationDeg}deg) translate({panX /
                                        zoomScale}px, {panY / zoomScale}px);"
                                    onmousedown={handleMouseDown}
                                    draggable="false"
                                />
                            {/if}
                        {/if}
                    </div>

                    {#if totalCount > 1}
                        <button
                            type="button"
                            class={[classes.navButton, classes.nextButton]}
                            onclick={next}
                            aria-label="Next image"
                        >
                            <Icon name={icons.chevronRight} class="size-6" />
                        </button>
                    {/if}
                </div>

                <!-- Footer (Counter & Thumbnails) -->
                {#if footerSlot && currentItem}
                    {@render footerSlot({ image: currentItem, index, total: totalCount })}
                {:else if totalCount > 1 || counter}
                    <div class={classes.footer}>
                        {#if counter && totalCount > 1}
                            <span class={classes.counter}>
                                {index + 1} / {totalCount}
                            </span>
                        {/if}

                        {#if thumbnails && totalCount > 1}
                            <div class={classes.thumbnails}>
                                {#each itemsList as thumb, i (thumb.src + i)}
                                    <button
                                        type="button"
                                        class={[
                                            classes.thumbnail,
                                            i === index
                                                ? classes.thumbnailActive
                                                : classes.thumbnailInactive
                                        ]}
                                        onclick={() => goToIndex(i)}
                                        aria-label="Go to image {i + 1}"
                                    >
                                        <img
                                            src={thumb.src}
                                            alt={thumb.alt ?? `Thumbnail ${i + 1}`}
                                            class="size-full object-cover"
                                        />
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
