<script lang="ts">
	import { base } from '$app/paths';
	import LanguageToggle from './LanguageToggle.svelte';
	import type { Dictionary, Locale } from '$lib/i18n';

	let { nav, lang, setLang, activeSection }: {
		nav: Dictionary['nav'];
		lang: Locale;
		setLang: (locale: Locale) => void;
		activeSection: string;
	} = $props();
</script>

<header class="site-header">
	<div class="wrap">
		<a class="brand" href={`${base}/`}>Muchsin</a>
		<nav class="site-nav" aria-label="Sections">
			{#each Object.entries(nav) as [key, label]}
				{@const sectionId = key === 'about' ? 'about' : key === 'projects' ? 'projects' : 'contact'}
				<a
					href={`#${sectionId}`}
					class:active={activeSection === sectionId}
					aria-current={activeSection === sectionId ? 'page' : undefined}>
					{label}
				</a>
			{/each}
		</nav>
		<LanguageToggle {lang} {setLang} />
	</div>
</header>
