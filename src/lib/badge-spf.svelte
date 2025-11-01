<script lang="ts">
	import Badge from '$lib/badge.svelte';
	import type { Provider } from '$lib/providers';

	interface Props {
		provider: Provider;
	}

	let { provider }: Props = $props();
</script>

<Badge value={provider.spfAlignment} text="SPF alignment" />
