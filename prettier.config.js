/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	printWidth: 100,
	tailwindStylesheet: './src/app.css',
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};

export default config;
