<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['contact'] } = $props();
</script>

<section id="contact" class="section">
	<div class="wrap">
		<h2>{copy.title}</h2>
		<p class="prose">{copy.intro}</p>
		<div class="contact-links">
			<a class="btn btn-ghost" href={copy.github_url} target="_blank" rel="noopener noreferrer">
				{copy.github} ↗
			</a>
			<a class="btn btn-ghost" href={copy.linkedin_url} target="_blank" rel="noopener noreferrer">
				{copy.linkedin} ↗
			</a>
		</div>
	</div>
</section>
