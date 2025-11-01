import { loadProviders } from '$lib/providers';

export async function load({ url }) {
	const providers = await loadProviders();

	return {
		hostingProviders: providers.hostingProviders,
		marketingProviders: providers.marketingProviders,
		...seoProperties(url)
	};
}

function seoProperties(url: URL) {
	const title = 'DMARC.wiki';
	const description =
		'A directory of email service providers and their DMARC compliance level when used with custom domains.';

	return {
		baseMetaTags: {
			title,
			description,
			canonical: new URL(url.pathname, 'https://dmarc.wiki').href,
			openGraph: {
				type: 'website',
				locale: 'en_GB',
				title,
				description,
				siteName: 'DMARC.wiki',
				images: [
					{
						url: 'https://dmarc.wiki/og-image.jpg'
					}
				]
			},
			twitter: {
				creator: '@DMARCwise',
				site: '@DMARCwise',
				cardType: 'summary_large_image',
				image: 'https://dmarc.wiki/og-image.jpg'
			}
		}
	};
}

export const prerender = true;
