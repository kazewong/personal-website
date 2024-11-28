<script>
	export let image;
	export let alt = '';

	export let title;
	export let description;
</script>

<div class="card lg:card-side shadow-xl bg-slate-700 w-max[840px]">
	<figure class="lg:w-3/5">
		<img class="" src={image} {alt} />
	</figure>

	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description}</p>
	</div>
</div>
