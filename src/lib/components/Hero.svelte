<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['hero'] } = $props();

	let flipped = $state(false);

	// Auto-cycle the script-flip every 4 seconds (no click needed)
	$effect(() => {
		flipped = true;
		const timer = setTimeout(() => {
			flipped = false;
		}, 4000);
		return () => clearTimeout(timer);
	});
</script>

<section class="hero wrap" aria-labelledby="hero-title">
	<div class="hero-text">
		<h1 id="hero-title" data-rise style="--i: 0">{copy.name}</h1>
		<span class="name-rule" aria-hidden="true"></span>

		<!-- Signature moment: the page demonstrating its own subject — script conversion -->
		<div class="flip-block" data-rise style="--i: 2">
			<button type="button" class="flip" aria-pressed={flipped} onclick={() => (flipped = !flipped)}>
				<span class="flip-latin">assalamu&#8217;alaikum</span>
				<span class="flip-arabic" dir="rtl" lang="ar">السلام عليكم</span>
			</button>
			<span class="flip-hint">{copy.flip_hint}</span>
		</div>

		<p class="tagline" data-rise style="--i: 3">{copy.tagline}</p>
		<p class="sub" data-rise style="--i: 4">{copy.sub}</p>

		<div class="cta-row" data-rise style="--i: 5">
			<a class="btn btn-primary" href="#projects">{copy.cta_projects}</a>
			<a class="btn btn-ghost" href="#contact">{copy.cta_contact}</a>
		</div>
	</div>

	<!-- Geometric illustration block — Islamic-inspired abstract pattern -->
	<div class="hero-illustration reveal" aria-hidden="true">
		<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" fill="none">
			<!-- Outer frame -->
			<rect x="40" y="40" width="240" height="240" rx="16" stroke="var(--accent)" stroke-width="1.5" opacity="0.3"/>

			<!-- Inner star pattern — 8-pointed Islamic geometric motif -->
			<g stroke="var(--accent)" stroke-width="1.5" fill="none" opacity="0.6">
				<!-- Primary octagram -->
				<polygon points="160,70 200,120 250,120 230,160 280,200 240,240 160,250 80,240 40,200 90,160 70,120 120,120"/>

				<!-- Inner diamond -->
				<polygon points="160,100 200,160 160,220 120,160"/>

				<!-- Cross axes -->
				<line x1="160" y1="70" x2="160" y2="250"/>
				<line x1="40" y1="160" x2="280" y2="160"/>

				<!-- Diagonal axes -->
				<line x1="73" y1="73" x2="247" y2="247"/>
				<line x1="247" y1="73" x2="73" y2="247"/>

				<!-- Corner accents -->
				<circle cx="80" cy="80" r="6" stroke-width="1"/>
				<circle cx="240" cy="80" r="6" stroke-width="1"/>
				<circle cx="80" cy="240" r="6" stroke-width="1"/>
				<circle cx="240" cy="240" r="6" stroke-width="1"/>

				<!-- Center dot -->
				<circle cx="160" cy="160" r="3" fill="var(--accent)" opacity="0.8"/>
			</g>

			<!-- Subtle tile grid overlay -->
			<g stroke="var(--accent)" stroke-width="0.5" opacity="0.2">
				<line x1="40" y1="106" x2="280" y2="106"/>
				<line x1="40" y1="173" x2="280" y2="173"/>
				<line x1="40" y1="240" x2="280" y2="240"/>
				<line x1="106" y1="40" x2="106" y2="280"/>
				<line x1="173" y1="40" x2="173" y2="280"/>
				<line x1="240" y1="40" x2="240" y2="280"/>
			</g>
		</svg>
	</div>
</section>
