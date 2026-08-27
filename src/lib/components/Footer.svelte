<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['footer'] } = $props();
</script>

<footer class="site-footer">
	<div class="wrap">{copy.text}</div>
</footer>
