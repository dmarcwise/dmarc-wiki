import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';
import OpenGraphImage from '$lib/og/open-graph-image.svelte';
import { promises as fs } from 'fs';
import { loadProviders, type Provider } from '$lib/providers';
import { dev } from '$app/environment';
import checkEmoji from '$lib/emojis/check.png?base64';
import warningEmoji from '$lib/emojis/warning.png?base64';
import crossEmoji from '$lib/emojis/cross.png?base64';
import { badgeColor } from '$lib/utils';

export const GET: RequestHandler = async ({ params }) => {
	const providers = await loadProviders();

	const provider =
		providers.hostingProviders.find((p) => p.slug === params.provider) ||
		providers.marketingProviders.find((p) => p.slug === params.provider);

	if (!provider) {
		return new Response(null, { status: 404 });
	}

	const zillaFont = await fs.readFile('src/lib/og/zilla-slab-latin-600-normal.ttf');
	const interFont = await fs.readFile('src/lib/og/inter-latin-500-normal.ttf');

	const logo = await getLogoBase64(provider.logo);

	const spfText = 'SPF alignment';
	const spfImage = 'data:image/png;base64,' + (await getEmojiBase64(provider.spfAlignment));
	const spfColors = badgeColor(provider.spfAlignment);

	const dkimText = provider.dkimAlignment ? 'DKIM alignment' : 'No DKIM support';
	const dkimImage = 'data:image/png;base64,' + (await getEmojiBase64(provider.dkimAlignment));
	const dkimColors = badgeColor(provider.dkimAlignment);

	return new ImageResponse(
		// @ts-expect-error typings are wrong
		OpenGraphImage,
		{
			debug: dev,
			fonts: [
				{
					name: 'Zilla Slab',
					data: zillaFont,
					weight: 600,
					style: 'normal'
				},
				{
					name: 'Inter',
					data: interFont,
					weight: 500,
					style: 'normal'
				}
			]
		},
		{
			props: {
				name: provider.name,
				logo,
				spfText,
				spfImage,
				spfColors,
				dkimText,
				dkimImage,
				dkimColors
			}
		}
	);
};

async function getEmojiBase64(value: boolean | string) {
	if (value === true) {
		return checkEmoji;
	} else if (value === 'partial') {
		return warningEmoji;
	} else {
		return crossEmoji;
	}
}

async function getLogoBase64(fileName: string) {
	const files = import.meta.glob('$lib/logos/*.{jpg,png}', {
		query: '?base64'
	});

	for (const file of Object.keys(files)) {
		if (file.endsWith(fileName)) {
			const data = await files[file]();
			const prefix = fileName.endsWith('.png')
				? 'data:image/png;base64,'
				: 'data:image/jpeg;base64,';
			// @ts-expect-error missing module declaration
			return prefix + data.default;
		}
	}

	throw new Error(`Could not find ${fileName}`);
}

export const entries = async () => {
	const providers = await loadProviders();

	const mapProviders = (providers: Provider[]) => {
		return providers.map((provider) => ({
			provider: provider.slug
		}));
	};

	return mapProviders(providers.hostingProviders).concat(
		mapProviders(providers.marketingProviders)
	);
};

export const prerender = true;
