export const quickExample = `<script lang="ts">
 import { useTour, Tour, type TourStep } from 'svelora';
 import { goto } from '$app/navigation';

 const steps: TourStep[] = [
   { id: 'home', route: '/', target: '#hero', title: 'Welcome' },
   { id: 'settings', route: '/settings', target: '#prefs', title: 'Settings' }
 ];

 const tour = useTour({
   steps,
   persist: true,
   onStepChange: (index) => {
     const route = steps[index]?.route;
     if (route) goto(route);
   }
 });
</script>

<Button onclick={() => tour.start()}>Start tour</Button>
<Tour {steps} controller={tour} />`
