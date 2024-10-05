import type { SvelteComponent } from 'svelte';

const logos = import.meta.glob<ImageModule>('$lib/logos/*.{png,jpg}', {
	eager: true,
	query: {
		enhanced: true
	}
});

export function getLogo(fileName: string) {
	return logos[`/src/lib/logos/${fileName}`].default;
}

interface ImageModule {
	default: typeof SvelteComponent;
}
