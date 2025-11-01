<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';
	import { getLogo } from '$lib/logos';
	import BadgeSpf from '$lib/badge-spf.svelte';
	import BadgeDkim from '$lib/badge-dkim.svelte';
	import type { Provider } from '$lib/providers';

	interface Props {
		provider: Provider;
	}

	let { provider }: Props = $props();
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
		<BadgeSpf {provider} />
		<BadgeDkim {provider} />

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
