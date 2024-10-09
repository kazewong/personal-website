<script>
	export let image;
	export let alt = '';

	export let title;
	export let description;
</script>

<div class="card shadow-xl bg-slate-700">
	<figure class="object-fill">
		<img class="object-fill" src={image} {alt} />
	</figure>

	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description}</p>
	</div>
</div>
