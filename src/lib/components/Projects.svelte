<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['projects'] } = $props();
</script>

<section id="projects" class="section">
	<div class="wrap">
		<h2>{copy.title}</h2>
		<p class="intro">{copy.intro}</p>
		<div class="projects-grid">
			{#each copy.items as project (project.name)}
				<article class="project-card">
					<h3>{project.name}</h3>
					<p>{project.description}</p>
					<ul class="tags">
						{#each project.tags as tag (tag)}
							<li>{tag}</li>
						{/each}
					</ul>
					<div class="project-links">
						{#if project.live}
							<a href={project.live} target="_blank" rel="noopener noreferrer">
								{copy.live} ↗
							</a>
						{/if}
						{#if project.repo}
							<a class="secondary" href={project.repo} target="_blank" rel="noopener noreferrer">
								{copy.repo_label} ↗
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
