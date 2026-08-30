<script lang="ts">
	import { base } from '$app/paths';
	import type { Dictionary, Locale } from '$lib/i18n';

	let { locale, nav, setLang }: {
		locale: Locale;
		nav: Dictionary['nav'];
		setLang: (locale: Locale) => void;
	} = $props();

	function isSectionActive(sectionId: string): boolean {
		return false; // No active tracking on locale layout
	}
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
		<div class="lang-toggle" role="group" aria-label="Language">
			{#each ['en', 'id'] as l}
				<button
					type="button"
					class:active={l === locale}
					aria-pressed={l === locale}
					onclick={() => setLang(l as 'en' | 'id')}>
					{l.toUpperCase()}
				</button>
			{/each}
		</div>
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


	.lang-toggle {
		display: flex;
		gap: 0.25rem;
	}

	.lang-toggle button {
		padding: 0.25rem 0.625rem;
		border: 1px solid var(--border);
		background: transparent;
		border-radius: 0.375rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text);
		cursor: pointer;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.lang-toggle button:hover {
		border-color: var(--accent);
		background: var(--surface);
	}

	.lang-toggle button.active {
		background: var(--accent);
		color: white;
		border-color: var(--accent);
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
