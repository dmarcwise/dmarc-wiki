import rehypeRewrite from 'rehype-rewrite';
import { remarkSvelteAutoImport } from '@kasisoft/remark-svelte-auto-import';

const exampleDomain = `
<span class="border px-1.5 py-0.5 rounded-md">
	example.com
</span>
`.trim();

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.svelte.md'],
	layout: 'src/lib/mdsvex/layout.svelte',
	// Disable syntax highlighting
	highlight: {
		highlighter: (text) => {
			return `<pre>${text}</pre>`;
		}
	},
	remarkPlugins: [
		// In code blocks, replace [...] with <DotsBadge />
		() => {
			return (tree) => {
				for (const node of tree.children) {
					if (node.type === 'code') {
						node.value = node.value.replace('[...]', '<DotsBadge />');
					}
				}
			};
		},
		// Auto-import some components to avoid importing them manually in each file
		[
			remarkSvelteAutoImport,
			{
				// debug: ['ComponentMap'],
				componentMap: {
					Block: '$lib/mdsvex/block.svelte',
					// TODO: this doesn't work because this plugin looks at the file content, not the modified tree.
					//       find a way to always import it maybe?
					DotsBadge: '$lib/mdsvex/dots-badge.svelte'
				}
			}
		]
	],
	rehypePlugins: [
		// Remove rel="nofollow" from links to dmarcwise.io
		[
			rehypeRewrite,
			{
				rewrite: (node) => {
					if (node.tagName === 'a' && node.properties.href.startsWith('https://dmarcwise.io')) {
						node.properties.rel = undefined;
					}
				}
			}
		],
		// Replace textual example domain with stylized badge
		[
			rehypeRewrite,
			{
				rewrite: (node) => {
					if (node.tagName === 'code') {
						for (const child of node.children) {
							if (child.type === 'text') {
								child.value = child.value.replace('[example.com]', exampleDomain);
							}
						}
					}
				}
			}
		]
	]
};

export default mdsvexOptions;
