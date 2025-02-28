<script>
	export let data;
	import '../../../prism-one-dark.css';

</script>


<article class="max-h-full">
	<h1>{data.title}</h1>
	<p>Published: {data.date}</p>

	<svelte:component this={data.content} />
</article>

