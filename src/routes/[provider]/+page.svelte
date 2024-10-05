<script>
	import { getLogo } from '$lib/logos';
	import CrossEmoji from '$lib/emoji/CrossEmoji.svelte';
	import CheckEmoji from '$lib/emoji/CheckEmoji.svelte';
	import WarningEmoji from '$lib/emoji/WarningEmoji.svelte';
	import { badgeColor } from '$lib/utils';

	export let data;

	const { provider } = data;

	const formattedDate = provider.updated.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>How to set up SPF, DKIM and DMARC for {provider.name}</title>
</svelte:head>

<main class="container py-16">

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

			<div
				class="rounded-lg border px-3 py-1 font-medium flex items-center justify-between gap-x-2
							{badgeColor(provider.spfAlignment)}">
				SPF alignment
				{#if provider.spfAlignment === true}
					<CheckEmoji />
				{:else if provider.spfAlignment === 'paid'}
					<WarningEmoji />
				{:else}
					<CrossEmoji />
				{/if}
			</div>

			<div class="rounded-lg border px-3 py-1 font-medium flex items-center justify-between gap-x-2
					{badgeColor(provider.dkim && provider.dkimAlignment)}">
				{#if !provider.dkim}
					No DKIM support
				{:else}
					DKIM alignment
				{/if}

				{#if provider.dkimAlignment}
					<CheckEmoji />
				{:else}
					<CrossEmoji />
				{/if}
			</div>

		</aside>

		<main class="prose prose-slate lg:prose-lg dark:prose-invert max-w-none prose-pre:whitespace-pre-wrap
							prose-code:before:hidden prose-code:after:hidden prose-p:mt-0">
			<svelte:component this={provider.component} />
		</main>

		<p class="mt-24 text-center text-sm text-slate-500">
			Last updated on {formattedDate}
		</p>

	</article>
</main>
