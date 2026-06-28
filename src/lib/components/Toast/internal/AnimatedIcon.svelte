<script lang="ts">
import type { AnimatedIconType } from './animated-icon.types.js'
import type { ToastIconTone } from './french-toast/toast-context.js'
import { elasticOut } from 'svelte/easing'
import { scale } from 'svelte/transition'

interface Props {
    type?: AnimatedIconType
    size?: number | string
    class?: string
    forceMotion?: boolean
    /** When false, only play the entrance animation (no idle pulse). */
    idle?: boolean
    /** `on-color` uses currentColor for contrast on solid semantic backgrounds. */
    tone?: ToastIconTone
}

const LABELS: Record<AnimatedIconType, string> = {
	success: "Success icon",
	error: "Error icon",
	warning: "Warning icon",
	info: "Info icon",
	question: "Question icon",
	loading: "Loading icon",
	processing: "Processing icon",
};

const STANDARD_RING_CLASS: Partial<Record<AnimatedIconType, string>> = {
	success: "border-success/40",
	error: "border-error/40",
	warning: "border-warning/40",
	info: "border-info/40",
	question: "border-info/40",
};

const STANDARD_RING_DURATION: Partial<Record<AnimatedIconType, number>> = {
	success: 500,
	error: 500,
	warning: 600,
	info: 500,
	question: 500,
};

let {
    type = 'success',
    size = 80,
    class: className = '',
    forceMotion = false,
    idle = true,
    tone = 'standard'
}: Props = $props()
const reducedMotionQuery =
	typeof window === "undefined" ? null : window.matchMedia("(prefers-reduced-motion: reduce)");
let prefersReducedMotion = $state(reducedMotionQuery?.matches ?? false);

const motionDisabled = $derived(!forceMotion && prefersReducedMotion);
const label = $derived(LABELS[type]);
const sizeValue = $derived(typeof size === "number" ? `${size}px` : size);
const showStandardRing = $derived(
	type === "success" ||
		type === "error" ||
		type === "warning" ||
		type === "info" ||
		type === "question",
);
const SEMANTIC_TEXT: Record<AnimatedIconType, string> = {
    success: 'text-success',
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
    question: 'text-info',
    loading: 'text-primary',
    processing: 'text-secondary'
}

const onColor = $derived(tone === 'on-color')
const semanticText = $derived(onColor ? 'text-current' : SEMANTIC_TEXT[type])
const standardRingClass = $derived(
    onColor ? 'border-current/30' : (STANDARD_RING_CLASS[type] ?? '')
)
const successPopClass = $derived(onColor ? 'bg-current/15' : 'bg-success/10')
const successRingClass = $derived(onColor ? 'border-current/35' : 'border-success/40')
const loadingTrackClass = $derived(onColor ? 'border-current/25' : 'border-primary/20')
const loadingSpinnerClass = $derived(onColor ? 'border-current border-t-transparent' : 'border-primary border-t-transparent')
const loadingDotClass = $derived(onColor ? 'text-current/50' : 'text-primary/40')
const processingTrackClass = $derived(onColor ? 'border-current/25' : 'border-secondary/20')
const processingIconClass = $derived(onColor ? 'text-current' : 'text-secondary')
const standardRingDuration = $derived(STANDARD_RING_DURATION[type] ?? 500);
const standardRingTransition = $derived({
	duration: motionDisabled ? 0 : standardRingDuration,
	easing: elasticOut,
});

$effect(() => {
	if (!reducedMotionQuery) {
		return;
	}

	const handleChange = (event: MediaQueryListEvent) => {
		prefersReducedMotion = event.matches;
	};

	prefersReducedMotion = reducedMotionQuery.matches;
	reducedMotionQuery.addEventListener("change", handleChange);

	return () => {
		reducedMotionQuery.removeEventListener("change", handleChange);
	};
});
</script>
<!-- Main Container -->
<div
	class={`animated-icon-root relative flex items-center justify-center p-1 ${className} ${forceMotion ? 'force-motion' : ''} ${motionDisabled ? '' : idle ? 'animate-swal-motion' : 'animate-swal-enter'}`}
	style={`width: ${sizeValue}; height: ${sizeValue};`}
	role="img"
	aria-label={label}
