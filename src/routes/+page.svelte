<script lang="ts">
	import ProviderRow from '$lib/provider-row.svelte';

	export let data;

	const hostingProviders = data.hostingProviders;
	const marketingProviders = data.marketingProviders;
	const transactionalProviders = data.transactionalProviders;
</script>

<main class="container">
	<p class="mt-12 text-lg">
		Welcome to DMARC.wiki, a directory of email service providers and their DMARC compliance level
		when used with custom domains.
	</p>

	<p class="mt-4 text-lg">
		For each provider you'll find their support for SPF alignment, DKIM and DKIM alignment,
		with instructions and tips on how to configure them.
	</p>

	<h2 class="mt-12 text-4xl">
		Email hosting
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each hostingProviders as provider}
			<ProviderRow {provider} />
		{/each}
	</div>

	<h2 class="mt-12 text-4xl">
		Transactional
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each transactionalProviders as provider}
			<ProviderRow {provider} />
		{/each}
	</div>

	<h2 class="mt-12 text-4xl">
		Marketing & newsletters
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each marketingProviders as provider}
			<ProviderRow {provider} />
		{/each}
	</div>
</main>
