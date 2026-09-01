<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PathnameWithSearchOrHash } from '$app/types';
	import { page } from '$app/state';
	import { observeActiveSection } from '$lib/active-section';
	import type { Dictionary, Locale } from '$lib/i18n';

	let { locale, nav, setLang }: {
		locale: Locale;
		nav: Dictionary['nav'];
		setLang: (locale: Locale) => void;
	} = $props();

	let menuOpen = $state(false);
	let activeSection = $state<string | null>(null);

	const onHomeRoute = $derived(page.route.id === '/[locale]');
	const onBlogRoute = $derived(page.route.id?.startsWith('/[locale]/blog') ?? false);

	// On standalone section routes (/en/about etc.) the section fills the
	// page, so its nav key is current regardless of scroll tracking.
	const sectionRoute = $derived.by(() => {
		const match = /^\/\[locale\]\/(about|projects|contact)$/.exec(page.route.id ?? '');
		return match?.[1] ?? null;
	});

	$effect(() => {
		// Reading page.url.pathname tracks the route: this effect re-runs on
		// every navigation. The Header sits in the (persistent) locale layout
		// and never remounts, so the section observer must re-attach to
		// whatever sections the freshly rendered page provides.
		void page.url.pathname;
		const cleanup = observeActiveSection((id) => (activeSection = id));
		return () => cleanup?.();
	});

	function closeMenu() {
		menuOpen = false;
	}

	// Home and blog get their own routes; sections live on the one-page
	// home and link to their anchors (typed pathname strings, hence cast).
	function navPath(key: string): PathnameWithSearchOrHash {
		if (key === 'blog') return `/${locale}/blog/` as PathnameWithSearchOrHash;
		if (key === 'home') return `/${locale}/` as PathnameWithSearchOrHash;
		return `/${locale}/#${key}` as PathnameWithSearchOrHash;
	}

	function isSectionActive(key: string): boolean {
		if (key === 'home') return onHomeRoute && !activeSection;
		if (key === 'blog') return onBlogRoute;
		if (sectionRoute === key) return true;
		return activeSection === key;
	}
</script>

<header class="site-header">
	<div class="wrap">
		<a class="brand" href={resolve(`/${locale}/`)}>Muchsin</a>
		<nav class="site-nav" aria-label="Sections">
			{#each Object.entries(nav) as [key, label] (key)}
				<a
					href={resolve(navPath(key))}
					class:active={isSectionActive(key)}
					aria-current={isSectionActive(key) ? 'page' : undefined}
					onclick={closeMenu}>
					{label}
				</a>
			{/each}
		</nav>
		<div class="lang-toggle" role="group" aria-label="Language">
			{#each ['en', 'id'] as l (l)}
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
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}>
			<span class="bar bar-top"></span>
			<span class="bar bar-mid"></span>
			<span class="bar bar-bot"></span>
		</button>
	</div>

	{#if menuOpen}
		<nav class="mobile-nav" aria-label="Sections mobile">
			{#each Object.entries(nav) as [key, label] (key)}
				<a
					href={resolve(navPath(key))}
					class:active={isSectionActive(key)}
					aria-current={isSectionActive(key) ? 'page' : undefined}
					onclick={closeMenu}>
					{label}
				</a>
			{/each}
		</nav>
	{/if}
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
		transition:
			transform var(--motion-normal) var(--ease-reveal),
			opacity var(--motion-normal) var(--ease-reveal);
	}

	.hamburger[aria-expanded='true'] .bar-top {
		transform: translateY(6px) rotate(45deg);
	}

	.hamburger[aria-expanded='true'] .bar-mid {
		opacity: 0;
	}

	.hamburger[aria-expanded='true'] .bar-bot {
		transform: translateY(-6px) rotate(-45deg);
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
		padding: 1rem var(--gutter);
		color: var(--muted);
		text-decoration: none;
		font-size: 1.05rem;
		border-top: 1px solid var(--border);
		transition: color var(--motion-normal), background-color var(--motion-normal);
	}

	.mobile-nav a.active {
		color: var(--text);
	}

	@media (max-width: 36em) {
		.hamburger {
			display: flex;
		}

		.site-nav {
			display: none !important;
		}

		.mobile-nav {
			display: flex;
		}
	}
</style>
