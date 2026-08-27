<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import { translations, type Locale } from '$lib/i18n';

	const STORAGE_KEY = 'portfolio-lang';

	// ADR 0003: locale lives in localStorage, never in the URL. The static
	// HTML is always EN; a stored choice is applied on hydration.
	let lang = $state<Locale>('en');
	const t = $derived(translations[lang]);

	function setLang(next: Locale) {
		lang = next;
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// Storage unavailable (blocked or disabled) — the toggle still
			// works for this visit, it just won't persist.
		}
	}

	$effect(() => {
		let stored: string | null = null;
		try {
			stored = localStorage.getItem(STORAGE_KEY);
		} catch {
			stored = null;
		}
		if (stored === 'en' || stored === 'id') lang = stored;
	});

	$effect(() => {
		document.documentElement.lang = lang;
		document.title = t.meta.title;
	});
</script>

<Header nav={t.nav} {lang} {setLang} />

<main>
	<Hero copy={t.hero} />
	<About copy={t.about} />
	<Projects copy={t.projects} />
	<Contact copy={t.contact} />
</main>

<Footer copy={t.footer} />
