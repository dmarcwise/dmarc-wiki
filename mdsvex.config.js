import rehypeRewrite from 'rehype-rewrite';

const dots = `
<span class="bg-slate-700 px-2 py-1.5 mx-0.5 rounded-full
						inline-flex items-center gap-x-1
						relative -top-0.5"
			aria-label="…">
	<span class="bg-slate-500 inline-block size-1.5 rounded-full"></span>
	<span class="bg-slate-500 inline-block size-1.5 rounded-full"></span>
	<span class="bg-slate-500 inline-block size-1.5 rounded-full"></span>
</span>
`.trim();

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
			text = text.replace('[...]', dots);
			return `<pre>${text}</pre>`;
		}
	},
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
