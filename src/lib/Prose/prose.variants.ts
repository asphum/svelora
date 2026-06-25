import { tv, type VariantProps } from 'tailwind-variants'

export const proseVariants = tv({
    slots: {
        base: [
            'text-surface-900 dark:text-surface-50 max-w-none',
            // Paragraphs
            '[&_p]:leading-7 [&_p]:mb-6 [&_p:last-child]:mb-0',
            // Headings
            '[&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:mt-0 [&_h1]:mb-6',
            '[&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4',
            '[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-4',
            '[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:tracking-tight [&_h4]:mt-8 [&_h4]:mb-4',
            // Links
            '[&_a]:font-medium [&_a]:text-primary-600 dark:[&_a]:text-primary-400 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary-500',
            // Blockquotes
            '[&_blockquote]:mt-6 [&_blockquote]:mb-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-500 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-surface-700 dark:[&_blockquote]:text-surface-300',
            // Lists
            '[&_ul]:my-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ul>li]:mt-2',
            '[&_ol]:my-6 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol>li]:mt-2',
            // Code & Pre
            '[&_code]:relative [&_code]:rounded [&_code]:bg-surface-200 dark:[&_code]:bg-surface-800 [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold',
            '[&_pre]:mb-6 [&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-900 [&_pre]:py-4 [&_pre]:dark:bg-surface-800',
            '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-surface-50 [&_pre_code]:font-normal',
            // Images & Media
            '[&_img]:rounded-lg [&_img]:border [&_img]:border-outline-variant [&_video]:rounded-lg',
            // Tables
            '[&_table]:w-full [&_table]:my-6 [&_table]:overflow-y-auto [&_table]:text-left',
            '[&_th]:border [&_th]:border-outline-variant [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:bg-surface-100 dark:[&_th]:bg-surface-800',
            '[&_td]:border [&_td]:border-outline-variant [&_td]:px-4 [&_td]:py-2',
            '[&_tr:nth-child(even)]:bg-surface-50 dark:[&_tr:nth-child(even)]:bg-surface-900/50',
            // HR
            '[&_hr]:my-8 [&_hr]:border-outline-variant'
        ]
    },
    variants: {
        size: {
            sm: { base: 'text-sm [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl' },
            base: { base: 'text-base' },
            lg: { base: 'text-lg [&_h1]:text-5xl [&_h2]:text-4xl [&_h3]:text-3xl' }
        }
    },
    defaultVariants: {
        size: 'base'
    }
})

export type ProseVariantProps = VariantProps<typeof proseVariants>
