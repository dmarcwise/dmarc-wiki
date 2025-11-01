<script lang="ts">
	import Badge from '$lib/badge.svelte';
	import type { Provider } from '$lib/providers';

	interface Props {
		provider: Provider;
	}

	let { provider }: Props = $props();

	const text = provider.dkim ? 'DKIM alignment' : 'No DKIM support';
</script>

<Badge value={provider.dkim && provider.dkimAlignment} text={text} />
