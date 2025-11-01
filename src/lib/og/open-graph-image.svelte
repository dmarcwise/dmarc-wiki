<script lang="ts">
	interface Props {
		name: string;
		logo: string;
		spfText: string;
		spfImage: string;
		spfColors: string;
		dkimText: string;
		dkimImage: string;
		dkimColors: string;
	}

	let {
		name,
		logo,
		spfText,
		spfImage,
		spfColors,
		dkimText,
		dkimImage,
		dkimColors
	}: Props = $props();
</script>

<div class="bg-gray-50 flex flex-col w-full h-full py-14 px-14">
	<img src="https://dmarc.wiki/assets/logo-600.png" alt="DMARC.wiki"
			 class="h-16" />

	<div class="mt-auto flex items-center">
		<div class="flex w-28 h-28 rounded-xl border border-slate-200 p-2 relative top-3">
			<img src={logo} alt={name}
					 class="w-full rounded-lg" />
		</div>

		<p class="ml-7 mt-8" style="font-size: 90px">
			{name}
		</p>
	</div>

	<div class="flex mt-8">
		<div class="rounded-lg border px-4 py-2 font-medium flex items-center text-3xl {spfColors}"
				 style="font-family: 'Inter'">
			{spfText}
			<img src={spfImage} alt=""
					 class="w-8 h-8 ml-3" />
		</div>

		<div class="ml-3 rounded-lg border px-4 py-2 font-medium flex items-center text-3xl {dkimColors}"
				 style="font-family: 'Inter'">
			{dkimText}
			<img src={dkimImage} alt=""
					 class="w-8 h-8 ml-3" />
		</div>
	</div>
</div>
