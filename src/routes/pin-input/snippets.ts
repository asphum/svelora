import type { DocSectionSnippetOverrides } from '$lib/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    Basic: `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
</script>

<PinInput bind:value />
<p>Value: "{value}"</p>`,
    Length: `<script lang="ts">
 import { PinInput } from 'svelora';

 let otp = $state('');
</script>

<PinInput length={4} />
<PinInput />
<PinInput bind:value={otp} length={6} otp />`,
    Type: `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
</script>

<PinInput bind:value type="number" length={6} />
<p>Value: "{value}"</p>`,
    Mask: `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
</script>

<PinInput bind:value mask />
<p>Value: "{value}"</p>`,
    'Form Integration': `<script lang="ts">
 import { PinInput } from 'svelora';

 let value = $state('');
</script>

<form
 onsubmit={(event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  alert('otp = ' + formData.get('otp'));
 }}
>
 <PinInput bind:value name="otp" inputId="otp-input" length={6} type="number" otp />
 <button type="submit">Verify</button>
</form>`,
    'FormField Integration': `<script lang="ts">
 import { PinInput, FormField } from 'svelora';

 let code = $state('');
 let pin = $state('');
</script>

<FormField label="Verification Code" description="Enter the 6-digit code sent to you.">
 <PinInput bind:value={code} length={6} type="number" otp class="mt-1" />
</FormField>

<FormField label="PIN" error={pin.length > 0 && pin.length < 4 ? 'PIN must be 4 digits.' : undefined}>
 <PinInput bind:value={pin} length={4} class="mt-1" />
</FormField>`,
    Loading: `<script lang="ts">
 import { PinInput } from 'svelora';
</script>

<PinInput loading length={6} />
<PinInput loading mask color="primary" length={4} />`
}
