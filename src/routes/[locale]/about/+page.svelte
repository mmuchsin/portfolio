<script lang="ts">
	import About from '$lib/components/About.svelte';
	import { observeReveals } from '$lib/scroll-reveal';
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();

	// Standalone deep-link route — reveals need their observer too
	// (pages remount on navigation, so this runs per page).
	$effect(() => {
		observeReveals();
	});
</script>

<About copy={data.t.about} />
