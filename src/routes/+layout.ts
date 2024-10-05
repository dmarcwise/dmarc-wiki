import type { SvelteComponent } from 'svelte';

export const prerender = true;

export async function load() {
	const files = import.meta.glob<MarkdownModule>('$lib/providers/*.svelte.md');

	const hostingProviders = [];
	const marketingProviders = [];

	for (const importFile of Object.values(files)) {
		const provider = await importFile();
		const mapped = {
			name: provider.metadata.name,
			slug: provider.metadata.slug,
			logo: provider.metadata.logo,
			spfAlignment: toBooleanish(provider.metadata.spfAlignment),
			dkim: toBooleanish(provider.metadata.dkim),
			dkimAlignment: toBooleanish(provider.metadata.dkimAlignment),
			component: provider.default,
			updated: new Date(provider.metadata.updated)
		};

		if (provider.metadata.type === 'hosting') {
			hostingProviders.push(mapped);
		} else if (provider.metadata.type === 'marketing') {
			marketingProviders.push(mapped);
		}
	}

	// const hostingProviders = [
	// 	{
	// 		name: 'Google Workspace',
	// 		slug: 'google-workspace',
	// 		image: 'google.png',
	// 		spfAlignment: true,
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	},
	// 	{
	// 		name: 'Fastmail',
	// 		slug: 'fastmail',
	// 		image: 'fastmail.jpg',
	// 		spfAlignment: true,
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	},
	// 	{
	// 		name: 'Microsoft 365',
	// 		slug: 'microsoft-365',
	// 		image: 'microsoft365.png',
	// 		spfAlignment: true,
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	}
	// ];
	//
	// const marketingProviders = [
	// 	{
	// 		name: 'Mailchimp',
	// 		slug: 'mailchimp',
	// 		image: 'mailchimp.jpg',
	// 		spfAlignment: false,
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	},
	// 	{
	// 		name: 'Brevo',
	// 		slug: 'brevo',
	// 		image: 'brevo.jpg',
	// 		spfAlignment: false,
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	},
	// 	{
	// 		name: 'EmailOctopus',
	// 		slug: 'emailoctopus',
	// 		image: 'emailoctopus.png',
	// 		spfAlignment: true,
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	},
	// 	{
	// 		name: 'MailChannels',
	// 		slug: 'mailchannels',
	// 		image: 'mailchannels.png',
	// 		spfAlignment: true,
	// 		dkim: false,
	// 		dkimAlignment: false
	// 	},
	// 	{
	// 		name: 'HubSpot',
	// 		slug: 'hubspot',
	// 		image: 'hubspot.jpg',
	// 		spfAlignment: 'paid',
	// 		dkim: true,
	// 		dkimAlignment: true
	// 	}
	// ];

	hostingProviders.sort((a, b) => a.name.localeCompare(b.name));
	marketingProviders.sort((a, b) => a.name.localeCompare(b.name));

	return {
		hostingProviders,
		marketingProviders
	};
}

interface MarkdownModule {
	default: typeof SvelteComponent;
	metadata: Record<string, string>;
}

function toBooleanish(value: string) {
	if (value === 'true') {
		return true;
	}

	if (value === 'false') {
		return false;
	}

	return value;
}
