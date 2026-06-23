export type DocsItem = {
    title: string
    href: string
    icon: string
    legacyHref?: string
    description?: string
}

export type DocsGroup = {
    title: string
    items: DocsItem[]
}

export const docsMeta = {
    name: 'Svelora',
    version: 'v2.2.0',
    npmCommand: 'npm install svelora',
    githubHref: 'https://github.com/asphum/svelora'
} as const

export const docsIntroItems: DocsItem[] = [
    {
        title: 'Introduction',
        href: '/docs',
        legacyHref: '/getting-started',
        icon: 'lucide:book-open',
        description: 'Overview, quick start, and ecosystem highlights.'
    },
    {
        title: 'Installation',
        href: '/docs/installation',
        legacyHref: '/getting-started/installation',
        icon: 'lucide:download',
        description: 'Install the package and set up the required styles.'
    },
    {
        title: 'Theming',
        href: '/docs/theming',
        legacyHref: '/getting-started/theming',
        icon: 'lucide:palette',
        description: 'Customize OKLCH tokens and component appearance.'
    },
    {
        title: 'Dark Mode',
        href: '/docs/dark-mode',
        legacyHref: '/getting-started/dark-mode',
        icon: 'lucide:moon-star',
        description: 'Enable light, dark, and system theme support.'
    }
] as const

export const docsThemeItems: DocsItem[] = [
    {
        title: 'Customization',
        href: '/docs/customization',
        legacyHref: '/customization',
        icon: 'lucide:sliders-horizontal',
        description: 'Configure global defaults, icons, and component slots.'
    },
    {
        title: 'Colors',
        href: '/docs/colors',
        legacyHref: '/colors',
        icon: 'lucide:swatch-book',
        description: 'Explore semantic color tokens and the surface system.'
    }
] as const

export const docsComponentGroups: DocsGroup[] = [
    {
        title: 'General',
        items: [
            { title: 'Button', href: '/docs/components/button', legacyHref: '/button', icon: 'lucide:mouse-pointer-click' },
            { title: 'FieldGroup', href: '/docs/components/field-group', legacyHref: '/field-group', icon: 'lucide:group' },
            { title: 'Icon', href: '/docs/components/icon', legacyHref: '/icon', icon: 'lucide:shapes' },
            { title: 'Link', href: '/docs/components/link', legacyHref: '/link', icon: 'lucide:link' },
            { title: 'Kbd', href: '/docs/components/kbd', legacyHref: '/kbd', icon: 'lucide:keyboard' },
            { title: 'ThemeModeButton', href: '/docs/components/theme-mode-button', legacyHref: '/theme-mode-button', icon: 'lucide:sun-moon' }
        ]
    },
    {
        title: 'Layout',
        items: [
            { title: 'Card', href: '/docs/components/card', legacyHref: '/card', icon: 'lucide:square' },
            { title: 'Container', href: '/docs/components/container', legacyHref: '/container', icon: 'lucide:box' },
            { title: 'Separator', href: '/docs/components/separator', legacyHref: '/separator', icon: 'lucide:minus' }
        ]
    },
    {
        title: 'Data Display',
        items: [
            { title: 'Accordion', href: '/docs/components/accordion', legacyHref: '/accordion', icon: 'lucide:chevrons-down-up' },
            { title: 'Avatar', href: '/docs/components/avatar', legacyHref: '/avatar', icon: 'lucide:circle-user' },
            { title: 'AvatarGroup', href: '/docs/components/avatar-group', legacyHref: '/avatar-group', icon: 'lucide:users' },
            { title: 'Badge', href: '/docs/components/badge', legacyHref: '/badge', icon: 'lucide:tag' },
            { title: 'Carousel', href: '/docs/components/carousel', legacyHref: '/carousel', icon: 'lucide:gallery-horizontal' },
            { title: 'Chip', href: '/docs/components/chip', legacyHref: '/chip', icon: 'lucide:circle-dot' },
            { title: 'Empty', href: '/docs/components/empty', legacyHref: '/empty', icon: 'lucide:inbox' },
            { title: 'Skeleton', href: '/docs/components/skeleton', legacyHref: '/skeleton', icon: 'lucide:loader-circle' },
            { title: 'Timeline', href: '/docs/components/timeline', legacyHref: '/timeline', icon: 'lucide:git-commit-horizontal' },
            { title: 'User', href: '/docs/components/user', legacyHref: '/user', icon: 'lucide:user' },
            { title: 'Table', href: '/docs/components/table', legacyHref: '/table', icon: 'lucide:table' }
        ]
    },
    {
        title: 'Forms',
        items: [
            { title: 'Checkbox', href: '/docs/components/checkbox', legacyHref: '/checkbox', icon: 'lucide:square-check' },
            { title: 'CheckboxGroup', href: '/docs/components/checkbox-group', legacyHref: '/checkbox-group', icon: 'lucide:list-checks' },
            { title: 'Editor', href: '/docs/components/editor', legacyHref: '/editor', icon: 'lucide:pen-line' },
            { title: 'Input', href: '/docs/components/input', legacyHref: '/input', icon: 'lucide:text-cursor-input' },
            { title: 'RadioGroup', href: '/docs/components/radio-group', legacyHref: '/radio-group', icon: 'lucide:circle-dot' },
            { title: 'Select', href: '/docs/components/select', legacyHref: '/select', icon: 'lucide:chevrons-up-down' },
            { title: 'SelectMenu', href: '/docs/components/select-menu', legacyHref: '/select-menu', icon: 'lucide:list-filter' },
            { title: 'Slider', href: '/docs/components/slider', legacyHref: '/slider', icon: 'lucide:sliders-horizontal' },
            { title: 'Switch', href: '/docs/components/switch', legacyHref: '/switch', icon: 'lucide:toggle-left' },
            { title: 'Textarea', href: '/docs/components/textarea', legacyHref: '/textarea', icon: 'lucide:text' },
            { title: 'FileUpload', href: '/docs/components/file-upload', legacyHref: '/file-upload', icon: 'lucide:upload' },
            { title: 'PinInput', href: '/docs/components/pin-input', legacyHref: '/pin-input', icon: 'lucide:square-asterisk' },
            { title: 'FormField', href: '/docs/components/form-field', legacyHref: '/form-field', icon: 'lucide:text-cursor-input' },
            { title: 'Form', href: '/docs/components/form', legacyHref: '/form', icon: 'lucide:clipboard-list' }
        ]
    },
    {
        title: 'Feedback',
        items: [
            { title: 'Alert', href: '/docs/components/alert', legacyHref: '/alert', icon: 'lucide:bell' },
            { title: 'Banner', href: '/docs/components/banner', legacyHref: '/banner', icon: 'lucide:megaphone' },
            { title: 'Progress', href: '/docs/components/progress', legacyHref: '/progress', icon: 'lucide:loader' },
            { title: 'Toast', href: '/docs/components/toast', legacyHref: '/toast', icon: 'lucide:message-square-warning' }
        ]
    },
    {
        title: 'Navigation',
        items: [
            { title: 'Breadcrumb', href: '/docs/components/breadcrumb', legacyHref: '/breadcrumb', icon: 'lucide:chevron-right' },
            { title: 'Pagination', href: '/docs/components/pagination', legacyHref: '/pagination', icon: 'lucide:ellipsis' },
            { title: 'Stepper', href: '/docs/components/stepper', legacyHref: '/stepper', icon: 'lucide:list-ordered' },
            { title: 'Tabs', href: '/docs/components/tabs', legacyHref: '/tabs', icon: 'lucide:panel-top' }
        ]
    },
    {
        title: 'Overlay',
        items: [
            { title: 'Collapsible', href: '/docs/components/collapsible', legacyHref: '/collapsible', icon: 'lucide:chevrons-up-down' },
            { title: 'Command', href: '/docs/components/command', legacyHref: '/command', icon: 'lucide:square-terminal' },
            { title: 'ContextMenu', href: '/docs/components/context-menu', legacyHref: '/context-menu', icon: 'lucide:mouse-pointer-square' },
            { title: 'Modal', href: '/docs/components/modal', legacyHref: '/modal', icon: 'lucide:square-stack' },
            { title: 'Drawer', href: '/docs/components/drawer', legacyHref: '/drawer', icon: 'lucide:panel-bottom' },
            { title: 'DropdownMenu', href: '/docs/components/dropdown-menu', legacyHref: '/dropdown-menu', icon: 'lucide:menu' },
            { title: 'Popover', href: '/docs/components/popover', legacyHref: '/popover', icon: 'lucide:messages-square' },
            { title: 'Slideover', href: '/docs/components/slideover', legacyHref: '/slideover', icon: 'lucide:panel-right' },
            { title: 'Tooltip', href: '/docs/components/tooltip', legacyHref: '/tooltip', icon: 'lucide:message-square' }
        ]
    },
    {
        title: 'Date & Time',
        items: [
            { title: 'Calendar', href: '/docs/components/calendar', legacyHref: '/calendar', icon: 'lucide:calendar' },
            { title: 'RangeCalendar', href: '/docs/components/range-calendar', legacyHref: '/range-calendar', icon: 'lucide:calendar-range' }
        ]
    }
] as const

