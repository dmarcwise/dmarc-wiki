<script lang="ts">
	import { page } from '$app/state';

	const fallback = {
		title: 'DMARC.wiki',
		description:
			'A directory of email service providers and their DMARC compliance level when used with custom domains.',
		ogType: 'website',
		ogImage: 'https://dmarc.wiki/og-image.jpg',
	};

	let seo = $derived(page.data.seo ?? {});

	let title = $derived(seo.title || fallback.title);
	let description = $derived(seo.description || fallback.description);
	let ogTitle = $derived(seo.ogTitle || seo.title || fallback.title);
	let ogType = $derived(seo.ogType || fallback.ogType);
	let ogImage = $derived(seo.ogImage || fallback.ogImage);

	// Built here rather than inline in the template: an inline JSON-LD script tag
	// inside an {@html `…`} mustache trips up the ESLint Svelte parser. The closing
	// tag is written as <\/script> so neither the Svelte compiler nor an HTML
	// parser ends the surrounding block early.
	let jsonLdScript = $derived(
		seo.jsonLd
			? // eslint-disable-next-line no-useless-escape -- the \/ keeps the parser from ending the block early
				`<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}<\/script>`
			: null,
	);
</script>

<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:site_name" content="DMARC.wiki" />
<meta property="og:title" content={ogTitle} />
<meta property="og:type" content={ogType} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@DMARCwise" />
<meta name="twitter:image" content={ogImage} />

{#if seo.ogAuthor}
	<meta property="og:author" content={seo.ogAuthor} />
{/if}

{#if seo.ogModified}
	<meta property="og:updated_time" content={seo.ogModified.toISOString()} />
{/if}

{#if jsonLdScript}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD from JSON.stringify of controlled data -->
	{@html jsonLdScript}
{/if}

<link rel="canonical" href="https://dmarc.wiki{page.url.pathname}" />
