<script lang="ts">
	import Badge from '$lib/badge.svelte';

	export let provider;

	const text = provider.dkim ? 'DKIM alignment' : 'No DKIM support';
</script>

<Badge value={provider.dkim && provider.dkimAlignment} text={text} />
