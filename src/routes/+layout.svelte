<script lang="ts">
	import '@fontsource/zilla-slab/600.css';
	import '@fontsource/zilla-slab/700.css';
	import '@fontsource-variable/inter';
	import '../app.css';
	import 'svooltip/styles.css';
	import logo from '$lib/logo.png';
	import { ModeWatcher } from 'mode-watcher';
	import { userPrefersMode } from 'mode-watcher';
	import MetaTags from '$lib/meta-tags.svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<MetaTags />
</svelte:head>

<ModeWatcher />

<header class="container py-5 flex justify-between items-center">
	<a href="/">
		<img src={logo} alt="DMARC.wiki" class="h-10 dark:rounded-md dark:border dark:border-slate-800" />
	</a>

	<a href="/about" class="font-medium uppercase hover:underline">
		About
	</a>
</header>

<hr>

<slot />

<hr class="mt-16">

<footer class="container py-12 flex flex-col sm:flex-row gap-4">
	<p>
		Made by <a href="https://dmarcwise.io" class="underline">DMARCwise</a>
		•
		<a href="https://github.com/dmarcwise/dmarc-wiki" class="underline">GitHub</a>
	</p>

	<select class="p-2 rounded-md sm:ml-auto"
					bind:value={$userPrefersMode}>
		<option value="system">Auto</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</footer>
