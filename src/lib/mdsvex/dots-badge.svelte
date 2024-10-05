<script lang="ts">
	import { tooltip } from 'svooltip';
</script>

<span class="bg-slate-700 cursor-pointer
            px-2 py-1.5 mx-0.5 rounded-full
						inline-flex items-center gap-x-1
						relative -top-0.5"
			aria-label="…"
			use:tooltip={{
				offset: 15,
				html: true,
				content: `Replace this with the email address where you want DMARC reports to be delivered to.
				<br>This is usually provided by your DMARC monitoring tool of choice.`
			}}>
	<span class="size-1.5 rounded-full bg-slate-500 inline-block"></span>
	<span class="size-1.5 rounded-full bg-slate-500 inline-block"></span>
	<span class="size-1.5 rounded-full bg-slate-500 inline-block"></span>
</span>