>
	{#if showStandardRing}
		<div
			class={`absolute inset-0 rounded-full border-4 animate-pulse-soft ${standardRingClass}`}
			aria-hidden="true"
			in:scale={standardRingTransition}
		></div>
	{/if}

	{#if type === "success"}
		<div class={`success-pop absolute inset-0 rounded-full ${successPopClass}`} aria-hidden="true"></div>
		<div
			class={`ring-burst absolute inset-0 rounded-full border-2 ${successRingClass}`}
			aria-hidden="true"
		></div>
		<svg
			viewBox="0 0 52 52"
			class={`relative z-10 size-full ${semanticText}`}
			fill="none"
			stroke="currentColor"
			stroke-width="4"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M14 27l7 7 16-16" class="path-draw" />
		</svg>
	{:else if type === "error"}
		<div class={`animate-error-impact relative z-10 size-full ${semanticText}`}>
			<svg
				viewBox="0 0 52 52"
				class="size-full"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M16 16l20 20" class="path-draw" />
				<path d="M36 16l-20 20" class="path-draw" style="animation-delay: 0.15s" />
			</svg>
		</div>
	{:else if type === "warning"}
		<div class={`animate-bounce-short relative z-10 size-full ${semanticText}`}>
			<svg
				viewBox="0 0 52 52"
				class="size-full"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M26 7L7 45h38L26 7z" class="path-draw-long" />
				<line x1="26" y1="20" x2="26" y2="30" class="path-draw" style="animation-delay: 0.4s" />
				<line x1="26" y1="36" x2="26.01" y2="36" class="path-draw" style="animation-delay: 0.6s" />
			</svg>
		</div>
	{:else if type === "info"}
		<div class={`animate-info-pop relative z-10 size-full ${semanticText}`}>
			<svg
				viewBox="0 0 52 52"
				class="size-full"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<circle cx="26" cy="26" r="20" class="path-draw-long" />
				<line x1="26" y1="34" x2="26" y2="24" class="path-draw" style="animation-delay: 0.3s" />
				<line x1="26" y1="18" x2="26.01" y2="18" class="path-draw" style="animation-delay: 0.5s" />
			</svg>
		</div>
	{:else if type === "question"}
		<div class={`animate-info-pop relative z-10 size-full ${semanticText}`}>
			<svg
				viewBox="0 0 52 52"
				class="size-full"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<circle cx="26" cy="26" r="20" class="path-draw-long" />
				<path
					d="M22 21a6 6 0 0 1 12 2c0 4-6 5-6 8"
					class="path-draw"
					style="animation-delay: 0.3s"
				/>
				<line x1="26" y1="36" x2="26.01" y2="36" class="path-draw" style="animation-delay: 0.6s" />
			</svg>
		</div>
	{:else if type === "loading"}
		<div class={`absolute inset-0 rounded-full border-4 ${loadingTrackClass}`} aria-hidden="true"></div>
		<div
			class={`absolute inset-0 rounded-full border-4 animate-spin ${loadingSpinnerClass}`}
			aria-hidden="true"
		></div>
		<div class={`${loadingDotClass} animate-pulse`}>
			<svg
				viewBox="0 0 52 52"
				class="h-1/2 w-1/2"
				fill="currentColor"
				aria-hidden="true"
				focusable="false"
			>
				<circle cx="26" cy="26" r="6" />
			</svg>
		</div>
	{:else if type === "processing"}
		<div
			class={`absolute inset-0 rounded-full border-4 animate-pulse-soft ${processingTrackClass}`}
			aria-hidden="true"
		></div>
		<div class={`animate-spin-slow relative z-10 size-full ${processingIconClass}`}>
			<svg
				viewBox="0 0 52 52"
				class="size-full p-2"
				fill="none"
				stroke="currentColor"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				focusable="false"
			>
				<path
					d="M26 6v8m0 24v8M12.3 12.3l5.66 5.66m16.08 16.08l5.66 5.66M6 26h8m24 0h8M12.3 39.7l5.66-5.66m16.08-16.08l5.66-5.66"
				/>
			</svg>
		</div>
	{/if}
</div>

<style>
/* Animation: Stroke Drawing */
.path-draw {
	stroke-dasharray: 200;
	stroke-dashoffset: 200;
	animation: draw 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.path-draw-long {
	stroke-dasharray: 260;
	stroke-dashoffset: 260;
	animation: draw 0.8s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

@keyframes draw {
	to {
		stroke-dashoffset: 0;
	}
}

/* Success Pop Effect */
.success-pop {
	transform: scale(0);
	opacity: 0;
	animation: success-pop 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes success-pop {
	0% {
		transform: scale(0);
		opacity: 0;
	}
	50% {
		transform: scale(1.1);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}

/* Ring Burst Effect */
.ring-burst {
	transform: scale(0.5);
	opacity: 0;
	animation: ring-burst 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes ring-burst {
	0% {
		transform: scale(0.5);
		opacity: 0;
	}
	30% {
		opacity: 0.8;
	}
	100% {
		transform: scale(1.8);
		opacity: 0;
	}
}

/* Enhanced Impact shake for error */
.animate-error-impact {
	animation: error-impact 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes error-impact {
	0% {
		transform: scale(1);
	}
	10% {
		transform: scale(0.9) translate3d(-2px, 0, 0);
	}
	20% {
		transform: scale(0.9) translate3d(4px, 0, 0);
	}
	30%,
	50%,
	70% {
		transform: scale(1) translate3d(-6px, 0, 0);
	}
	40%,
	60% {
		transform: scale(1) translate3d(6px, 0, 0);
	}
	100% {
		transform: scale(1) translate3d(0, 0, 0);
	}
}

/* Pulse effect for all background rings */
.animate-pulse-soft {
	animation: pulse-soft 2.5s ease-in-out infinite;
}

@keyframes pulse-soft {
	0%,
	100% {
		transform: scale(1);
		opacity: 0.4;
	}
	50% {
		transform: scale(1.04);
		opacity: 0.15;
	}
}

/* Bounce-short for Warning */
.animate-bounce-short {
	animation: bounce-short 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes bounce-short {
	0% {
		transform: scale(0.3);
		opacity: 0;
	}
	60% {
		transform: scale(1.1);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}

/* Info Pop Up */
.animate-info-pop {
	animation: info-pop 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67) both;
}

@keyframes info-pop {
	0% {
		transform: translateY(10px) scale(0.8);
		opacity: 0;
	}
	100% {
		transform: translateY(0) scale(1);
		opacity: 1;
	}
}

/* Spin Slow for Processing */
.animate-spin-slow {
	animation: spin 3s linear infinite;
}

.animate-swal-enter {
	animation: swal-show 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

.animate-swal-motion {
	animation:
		swal-show 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both,
		swal-idle 2.6s ease-in-out 0.6s infinite;
}

@keyframes swal-show {
	0% {
		transform: scale(0.7);
		opacity: 0;
	}
	45% {
		transform: scale(1.06);
		opacity: 1;
	}
	80% {
		transform: scale(0.98);
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}

@keyframes swal-idle {
	0%,
	100% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.03);
	}
}

@media (prefers-reduced-motion: reduce) {
	.animated-icon-root:not(.force-motion) .animate-swal-motion,
	.animated-icon-root:not(.force-motion) .animate-swal-enter,
	.animated-icon-root:not(.force-motion) .path-draw,
	.animated-icon-root:not(.force-motion) .path-draw-long,
	.animated-icon-root:not(.force-motion) .success-pop,
	.animated-icon-root:not(.force-motion) .ring-burst,
	.animated-icon-root:not(.force-motion) .animate-error-impact,
	.animated-icon-root:not(.force-motion) .animate-pulse-soft,
	.animated-icon-root:not(.force-motion) .animate-bounce-short,
	.animated-icon-root:not(.force-motion) .animate-info-pop,
	.animated-icon-root:not(.force-motion) .animate-spin-slow,
	.animated-icon-root:not(.force-motion) :global(.animate-spin),
	.animated-icon-root:not(.force-motion) :global(.animate-pulse) {
		animation: none;
	}

	.animated-icon-root:not(.force-motion) .path-draw,
	.animated-icon-root:not(.force-motion) .path-draw-long {
		stroke-dashoffset: 0;
	}

	.animated-icon-root:not(.force-motion) .success-pop,
	.animated-icon-root:not(.force-motion) .ring-burst {
		display: none;
	}

	.animated-icon-root:not(.force-motion) .animate-error-impact,
	.animated-icon-root:not(.force-motion) .animate-bounce-short,
	.animated-icon-root:not(.force-motion) .animate-info-pop,
	.animated-icon-root:not(.force-motion) .animate-spin-slow,
	.animated-icon-root:not(.force-motion) .animate-pulse-soft {
		transform: none;
		opacity: 1;
	}
}
</style>
