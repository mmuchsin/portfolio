<script lang="ts">
	import { base } from '$app/paths';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { translations, type Locale } from '$lib/i18n';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: { locale: Locale; t: typeof translations.en }; children?: Snippet } = $props();

	// app.html ships lang="en"; keep the document language in sync with
	// the active locale for accessibility and correct text rendering.
	$effect(() => {
		document.documentElement.lang = data.locale;
	});

	function setLang(next: Locale) {
		// Swap the locale segment in-place. window.location.pathname already
		// includes the base path (e.g. '/portfolio/en/about') when a base is
		// configured, so we must NOT prepend `base` again -- just replace the
		// locale token and navigate to the result pathname as-is.
		const parts = window.location.pathname.split('/');
		for (let i = 1; i < parts.length; i++) {
			if (parts[i] === 'en' || parts[i] === 'id') {
				parts[i] = next;
				break;
			}
		}
		window.location.pathname = parts.join('/');
	}
</script>

<svelte:head>
	<title>{data.t.meta.title}</title>
	<meta name="description" content={data.t.meta.description} />
	<link rel="alternate" hreflang="en" href={`${base}/en/`} />
	<link rel="alternate" hreflang="id" href={`${base}/id/`} />
</svelte:head>

<Header locale={data.locale} nav={data.t.nav} setLang={setLang} />

<main id="main-content">
	{@render children?.()}
</main>

<Footer copy={data.t.footer} />

<style>
	main#main-content {
		min-height: 60vh;
	}
</style>
