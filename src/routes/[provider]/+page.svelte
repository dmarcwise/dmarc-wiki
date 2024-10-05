<script>
	import { getLogo } from '$lib/logos';
	import BadgeSpf from '$lib/badge-spf.svelte';
	import BadgeDkim from '$lib/badge-dkim.svelte';

	export let data;

	const { provider } = data;

	const formattedDate = provider.updated.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
</script>

<main class="container my-16">

	<article>
		<div class="flex flex-col sm:flex-row sm:items-center justify-center gap-x-6 gap-y-3">
			<div
				class="size-20 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shrink-0">
				<enhanced:img src={getLogo(provider.logo)}
											alt="{provider.name} logo"
											class="w-full rounded-lg" />
			</div>

			<h1>
				{provider.name}
			</h1>
		</div>

		<aside class="mt-10 flex flex-col sm:flex-row justify-center gap-3">

			<BadgeSpf {provider} />
			<BadgeDkim {provider} />

		</aside>

		<main class="prose prose-slate lg:prose-lg dark:prose-invert prose-pre:whitespace-pre-wrap
							prose-code:before:hidden prose-code:after:hidden prose-p:sm:mt-0
						  max-w-none">
			<svelte:component this={provider.component} />
		</main>

		<p class="mt-16 text-center text-sm text-slate-500">
			Last updated on {formattedDate}
		</p>

	</article>
</main>
