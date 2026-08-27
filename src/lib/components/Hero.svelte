<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['hero'] } = $props();
</script>

<section class="hero wrap" aria-labelledby="hero-title">
	<h1 id="hero-title">{copy.name} <span class="alias">{copy.alias}</span></h1>
	<p class="tagline">{copy.tagline}</p>
	<p class="sub">{copy.sub}</p>
	<div class="cta-row">
		<a class="btn btn-primary" href="#projects">{copy.cta_projects}</a>
		<a class="btn btn-ghost" href="#contact">{copy.cta_contact}</a>
	</div>
</section>
