import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const data = await parent();

	const provider =
		data.hostingProviders.find((p) => p.slug === params.provider) ||
		data.marketingProviders.find((p) => p.slug === params.provider);

	if (!provider) {
		error(404);
	}

	return {
		provider
	};
}
