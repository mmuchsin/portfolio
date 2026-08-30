<script lang="ts">
	import { base } from '$app/paths';
	import Hero from '$lib/components/Hero.svelte';
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData } = $props();
</script>

<Hero copy={data.t.hero} />
