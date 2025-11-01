import { error } from '@sveltejs/kit';
import type { Provider } from '$lib/providers';
import type { JsonLdProps, MetaTagsProps } from 'svelte-meta-tags';

export async function load({ params, parent }) {
	const data = await parent();

	const provider =
		data.hostingProviders.find((p) => p.slug === params.provider) ||
		data.marketingProviders.find((p) => p.slug === params.provider);

	if (!provider) {
		error(404);
	}

	return {
		provider,
		...seoProperties(provider)
	};
}

function seoProperties(provider: Provider) {
	const ogImage = `https://dmarc.wiki/${provider.slug}.png`;

	const title = `How to set up SPF, DKIM and DMARC for ${provider.name}`;
	const description = `Learn how to set up SPF, DKIM and DMARC for your custom domain on ${provider.name}.`;

	return {
		pageMetaTags: {
			title,
			description,
			openGraph: {
				type: 'article',
				title,
				description,
				article: {
					modifiedTime: provider.updated.toISOString()
				},
				images: [
					{
						url: ogImage
					}
				]
			},
			twitter: {
				image: ogImage
			}
		} satisfies MetaTagsProps,
		jsonLd: {
			'@type': 'NewsArticle',
			headline: `How to set up SPF, DKIM and DMARC for ${provider.name}`,
			dateModified: provider.updated.toISOString(),
			image: ogImage
		} satisfies JsonLdProps['schema']
	};
}
