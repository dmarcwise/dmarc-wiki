<script>
	import '@fontsource/zilla-slab/600.css';
	import '@fontsource/zilla-slab/700.css';
	import '@fontsource-variable/inter';
	import '../app.css';
	import logo from '$lib/logo.png';
	import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
	<title>DMARC.wiki</title>
</svelte:head>

<ModeWatcher />

<header class="container py-5">
	<a href="/">
		<img src={logo} alt="DMARC.wiki" class="h-10 dark:rounded-md dark:border dark:border-slate-800" />
	</a>
</header>

<hr>

<slot></slot>

<footer class="container mt-10 py-5">

</footer>
