import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			container: {
				center: true,
				screens: {
					lg: '900px',
					xl: '900px',
					'2xl': '900px'
				},
				padding: {
					DEFAULT: '24px',
					md: '32px'
				}
			},
			fontFamily: {
				title: ['Zilla Slab', ...defaultTheme.fontFamily.serif],
				sans: ['Inter Variable', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: []
} as Config;
