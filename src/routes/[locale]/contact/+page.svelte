<script lang="ts">
	import Contact from '$lib/components/Contact.svelte';
	import type { LayoutData } from '../$types';

	let { data }: { data: LayoutData } = $props();
</script>

<Contact copy={data.t.contact} />
