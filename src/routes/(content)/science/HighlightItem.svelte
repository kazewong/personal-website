<script lang="ts">
	let { image, title, description, alt_des } = $props();
</script>

<div class="card lg:card-side bg-base-100 shadow-sm">
	<figure class="max-w-sm">
		<img src={image} alt={alt_des} class="rounded-lg"/>
	</figure>
	<div class="card-body">
	  <h2 class="card-title">New album is released!</h2>
	  <p>Click the button to listen on Spotiwhy app.</p>
	  <div class="card-actions justify-end">
		<button class="btn btn-primary">Listen</button>
	  </div>
	</div>
  </div>