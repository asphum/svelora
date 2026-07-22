import { beforeEach, describe, expect, it, vi } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-svelte'
import Lightbox from './Lightbox.svelte'

describe('Lightbox', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
    })

    describe('rendering', () => {
        it('should render single image when open is true', async () => {
            render(Lightbox, {
                open: true,
                src: 'https://example.com/photo.jpg',
                title: 'Test Photo',
                portal: false
            })

            await vi.waitFor(() => {
                expect(page.getByText('Test Photo')).toBeInTheDocument()
                const img = document.querySelector('img[src="https://example.com/photo.jpg"]')
                expect(img).not.toBeNull()
            })
        })

        it('should render gallery with thumbnails and counter', async () => {
            const images = [
                { src: 'https://example.com/1.jpg', title: 'Image One' },
                { src: 'https://example.com/2.jpg', title: 'Image Two' }
            ]

            render(Lightbox, {
                open: true,
                images,
                index: 0,
                portal: false
            })

            await vi.waitFor(() => {
                expect(page.getByText('Image One')).toBeInTheDocument()
                expect(page.getByText('1 / 2')).toBeInTheDocument()
                const thumbs = document.querySelectorAll('button[aria-label^="Go to image"]')
                expect(thumbs.length).toBe(2)
            })
        })
    })

    describe('navigation', () => {
        it('should navigate to next image when clicking next button', async () => {
            const images = ['https://example.com/1.jpg', 'https://example.com/2.jpg']
            const onIndexChange = vi.fn()

            render(Lightbox, {
                open: true,
                images,
                index: 0,
                onIndexChange,
                portal: false
            })

            const nextBtn = page.getByRole('button', { name: 'Next image' })
            await nextBtn.click()

            expect(onIndexChange).toHaveBeenCalledWith(1)
        })
    })
})
