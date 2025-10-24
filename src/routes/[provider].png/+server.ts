import type { RequestHandler } from '@sveltejs/kit';
import OpenGraphImage from '$lib/og/open-graph-image.svelte';
import { loadProviders, type Provider } from '$lib/providers';
import checkEmoji from '$lib/emojis/check.png?base64';
import warningEmoji from '$lib/emojis/warning.png?base64';
import crossEmoji from '$lib/emojis/cross.png?base64';
import { badgeColor } from '$lib/utils';
import { render } from 'svelte/server';
import { html } from 'satori-html';
import satori from 'satori';
import ZillaSlabFont from '$lib/og/zilla-slab-latin-600-normal.ttf';
import InterFont from '$lib/og/inter-latin-500-normal.ttf';
import sharp from 'sharp';
import { read } from '$app/server';

export const GET: RequestHandler = async ({ params }) => {
	const providers = await loadProviders();

	const provider =
		providers.hostingProviders.find((p) => p.slug === params.provider) ||
		providers.marketingProviders.find((p) => p.slug === params.provider);

	if (!provider) {
		return new Response(null, { status: 404 });
	}

	const logo = await getLogoBase64(provider.logo);

	const spfText = 'SPF alignment';
	const spfImage = 'data:image/png;base64,' + (await getEmojiBase64(provider.spfAlignment));
	const spfColors = badgeColor(provider.spfAlignment);

	const dkimText = provider.dkimAlignment ? 'DKIM alignment' : 'No DKIM support';
	const dkimImage = 'data:image/png;base64,' + (await getEmojiBase64(provider.dkimAlignment));
	const dkimColors = badgeColor(provider.dkimAlignment);

	console.time('OG image for ' + provider.slug);

	const renderedComponent = render(OpenGraphImage, {
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
	});

	const reactLike = html(renderedComponent.head + renderedComponent.body);

	const svg = await satori(reactLike, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Zilla Slab',
				data: await read(ZillaSlabFont).arrayBuffer(),
				weight: 600,
				style: 'normal'
			},
			{
				name: 'Inter',
				data: await read(InterFont).arrayBuffer(),
				weight: 500,
				style: 'normal'
			}
		]
	});

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	const stream = new ReadableStream({
		start(controller) {
			controller.enqueue(png);
			controller.close();
		}
	});

	console.timeEnd('OG image for ' + provider.slug);

	return new Response(stream, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
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
		query: '?compressed-jpeg-base64'
	});

	for (const file of Object.keys(files)) {
		if (file.endsWith(fileName)) {
			const data = await files[file]();
			// @ts-expect-error missing module declaration
			return data.default;
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
