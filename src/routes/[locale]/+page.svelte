<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { observeReveals } from '$lib/scroll-reveal';
	import type { LayoutData } from './$types';

	let { data }: { data: LayoutData } = $props();

	// Scroll reveals — one observer, class toggle, CSS does the motion.
	$effect(() => {
		observeReveals();
	});
</script>

<Hero copy={data.t.hero} />
<About copy={data.t.about} />
<Projects copy={data.t.projects} />
<Contact copy={data.t.contact} />
