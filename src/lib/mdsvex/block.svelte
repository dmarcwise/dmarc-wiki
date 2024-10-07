<script lang="ts">
	import { tooltip } from 'svooltip';
	import 'svooltip/styles.css'; // Include default styling

	export let title: string;
</script>

<div class="!mt-20 sm:grid grid-cols-3 gap-4">
	<h2 class="text-5xl not-prose mb-10">
		{title}
	</h2>

	<div class="col-span-2">
		<slot />
	</div>
</div>
