import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import * as fs from 'fs';
import sharp from 'sharp';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		{
			name: 'base64-loader',
			async transform(_, id: string) {
				const [path, query] = id.split('?');
				if (query != 'base64') return null;

				const data = await fs.promises.readFile(path);
				const base64 = data.toString('base64');

				return `export default '${base64}';`;
			}
		},
		// Load image -> compress to jpeg -> convert to base64
		// Used in open graph image generation, since the SVG to PNG conversion is otherwise incredibly slow
		{
			name: 'compressed-jpeg-base64-loader',
			async transform(_, id: string) {
				const [path, query] = id.split('?');
				if (query != 'compressed-jpeg-base64') return null;

				const data = await fs.promises.readFile(path);
				const compressed = await sharp(data)
					.flatten({
						// White background for transparent images
						background: { r: 255, g: 255, b: 255 }
					})
					.jpeg()
					.toBuffer();

				const base64 = compressed.toString('base64');

				return `export default 'data:image/jpeg;base64,${base64}';`;
			}
		},
		{
			name: 'load-ttf-as-array-buffer',
			async transform(_src, id) {
				if (id.endsWith('.ttf')) {
					const array = new Uint8Array(await fs.promises.readFile(id));
					return `export default new Uint8Array([${array}]).buffer`;
				}
			}
		}
	]
});
