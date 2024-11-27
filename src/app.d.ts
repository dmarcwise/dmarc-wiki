// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module '*.svelte.md' {
		import type { SvelteComponent } from 'svelte';

		export default class Comp extends SvelteComponent {}

		export const metadata: Record<string, unknown>;
	}

	declare module '*?base64' {
		const content: string;
		export default content;
	}
}

export {};
