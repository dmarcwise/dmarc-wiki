<script lang="ts">
	import { badgeColor } from '$lib/utils.js';
	import CrossEmoji from '$lib/emojis/CrossEmoji.svelte';
	import CheckEmoji from '$lib/emojis/CheckEmoji.svelte';
	import WarningEmoji from '$lib/emojis/WarningEmoji.svelte';

	export let value: boolean | string;
	export let text: string;
</script>

<div
	class="rounded-lg border px-3 py-1 font-medium flex items-center justify-between gap-x-2
					{badgeColor(value)}">
	{text}
	{#if value === true}
		<CheckEmoji />
	{:else if value === 'partial'}
		<WarningEmoji />
	{:else}
		<CrossEmoji />
	{/if}
</div>
