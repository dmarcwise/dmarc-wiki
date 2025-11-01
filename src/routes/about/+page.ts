import type { MetaTagsProps } from 'svelte-meta-tags';

export function load() {
	return {
		pageMetaTags: {
			title: 'About DMARC.wiki',
			openGraph: {
				title: 'About DMARC.wiki'
			}
		} satisfies MetaTagsProps
	};
}
