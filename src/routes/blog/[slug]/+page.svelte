<script lang="ts">
	import '../../../prism-one-dark.css';
	let { data } = $props();

</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.shortDescription} />
</svelte:head>

<article class="max-h-full">
	<h1>{data.title}</h1>
	<p>Published: {data.date}</p>

	<data.content />
</article>

