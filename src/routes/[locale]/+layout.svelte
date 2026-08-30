<script lang="ts">
	import { base } from '$app/paths';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { translations, type Locale } from '$lib/i18n';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: { locale: Locale; t: typeof translations.en }; children?: Snippet } = $props();

	function setLang(next: Locale) {
		// Navigate to the same path but in a different locale
		const currentPath = window.location.pathname.replace(/^\/(?:en|id)/, '');
		window.location.href = `${base}/${next}${currentPath}`;
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
