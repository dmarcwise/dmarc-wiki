<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="overflow-x-auto whitespace-nowrap my-8">
	<table class="my-0">
		{@render children()}
	</table>
</div>
