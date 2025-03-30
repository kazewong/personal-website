<script lang="ts">
	let { image, title, description, alt_des, link, date, left } = $props();
	let innerWidth = $state(0);
</script>

{#snippet figure(image: string, alt_des: string)}
	<div class="lg:w-fit lg:max-w-sm lg:max-h-max">
		<img class="lg:object-contain lg:h-full lg:bg-white rounded-lg" src={image} alt={alt_des}/>
	</div>
{/snippet}

{#snippet info(title: string, description: string, date: string)}
	<div class="card-body">
		<h2 class="card-title text-3xl">{title}</h2>
		<p>{description}</p>
		{#if left}
			<div class="flex justify-end">
				<div class="card-actions">
					<a href={link}>
						<button class="btn btn-secondary text-xl">Read more</button>
					</a>
				</div>	
			</div>
		{:else}
			<div class="flex justify-start">
				<div class="card-actions">
					<a href={link}>
						<button class="btn btn-secondary text-xl">Read more</button>
					</a>
				</div>	
			</div>
		{/if}
	</div>
{/snippet}

<svelte:window bind:innerWidth />

<div class="card lg:card-side bg-sky-900 shadow-sm lg:h-96">
	{#if innerWidth > 1024}
		{#if left}
			{@render figure(image, alt_des)}
			{@render info(title, description, date)}
		{:else}
			{@render info(title, description, date)}
			{@render figure(image, alt_des)}
		{/if}
	{:else}
		{@render figure(image, alt_des)}
		{@render info(title, description, date)}
	{/if}

</div>