export const prerender = true;

export function load() {
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

	return {
		hostingProviders,
		marketingProviders
	};
}
