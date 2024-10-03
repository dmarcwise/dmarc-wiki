<script lang="ts">
	import logo from '$lib/logo.png';
	import ProviderRow from '$lib/provider-row.svelte';

	const hostingProviders = [
		{
			name: 'Google Workspace',
			slug: 'google-workspace',
			image: 'google.png',
			spfAlignment: true,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'Fastmail',
			slug: 'fastmail',
			image: 'fastmail.jpg',
			spfAlignment: true,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'Microsoft 365',
			slug: 'microsoft-365',
			image: 'microsoft365.png',
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
			spfAlignment: false,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'Brevo',
			slug: 'brevo',
			image: 'brevo.jpg',
			spfAlignment: false,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'EmailOctopus',
			slug: 'emailoctopus',
			image: 'emailoctopus.png',
			spfAlignment: true,
			dkim: true,
			dkimAlignment: true
		},
		{
			name: 'MailChannels',
			slug: 'mailchannels',
			image: 'mailchannels.png',
			spfAlignment: true,
			dkim: false,
			dkimAlignment: false
		},
		{
			name: 'HubSpot',
			slug: 'hubspot',
			image: 'hubspot.jpg',
			spfAlignment: 'paid',
			dkim: true,
			dkimAlignment: true
		}
	];

	hostingProviders.sort((a, b) => a.name.localeCompare(b.name));
	marketingProviders.sort((a, b) => a.name.localeCompare(b.name));
</script>

<header class="container py-5">
	<img src={logo} alt="DMARC.wiki" class="h-10" />
</header>

<hr>

<main class="container">
	<p class="mt-12 text-lg">
		Welcome to DMARC.wiki, a directory of email service providers and their DMARC compliance level.
	</p>

	<p class="mt-4 text-lg">
		For each provider you'll find their support for SPF, SPF alignment, DKIM and DKIM alignment,
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
		Email marketing, newsletters, APIs
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each marketingProviders as provider}
			<ProviderRow {provider} />
		{/each}
	</div>
</main>

<footer class="container mt-10 py-5">

</footer>
