<script lang="ts">
	import { page } from '$app/stores';

	const fallback = {
		title: 'DMARC.wiki',
		description: 'A directory of email service providers and their DMARC compliance level when used with custom domains.',
		ogType: 'website',
		ogImage: 'https://dmarc.wiki/og-image.jpg'
	};

	$: seo = $page.data.seo ?? {};

	$: title = seo.title || fallback.title;
	$: description = seo.description || fallback.description;
	$: ogTitle = seo.ogTitle || seo.title || fallback.title;
	$: ogType = seo.ogType || fallback.ogType;
	$: ogImage = seo.ogImage || fallback.ogImage;
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

{#if seo.jsonLd}
	{@html `<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`}
{/if}

<link rel="canonical" href="https://dmarc.wiki{$page.url.pathname}" />
