<script lang="ts">
	import 'svooltip/styles.css'; // Include default styling
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div class="mt-20! sm:grid grid-cols-3 gap-4">
	<h2 class="text-5xl not-prose mb-10">
		{title}
	</h2>

	<div class="col-span-2">
		{@render children()}
	</div>
</div>
