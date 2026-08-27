<script lang="ts">
	import type { Dictionary } from '$lib/i18n';

	let { copy }: { copy: Dictionary['footer'] } = $props();
</script>

<footer class="site-footer">
	<div class="wrap">
		<p>{copy.text}</p>
		<p class="colophon">{copy.colophon}</p>
	</div>
</footer>
