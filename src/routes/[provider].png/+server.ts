import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';
import OpenGraphImage from '$lib/og/open-graph-image.svelte';
import { promises as fs } from 'fs';

export const GET: RequestHandler = async () => {
	const zillaFont = await fs.readFile('src/lib/og/zilla-slab-latin-600-normal.ttf');
	const interFont = await fs.readFile('src/lib/og/inter-latin-500-normal.ttf');

	return new ImageResponse(
		// @ts-expect-error typings are wrong
		OpenGraphImage,
		{
			debug: true,
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
		{}
	);
};
