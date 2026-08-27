<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['hero'] } = $props();

	let flipped = $state(false);
</script>

<section class="hero wrap" aria-labelledby="hero-title">
	<h1 id="hero-title" data-rise style="--i: 0">{copy.name} <span class="alias">{copy.alias}</span></h1>
	<span class="name-rule" aria-hidden="true"></span>
	<p class="tagline" data-rise style="--i: 1">{copy.tagline}</p>
	<p class="sub" data-rise style="--i: 2">{copy.sub}</p>

	<!-- Signature moment: the page demonstrating its own subject — script conversion -->
	<div class="flip-block" data-rise style="--i: 3">
		<button type="button" class="flip" aria-pressed={flipped} onclick={() => (flipped = !flipped)}>
			<span class="flip-latin">assalamu&#8217;alaikum</span>
			<span class="flip-arabic" dir="rtl" lang="ar">السلام عليكم</span>
		</button>
		<span class="flip-hint">{copy.flip_hint}</span>
	</div>

	<div class="cta-row" data-rise style="--i: 4">
		<a class="btn btn-primary" href="#projects">{copy.cta_projects}</a>
		<a class="btn btn-ghost" href="#contact">{copy.cta_contact}</a>
	</div>
</section>
