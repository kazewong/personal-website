<script lang="ts">
	import '../../../prism-one-dark.css';
	let { data } = $props();

</script>


<article class="max-h-full">
	<h1>{data.title}</h1>
	<p>Published: {data.date}</p>

	<data.content />
</article>

