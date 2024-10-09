import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const data = await parent();

	const provider =
		data.hostingProviders.find((p) => p.slug === params.provider) ||
		data.marketingProviders.find((p) => p.slug === params.provider) ||
		data.transactionalProviders.find((p) => p.slug === params.provider);

	if (!provider) {
		error(404);
	}

	return {
		provider,
		seo: {
			title: `How to set up SPF, DKIM and DMARC for ${provider.name}`,
			description: `Learn how to set up SPF, DKIM and DMARC for your custom domain on ${provider.name}.`,
			ogType: 'article',
			jsonLd: {
				'@context': 'https://schema.org',
				'@type': 'NewsArticle',
				headline: `How to set up SPF, DKIM and DMARC for ${provider.name}`,
				dateModified: provider.updated.toISOString()
			}
		}
	};
}
