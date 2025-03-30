<script lang="ts">
	let { image, title, description, alt_des, link, date, left } = $props();
</script>

{#snippet figure(image: string, alt_des: string)}
	<figure class="max-w-sm  object-contain">
		<img src={image} alt={alt_des} class="rounded-lg"/>
	</figure>
{/snippet}

{#snippet info(title: string, description: string, date: string)}
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description}</p>
		{#if left}
			<div class="flex justify-end">
				<div class="card-actions">
					<a href={link}>
						<button class="btn btn-secondary">Read more</button>
					</a>
				</div>	
			</div>
		{:else}
			<div class="flex justify-start">
				<div class="card-actions">
					<a href={link}>
						<button class="btn btn-secondary">Read more</button>
					</a>
				</div>	
			</div>
		{/if}
	</div>
{/snippet}

<div class="card lg:card-side bg-sky-900 shadow-sm">
	{#if left}
		{@render figure(image, alt_des)}
		{@render info(title, description, date)}
	{:else}
		{@render info(title, description, date)}
		{@render figure(image, alt_des)}
	{/if}
</div>