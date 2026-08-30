<script lang="ts">
	import About from '$lib/components/About.svelte';
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();
</script>

<About copy={data.t.about} />
