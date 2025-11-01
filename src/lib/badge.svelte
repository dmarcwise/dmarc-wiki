<script lang="ts">
	import { badgeColor } from '$lib/utils.js';
	import CrossEmoji from '$lib/emojis/cross-emoji.svelte';
	import CheckEmoji from '$lib/emojis/check-emoji.svelte';
	import WarningEmoji from '$lib/emojis/warning-emoji.svelte';

	interface Props {
		value: boolean | string;
		text: string;
	}

	let { value, text }: Props = $props();
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
