<script>
	import '@fontsource/zilla-slab/600.css';
	import '@fontsource/zilla-slab/700.css';
	import '@fontsource-variable/inter';
	import '../app.css';
	import 'svooltip/styles.css';
	import logo from '$lib/logo.png';
	import { ModeWatcher } from 'mode-watcher';
	import { userPrefersMode } from 'mode-watcher';
</script>

<svelte:head>
	<title>DMARC.wiki</title>
</svelte:head>

<ModeWatcher />

<header class="container py-5 flex justify-between items-center">
	<a href="/">
		<img src={logo} alt="DMARC.wiki" class="h-10 dark:rounded-md dark:border dark:border-slate-800" />
	</a>

	<a href="/" class="font-medium">
		About
	</a>
</header>

<hr>

<slot />

<hr class="mt-16">

<footer class="container py-12 flex">
	<select class="p-2 rounded-md ml-auto"
					bind:value={$userPrefersMode}>
		<option value="system">Auto</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</footer>