export const docsHookItems: DocsItem[] = [
    { title: 'useMediaQuery', href: '/docs/hooks/use-media-query', legacyHref: '/use-media-query', icon: 'lucide:monitor-smartphone' },
    { title: 'useClipboard', href: '/docs/hooks/use-clipboard', legacyHref: '/use-clipboard', icon: 'lucide:clipboard' },
    { title: 'useFormField', href: '/docs/hooks/use-form-field', legacyHref: '/use-form-field', icon: 'lucide:text-cursor-input' },
    { title: 'useClickOutside', href: '/docs/hooks/use-click-outside', legacyHref: '/use-click-outside', icon: 'lucide:pointer' },
    { title: 'useInfiniteScroll', href: '/docs/hooks/use-infinite-scroll', legacyHref: '/use-infinite-scroll', icon: 'lucide:arrow-down-to-line' },
    { title: 'useEscapeKeydown', href: '/docs/hooks/use-escape-keydown', legacyHref: '/use-escape-keydown', icon: 'lucide:keyboard' },
    { title: 'useDebounce', href: '/docs/hooks/use-debounce', legacyHref: '/use-debounce', icon: 'lucide:timer' }
] as const

export const docsTopNav: DocsItem[] = [
    { title: 'Docs', href: '/docs', icon: 'lucide:book-open' },
    { title: 'Components', href: '/docs/components/button', icon: 'lucide:blocks' },
    { title: 'Hooks', href: '/docs/hooks/use-debounce', icon: 'lucide:hook' }
] as const

export const allComponentItems = docsComponentGroups.flatMap((group) => group.items)
export const allDocsItems = [...docsIntroItems, ...docsThemeItems, ...allComponentItems, ...docsHookItems]
export const totalComponents = allComponentItems.length
export const totalHooks = docsHookItems.length

export const docsPathAliases = new Map<string, string>(
    allDocsItems.flatMap((item) =>
        item.legacyHref ? [[item.legacyHref, item.href] as const] : []
    )
)
