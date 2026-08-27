<script lang="ts">
	import { LOCALES, type Locale } from '$lib/i18n';

	let { lang, setLang }: {
		lang: Locale;
		setLang: (locale: Locale) => void;
	} = $props();
</script>

<div class="lang-toggle" role="group" aria-label="Language">
	{#each LOCALES as locale (locale)}
		<button
			type="button"
			class:active={locale === lang}
			aria-pressed={locale === lang}
			onclick={() => setLang(locale)}>
			{locale.toUpperCase()}
		</button>
	{/each}
</div>
