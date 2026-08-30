<script lang="ts">
	import { onMount } from 'svelte';
	import { resolveLocale } from '$lib/locale';

	onMount(() => {
		const locale = resolveLocale(navigator.language);
		window.location.replace(`/${locale}/`);
	});
</script>

<!-- Server-side redirect handles most cases; this is a fallback -->
<p>Redirecting...</p>
