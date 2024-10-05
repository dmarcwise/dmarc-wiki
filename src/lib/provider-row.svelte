<script lang="ts">
	import CrossEmoji from '$lib/emoji/CrossEmoji.svelte';
	import CheckEmoji from '$lib/emoji/CheckEmoji.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import WarningEmoji from '$lib/emoji/WarningEmoji.svelte';
	import { getLogo } from '$lib/logos';
	import { badgeColor } from '$lib/utils';

	export let provider;
</script>

<a href="/{provider.slug}"
	 class="rounded-lg bg-slate-50 dark:bg-slate-850 px-5 py-4 flex flex-col sm:flex-row gap-x-5 gap-y-3 sm:items-center">
	<div class="size-12 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2">
		<enhanced:img src={getLogo(provider.logo)}
									alt="{provider.name} logo"
									class="w-full rounded-md" />
	</div>

	<h3 class="font-medium text-xl">
		{provider.name}
	</h3>

	<div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
		<div
			class="rounded-lg border px-3 py-1 font-medium flex items-center justify-between gap-x-2
							{badgeColor(provider.spfAlignment)}">
			SPF alignment
			{#if provider.spfAlignment === true}
				<CheckEmoji />
			{:else if provider.spfAlignment === 'partial'}
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

		<div class="rounded-lg border border-slate-200 dark:border-slate-700 px-3 sm:px-2 py-1
							flex items-center justify-between bg-white dark:bg-slate-900
							hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
			<span class="sm:hidden font-medium">
				See instructions and tips
			</span>

			<ChevronRight class="size-4" />
		</div>
	</div>
</a>
