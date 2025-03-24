<script lang="ts">
	let { image, title, description, alt_des } = $props();
</script>

<div class="card lg:card-side bg-sky-900 shadow-sm">
	<figure class="max-w-sm">
		<img src={image} alt={alt_des} class="rounded-lg"/>
	</figure>
	<div class="card-body">
	  <h2 class="card-title">{title}</h2>
	  <p>{description}</p>
	  <div class="card-actions justify-end">
		<button class="btn btn-secondary">Listen</button>
	  </div>
	</div>
  </div>