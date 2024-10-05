import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './mdsvex.config.js'],

	darkMode: 'selector',

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
			},
			colors: {
				slate: {
					'850': '#172033'
				}
			}
		}
	},

	plugins: [typography]
} as Config;
