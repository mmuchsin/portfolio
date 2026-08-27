<script lang="ts">
	import { base } from '$app/paths';
	import LanguageToggle from './LanguageToggle.svelte';
	import type { Dictionary, Locale } from '$lib/i18n';

	let { nav, lang, setLang }: {
		nav: Dictionary['nav'];
		lang: Locale;
		setLang: (locale: Locale) => void;
	} = $props();
</script>

<header class="site-header">
	<div class="wrap">
		<a class="brand" href={`${base}/`}>Ucin</a>
		<nav class="site-nav" aria-label="Sections">
			<a href="#about">{nav.about}</a>
			<a href="#projects">{nav.projects}</a>
			<a href="#contact">{nav.contact}</a>
		</nav>
		<LanguageToggle {lang} {setLang} />
	</div>
</header>
