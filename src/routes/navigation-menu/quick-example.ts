export const quickExample = `<script lang="ts">
    import { NavigationMenu } from 'svelora'

    const items = [
        [
            { label: 'Dashboard', href: '/' },
            { label: 'Products', href: '/products' }
        ],
        [
            { label: 'Settings', href: '/settings' }
        ]
    ]
</script>

<NavigationMenu {items} />`
