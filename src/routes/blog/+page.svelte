<script lang="ts">
	let { data } = $props();

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	type Tag = {
		name: string;
		selected: boolean;
	}

	let tags: Tag[] = $state([]);
	let tag_names: string[] = $derived.by(() => {
		return tags.map(tag => tag.name);
	});
	for (const post of data.posts) {
		for (const tag of post.meta.tags) {
			if (!tag_names.includes(capitalizeFirstLetter(tag))) {
				tags.push({
					name: capitalizeFirstLetter(tag),
					selected: false
				});
			}
		}
	}


</script>

<div id="Header" class="py-4">
	<h3 class="font-sans text-justify">
		Here are a bunch of random posts that I think it would be useful and/or fun to read. For more
		academic stuff you find here, note that these are mostly some informal ideas I have, so don't
		run with this too seriously. The rest of the content includes short tutorials, project updates,
		and some random opinions I have. Enjoy!
	</h3>
</div>

<!-- Insert keyword filters here -->
<div class="flex flex-wrap gap-2 py-2">
	{#each tags as tag}
		{#if tag.selected}
			<button
				class="btn lg:btn-md btn-accent"
				onclick={() => {
					tag.selected = !tag.selected;
				}}
			>
				{tag.name}
			</button>
		{:else}
			<button
				class="btn lg:btn-md btn-secondary"
				onclick={() => {
					tag.selected = !tag.selected;
				}}
			>
				{tag.name}
			</button>
		{/if}
	{/each}
</div>

<ul>
	{#each data.posts as post}
		<li>
			<div class="flex justify-between">
				<h2 class="py-0 text-2xl">
					<a href={post.path}>
						{post.meta.title}
					</a>
				</h2>
				<p class="min-w-[105px]">
					{post.meta.date}
				</p>
			</div>
		</li>
	{/each}
</ul>
