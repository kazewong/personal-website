<script>
	export let data;
</script>

<article class="max-h-full">
	<h1>{data.title}</h1>
	<p>Published: {data.date}</p>

	<svelte:component this={data.content} />
</article>