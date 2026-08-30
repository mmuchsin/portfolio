<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();
</script>

<Projects copy={data.t.projects} />
