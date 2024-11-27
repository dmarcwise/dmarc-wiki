import { loadProviders } from '$lib/providers';

export async function load() {
	return loadProviders();
}

export const prerender = true;
