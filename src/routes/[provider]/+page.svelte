<script>
	import { getLogo } from '$lib/logos';
	import CrossEmoji from '$lib/emoji/CrossEmoji.svelte';
	import CheckEmoji from '$lib/emoji/CheckEmoji.svelte';
	import WarningEmoji from '$lib/emoji/WarningEmoji.svelte';
	import { badgeColor } from '$lib/utils';

	export let data;

	const { provider } = data;
</script>

<main class="container py-16">

	<div class="flex flex-col sm:flex-row sm:items-center justify-center gap-x-6 gap-y-3">
		<div
			class="size-20 rounded-xl border border-slate-200 dark:border-slate-700 p-2 shrink-0">
			<enhanced:img src={getLogo(provider.image)}
										alt="{provider.name} logo"
										class="w-full rounded-lg" />
		</div>

		<h1>
			{provider.name}
		</h1>
	</div>

	<div class="mt-10 flex flex-col sm:flex-row justify-center gap-3">

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

	</div>

	<div class="mt-20">

		<div class="grid sm:grid-cols-3 gap-4">
			<h2 class="text-5xl">
				SPF
			</h2>

			<div class="col-span-2 prose prose-slate lg:prose-lg dark:prose-invert max-w-none prose-pre:whitespace-pre-wrap">
				<p>
					Fastmail supports SPF alignment, meaning that they use your custom domain in the <code>Envelope From</code>
					when sending emails.
				</p>

				<p>
					This makes it possible to achieve DMARC alignment with SPF.
				</p>

				<p>
					To allow Fastmail servers to send emails from your domain, create the following TXT record:
				</p>

				<pre>v=spf1 include:_spf.fastmail.com ~all</pre>

				<a href="/">
					Source
				</a>
			</div>
		</div>

	</div>
</main>
