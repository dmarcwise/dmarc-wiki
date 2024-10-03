<script lang="ts">
	import logo from '$lib/logo.png';
	import CheckEmoji from '$lib/emoji/CheckEmoji.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import CrossEmoji from '$lib/emoji/CrossEmoji.svelte';

	const providerImages = import.meta.glob(
		'$lib/logos/*.{png,jpg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

	function getProviderImage(image: string) {
		return providerImages[`/src/lib/logos/${image}`].default;
	}

	const providers = [
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
		Email providers
	</h2>

	<div class="grid mt-8 gap-y-4">
		{#each providers as provider}
			<a href="/" class="rounded-lg bg-slate-50 px-5 py-4 flex gap-x-5 items-center">
				<div class="size-12 bg-white rounded-lg border border-slate-200 p-2">
					<enhanced:img src={getProviderImage(provider.image)}
												alt="{provider.name} logo"
												class="w-full rounded-md" />
				</div>

				<h3 class="font-medium text-xl">
					{provider.name}
				</h3>

				<div class="flex gap-x-3 ml-auto">
					<div
						class="rounded-lg border px-3 font-medium flex items-center
										{provider.spf && provider.spfAlignment ? 'bg-green-100 border-green-200 text-green-700'
										: 'bg-red-100 border-red-200 text-red-700'}">
						<span class="py-1">
							SPF
						</span>

						<span
							class="inline-block border-l
										{provider.spf && provider.spfAlignment ? 'border-green-200': 'border-red-200'} h-full mx-3"></span>

						<span class="py-1 flex items-center gap-x-2">
							Alignment
							{#if provider.spf && provider.spfAlignment}
								<CheckEmoji />
							{:else}
								<CrossEmoji />
							{/if}
						</span>
					</div>

					<div
						class="rounded-lg border px-3 font-medium flex items-center
										{provider.dkim && provider.dkimAlignment ? 'bg-green-100 border-green-200 text-green-700'
										: 'bg-red-100 border-red-200 text-red-700'}">
						<span class="py-1">
							DKIM
						</span>

						<span
							class="inline-block border-l
										{provider.dkim && provider.dkimAlignment ? 'border-green-200': 'border-red-200'} h-full mx-3"></span>

						<span class="py-1 flex items-center gap-x-2">
							Alignment
							{#if provider.dkim && provider.dkimAlignment}
								<CheckEmoji />
							{:else}
								<CrossEmoji />
							{/if}
						</span>
					</div>

					<div
						class="rounded-lg border border-slate-200 px-2 flex items-center bg-white hover:bg-slate-100 transition-colors">
						<ChevronRight class="size-4" />
					</div>
				</div>
			</a>
		{/each}
	</div>
</main>
