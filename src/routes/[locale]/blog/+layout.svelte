<script lang="ts">
	import type { Snippet } from 'svelte';
	import { base } from '$app/paths';
	import type { Locale, Dictionary } from '$lib/i18n';

	let { locale = 'en' as Locale, nav = {} as Dictionary['nav'], children }: {
		locale?: Locale;
		nav?: Dictionary['nav'];
		children?: Snippet;
	} = $props();
</script>

<header class="site-header">
	<div class="wrap">
		<a class="brand" href={`${base}/${locale}/`}>Muchsin</a>
		<nav class="site-nav" aria-label="Sections">
			{#each Object.entries(nav) as [key, label]}
				<a href={`${base}/${locale}/${key === 'home' ? '' : key}`}>
					{label}
				</a>
			{/each}
		</nav>
		<button
			type="button"
			class="hamburger"
			aria-label="Open menu"
			onclick={() => document.querySelector('.mobile-nav')?.classList.toggle('open')}>
			<span class="bar bar-top"></span>
			<span class="bar bar-mid"></span>
			<span class="bar bar-bot"></span>
		</button>
	</div>

	<nav class="mobile-nav" aria-label="Sections mobile">
		{#each Object.entries(nav) as [key, label]}
			<a href={`${base}/${locale}/${key === 'home' ? '' : key}`}>
				{label}
			</a>
		{/each}
	</nav>
</header>

{@render children?.()}

<style>
	.hamburger {
		display: none;
		flex-direction: column;
		gap: 4px;
		background: transparent;
		border: 0;
		padding: 0.5rem;
		cursor: pointer;
		margin-left: auto;
	}

	.hamburger .bar {
		display: block;
		width: 1.25rem;
		height: 2px;
		background-color: var(--text);
		border-radius: 1px;
		transition: transform 0.3s ease, opacity 0.3s ease;
	}

	.mobile-nav {
		position: fixed;
		top: 4rem;
		left: 0;
		right: 0;
		z-index: 20;
		display: none;
		flex-direction: column;
		gap: 0;
		background-color: color-mix(in srgb, var(--bg) 92%, transparent);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}

	.mobile-nav a {
		display: block;
		padding: 1rem 1.5rem;
		color: var(--muted);
		text-decoration: none;
		font-size: 1.05rem;
		border-top: 1px solid var(--border);
	}

	@media (max-width: 36em) {
		.hamburger {
			display: flex;
		}

		.site-nav {
			display: none !important;
		}
	}
</style>
