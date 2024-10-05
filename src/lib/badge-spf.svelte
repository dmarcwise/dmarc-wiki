<script lang="ts">
	import Badge from '$lib/badge.svelte';

	export let provider;
</script>

<Badge value={provider.spfAlignment} text="SPF alignment" />
