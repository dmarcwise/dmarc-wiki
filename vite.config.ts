import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import * as fs from 'node:fs';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		{
			name: 'base64-loader',
			transform(_, id: string) {
				const [path, query] = id.split('?');
				if (query != 'base64') return null;

				const data = fs.readFileSync(path);
				const base64 = data.toString('base64');

				return `export default '${base64}';`;
			}
		}
	]
});
