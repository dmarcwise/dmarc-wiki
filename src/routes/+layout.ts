import type { SvelteComponent } from 'svelte';

export const prerender = true;

export async function load() {
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
		};

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

interface MarkdownModule {
	default: typeof SvelteComponent;
	metadata: Record<string, string>;
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
