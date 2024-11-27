import type { SvelteComponent } from 'svelte';

interface MarkdownModule {
	default: typeof SvelteComponent;
	metadata: Record<string, string>;
}

export interface Provider {
	name: string;
	slug: string;
	logo: string;
	spfAlignment: boolean | string;
	dkim: boolean | string;
	dkimAlignment: boolean | string;
	component: typeof SvelteComponent;
	updated: Date;
}

export async function loadProviders() {
	const files = import.meta.glob<MarkdownModule>('$lib/providers/*.svelte.md');

	const hostingProviders = [];
	const marketingProviders = [];

	for (const importFile of Object.values(files)) {
		const module = await importFile();
		const provider = {
			name: module.metadata.name,
			slug: module.metadata.slug,
			logo: module.metadata.logo,
			spfAlignment: toBooleanish(module.metadata.spfAlignment),
			dkim: toBooleanish(module.metadata.dkim),
			dkimAlignment: toBooleanish(module.metadata.dkimAlignment),
			component: module.default,
			updated: new Date(module.metadata.updated)
		} as Provider;

		if (module.metadata.type === 'hosting') {
			hostingProviders.push(provider);
		} else if (module.metadata.type === 'marketing') {
			marketingProviders.push(provider);
		}
	}

	hostingProviders.sort((a, b) => a.name.localeCompare(b.name));
	marketingProviders.sort((a, b) => a.name.localeCompare(b.name));

	return {
		hostingProviders,
		marketingProviders
	};
}

function toBooleanish(value: string) {
	if (value === 'true') {
		return true;
	}

	if (value === 'false') {
		return false;
	}

	return value;
}
