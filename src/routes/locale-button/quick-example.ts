export const quickExample = `<script lang="ts">
 import { LocaleButton } from 'svelora'
 import { setLocale } from '$lib/paraglide/runtime'
 
 const locales = [
   { code: 'en', label: 'English', shortLabel: 'EN' },
   { code: 'th', label: 'Thai', shortLabel: 'TH' }
 ]
</script>

<LocaleButton
 locale="en"
 {locales}
 onLocaleChange={(nextLocale) => setLocale(nextLocale)}
/>`
