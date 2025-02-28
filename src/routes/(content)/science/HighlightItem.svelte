<script lang="ts">
	let { image, title, description, alt_des } = $props();
</script>

<div class="card card-compact w-full min-h-[300px] h-auto">
	<div class="flex justify-center">
		<h2 class="card-title text-2xl">{title}</h2>
	</div>
	<figure class="max-h-[600px]">
		<img src={image} alt={alt_des} class="rounded-lg"/>
	</figure>
	<div class="card-body">
		<p class="text-justify">{description}</p>
	</div>
</div>
