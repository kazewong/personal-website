<script lang="ts">
	let { data } = $props();

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	type Tag = {
		name: string;
		path: string;
		selected: boolean;
	};

	let tags: Tag[] = $state([]);
	let tag_names: string[] = $derived.by(() => {
		return tags.map((tag) => tag.name);
	});
	for (const post of data.posts) {
		for (const tag of post.meta.tags) {
			if (!tag_names.includes(capitalizeFirstLetter(tag))) {
				tags.push({
					name: capitalizeFirstLetter(tag),
					path: post.path,
					selected: false
				});
			}
		}
	}

	// Filter posts based on selected tags
	function filterPosts() {
		const selected = tags.filter((t) => t.selected).map((t) => t.name);
		if (selected.length === 0) {
			return data.posts;
		}
		return data.posts.filter((post) => {
			const postTagNames = post.meta.tags.map(capitalizeFirstLetter);
			// Only include posts that have ALL selected tags
			return selected.every((sel) => postTagNames.includes(sel));
		});
	}
	let filtered_posts = $derived.by(() => {
		return filterPosts();
	});

	// Sort posts by date
	function sortPosts(posts: any[]) {
		return posts.sort((a, b) => {
			const dateA = new Date(a.meta.date);
			const dateB = new Date(b.meta.date);
			return dateB.getTime() - dateA.getTime();
		});
	}
	let sorted_posts = $derived.by(() => {
		return sortPosts(filtered_posts);
	});
	let renderPosts = $derived.by(() => {
		return {
			posts: sorted_posts,
			tags: tags
		};
	});

	// Compute visible tags based on selected tags and compatible tags in posts
	let visibleTags = $derived.by(() => {
		const selected = tags.filter((t) => t.selected).map((t) => t.name);
		if (selected.length === 0) {
			return tags;
		}
		// Find all tags that appear in posts matching all selected tags
		const compatibleTagSet = new Set<string>();
		for (const post of data.posts) {
			const postTagNames = post.meta.tags.map(capitalizeFirstLetter);
			if (selected.every((sel) => postTagNames.includes(sel))) {
				for (const tag of postTagNames) {
					compatibleTagSet.add(tag);
				}
			}
		}
		// Always include selected tags so they can be unselected
		selected.forEach((tag) => compatibleTagSet.add(tag));
		return tags.filter((tag) => compatibleTagSet.has(tag.name));
	});
</script>

<div id="Header" class="py-4">
	<h3 class="font-sans text-justify">
		Here are a bunch of random posts that I think it would be useful and/or fun to read. For more
		academic stuff you find here, note that these are mostly some informal ideas I have, so don't
		run with this too seriously. The rest of the content includes short tutorials, project updates,
		and some random opinions I have. Enjoy!
	</h3>
</div>

<div>
	<button
		class="btn btn-error"
		onclick={() => {
			for (const tag of tags) {
				tag.selected = false;
			}
		}}
	>
		Reset
	</button>
</div>

<!-- Insert keyword filters here -->
<div class="flex flex-wrap gap-2 py-2">
	{#each visibleTags as tag}
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
	{#if renderPosts.posts.length === 0}
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
	{:else}
		{#each renderPosts.posts as post}
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
	{/if}
</ul>
