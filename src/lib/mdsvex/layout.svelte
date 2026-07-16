<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<script module lang="ts">
	export { default as table } from './table.svelte';
	export { default as h3 } from './h3.svelte';
</script>

{@render children?.()}
