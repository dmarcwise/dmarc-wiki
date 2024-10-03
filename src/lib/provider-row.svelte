<script lang="ts">
	import CrossEmoji from '$lib/emoji/CrossEmoji.svelte';
	import CheckEmoji from '$lib/emoji/CheckEmoji.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import WarningEmoji from '$lib/emoji/WarningEmoji.svelte';

	export let provider;

	const providerImages = import.meta.glob(
		'$lib/logos/*.{png,jpg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

	function getProviderImage(image: string) {
		return providerImages[`/src/lib/logos/${image}`].default;
	}

	function spfColor(alignment: boolean | 'paid') {
		if (alignment === true) {
			return 'bg-green-100 border-green-200 text-green-700';
		} else if (alignment === 'paid') {
			return 'bg-yellow-100 border-yellow-200 text-yellow-700';
		} else {
			return 'bg-red-100 border-red-200 text-red-700';
		}
	}
</script>

<a href="/" class="rounded-lg bg-slate-50 px-5 py-4 flex flex-col sm:flex-row gap-x-5 gap-y-3 sm:items-center">
	<div class="size-12 bg-white rounded-lg border border-slate-200 p-2">
		<enhanced:img src={getProviderImage(provider.image)}
									alt="{provider.name} logo"
									class="w-full rounded-md" />
	</div>

	<h3 class="font-medium text-xl">
		{provider.name}
	</h3>

	<div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
		<div
			class="rounded-lg border px-3 py-1 font-medium flex items-center justify-between gap-x-2
							{spfColor(provider.spfAlignment)}">
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
					{provider.dkim && provider.dkimAlignment ? 'bg-green-100 border-green-200 text-green-700'
					: 'bg-red-100 border-red-200 text-red-700'}">
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

		<div class="rounded-lg border border-slate-200 px-3 sm:px-2 py-1
							flex items-center justify-between bg-white hover:bg-slate-100 transition-colors">
			<span class="sm:hidden font-medium">
				See instructions and tips
			</span>

			<ChevronRight class="size-4" />
		</div>
	</div>
</a>
