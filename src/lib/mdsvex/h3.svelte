<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<h3 class="not-prose inline-block border border-slate-200 dark:border-slate-700
           mb-5 px-3 py-0.5 rounded-md font-mono text-base font-semibold">
	{@render children()}
</h3>
