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
	}
};

export default mdsvexOptions;
