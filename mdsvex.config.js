/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.svelte.md'],
	layout: 'src/lib/mdsvex/layout.svelte'
	// Disable syntax highlighting
	// highlight: {
	// highlighter: (code) => `<pre>${code}</pre>`
	// },
};

export default mdsvexOptions;
