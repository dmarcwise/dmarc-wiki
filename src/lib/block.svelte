<script lang="ts">
	export let title: string;
</script>

<div class="!mt-20 grid sm:grid-cols-3 gap-4">
	<h2 class="text-5xl not-prose">
		{title}
	</h2>

	<div class="col-span-2">
		<slot />
	</div>
</div>
