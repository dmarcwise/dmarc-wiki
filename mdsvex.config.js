import rehypeRewrite from 'rehype-rewrite';
import { remarkSvelteAutoImport } from '@kasisoft/remark-svelte-auto-import';

const badge = function (value) {
	return `
<span class="border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-md">
	${value}
</span>
`.trim();
};

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
		[
			rehypeRewrite,
			{
				rewrite: (node) => {
					// Remove rel="nofollow" from links to dmarcwise.io
					if (node.tagName === 'a' && node.properties.href.startsWith('https://dmarcwise.io')) {
						node.properties.rel = undefined;
					}

					// Replace textual example domain with stylized badge
					if (node.tagName === 'code') {
						for (const child of node.children) {
							if (child.type === 'text') {
								child.value = child.value.replace('[example.com]', badge('example.com'));
								child.value = child.value.replace('[example]', badge('example'));
							}
						}
					}
				}
			}
		]
	]
};

export default mdsvexOptions;
