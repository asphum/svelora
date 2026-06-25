export const quickExample = `<script lang="ts">
 import { Menu } from 'svelora';
 
 const items = [
   { type: 'item', label: 'Dashboard', icon: 'lucide:home', href: '#' },
   { type: 'group', label: 'Settings', items: [
     { type: 'item', label: 'Profile' }
   ]}
 ];
</script>

<Menu {items} />`
