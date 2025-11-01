<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<script module lang="ts">
	import table from './table.svelte';
	import h3 from './h3.svelte';

	export { table, h3 };
</script>

{@render children?.()}
