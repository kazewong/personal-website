<script lang="ts">
	import '../../../prism-one-dark.css';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.shortDescription} />
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.shortDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={data.image_url} />
</svelte:head>

<article class="max-h-full markdown">
	<h1>{data.title}</h1>
	<h3>{data.shortDescription}</h3>
	<p>Published: {data.date}</p>

	<data.content />
</article>

<style>
    .markdown :global(a){
        text-decoration: underline;
        color: cyan;
    }
    
    .markdown :global(li) {
        margin-left: 1.5rem;
        list-style-type: disc;
    }
</style>