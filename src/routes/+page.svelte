<script lang="ts">
	import logo from '$lib/logo.png';
	import ProviderRow from '$lib/provider-row.svelte';

	const hostingProviders = [
		{
			name: 'Google Workspace',
			slug: 'google-workspace',
			image: 'google.png',
			spf: true,
			spfAlignment: true,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'Fastmail',
			slug: 'fastmail',
			image: 'fastmail.jpg',
			spf: true,
			spfAlignment: true,
			dkim: true,
			dkimAlignment: true
		}
	];

	const marketingProviders = [
		{
			name: 'Mailchimp',
			slug: 'mailchimp',
			image: 'mailchimp.jpg',
			spf: true,
			spfAlignment: false,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'Brevo',
			slug: 'brevo',
			image: 'brevo.jpg',
			spf: true,
			spfAlignment: false,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'EmailOctopus',
			slug: 'emailoctopus',
			image: 'emailoctopus.png',
			spf: true,
			spfAlignment: true,
			dkim: true,
			dkimAlignment: true
		}
	];
</script>

<header class="container py-5">
	<img src={logo} alt="DMARC.wiki" class="h-10" />
</header>

<hr>

<main class="container">
	<p class="mt-12 text-xl">
		Welcome to DMARC.wiki, a directory of email service providers and their support for DMARC compliance.
	</p>

	<p class="mt-4 text-xl">
		For each provider you'll find if they support SPF, SPF alignment, DKIM and DKIM alignment,
		with instructions and tips on how to configure them.
	</p>

	<h2 class="mt-12">
		Email hosting
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each hostingProviders as provider}
			<ProviderRow {provider} />
		{/each}
	</div>

	<h2 class="mt-12">
		Email marketing and newsletters
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each marketingProviders as provider}
			<ProviderRow {provider} />
		{/each}
	</div>
</main>
