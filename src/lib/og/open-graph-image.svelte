<script>
	export let name;
	export let logo;
	export let spfText;
	export let spfImage;
	export let spfColors;
	export let dkimText;
	export let dkimImage;
	export let dkimColors;
</script>

<div tw="bg-gray-50 flex flex-col w-full h-full py-14 px-14">
	<img src="https://assets.dmarcwise.io/wiki-logo-600.png" alt="DMARC.wiki"
			 tw="h-16" />

	<div tw="mt-auto flex items-center">
		<div tw="flex w-28 h-28 rounded-xl border border-slate-200 p-2 relative top-3">
			<img src={logo} alt={name}
					 tw="w-full rounded-lg" />
		</div>

		<p tw="ml-7 mt-8" style="font-size: 90px">
			{name}
		</p>
	</div>

	<div tw="flex mt-8">
		<div tw="rounded-lg border px-4 py-2 font-medium flex items-center text-3xl {spfColors}"
				 style="font-family: 'Inter'">
			{spfText}
			<img src={spfImage} alt=""
					 tw="w-8 h-8 ml-3" />
		</div>

		<div tw="ml-3 rounded-lg border px-4 py-2 font-medium flex items-center text-3xl {dkimColors}"
				 style="font-family: 'Inter'">
			{dkimText}
			<img src={dkimImage} alt=""
					 tw="w-8 h-8 ml-3" />
		</div>
	</div>
</div>
