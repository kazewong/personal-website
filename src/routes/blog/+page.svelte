<script lang="ts">
	let { data } = $props();

	// ==========================
	// Tag logic
	// ==========================

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	type Post = {
		path: string;
		meta: {
			title: string;
			date: string;
			tags: string[];
		};
	};

	type Tag = {
		name: string;
		path: string;
		selected: boolean;
	};

	function getInitialTags() {
		const all_tags = new Set<string>();
		for (const post of data.posts) {
			for (const tag of post.meta.tags) {
				all_tags.add(capitalizeFirstLetter(tag));
			}
		}
		return Array.from(all_tags).map((name) => ({
			name,
			path: '', // path is not really used per tag
			selected: false
		}));
	}

	let tags: Tag[] = $state(getInitialTags());

	// Filter posts based on selected tags
	function filterPosts() {
		const selected = tags.filter((t) => t.selected).map((t) => t.name);
		if (selected.length === 0) {
			return data.posts;
		}
		return data.posts.filter((post: Post) => {
			const postTagNames = post.meta.tags.map(capitalizeFirstLetter);
			// Only include posts that have ALL selected tags
			return selected.every((sel) => postTagNames.includes(sel));
		});
	}
	let filtered_posts = $derived.by(() => {
		return filterPosts();
	});

	// Sort posts by date
	function sortPosts(posts: Post[]) {
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

	let tagSearch = $state('');

	let searchedTags = $derived.by(() => {
		if (tagSearch === '') {
			return visibleTags;
		}
		return visibleTags.filter((tag) => tag.name.toLowerCase().startsWith(tagSearch.toLowerCase()));
	});

	const tagsPerPage = 10;
	let currentPage = $state(1);

	let paginatedTags = $derived.by(() => {
		const start = (currentPage - 1) * tagsPerPage;
		const end = start + tagsPerPage;
		return searchedTags.slice(start, end);
	});

	function nextPage() {
		if (currentPage * tagsPerPage < searchedTags.length) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	// ==========================
	// Post pagination logic
	// ==========================
	const postsPerPage = 10;
	let postPage = $state(1);

	let paginatedPosts = $derived.by(() => {
		const start = (postPage - 1) * postsPerPage;
		const end = start + postsPerPage;
		return renderPosts.posts.slice(start, end);
	});

	function nextPostPage() {
		if (postPage * postsPerPage < renderPosts.posts.length) {
			postPage++;
		}
	}

	function prevPostPage() {
		if (postPage > 1) {
			postPage--;
		}
	}
</script>

<div id="Header">
	<h1 class="flex justify-center">My random thoughts</h1>

	<h3 class="font-sans text-justify">
		Here are a bunch of random posts that I think it would be useful and/or fun to read. For more
		academic stuff you find here, note that these are mostly some informal ideas I have, so don't
		run with this too seriously. The rest of the content includes short tutorials, project updates,
		and some random opinions I have. Enjoy!
	</h3>
</div>

<!-- Insert keyword filters here -->
<div class="flex flex-col gap-2 py-2">
	<input
		type="text"
		placeholder="Search Tags"
		class="input input-bordered"
		bind:value={tagSearch}
	/>
	<div class="flex flex-wrap gap-2 py-2">
		{#each paginatedTags as tag}
			{#if tag.selected}
				<button
					class="btn btn-md btn-outline btn-accent"
					onclick={() => {
						tag.selected = !tag.selected;
					}}
				>
					{tag.name}
				</button>
			{:else}
				<button
					class="btn btn-md btn-outline"
					onclick={() => {
						tag.selected = !tag.selected;
					}}
				>
					{tag.name}
				</button>
			{/if}
		{/each}
	</div>
	<div class="flex justify-center items-center gap-4">
		<button class="btn btn-sm" onclick={prevPage} disabled={currentPage === 1}> Previous </button>
		<span>Page {currentPage} of {Math.ceil(searchedTags.length / tagsPerPage)}</span>
		<button
			class="btn btn-sm"
			onclick={nextPage}
			disabled={currentPage * tagsPerPage >= searchedTags.length}
		>
			Next
		</button>
	</div>
</div>

<ul>
	{#if paginatedPosts.length === 0}
		<li>No posts found.</li>
	{:else}
		{#each paginatedPosts as post}
			<li class="mb-2">
				<div>
					<p class="text-sm text-gray-500">{post.meta.date}</p>
				</div>
				<div>
					<h2 class="py-0 text-2xl">
						<a
							href={post.path}
							class="transition-all duration-150 hover:text-gray-50 hover:scale-105"
							style="display: inline-block;"
						>
							{post.meta.title}
						</a>
					</h2>
				</div>
			</li>
		{/each}
	{/if}
</ul>
<div class="flex justify-center items-center gap-4 py-4">
	<button class="btn btn-sm" onclick={prevPostPage} disabled={postPage === 1}>Previous</button>
	<span>Page {postPage} of {Math.ceil(renderPosts.posts.length / postsPerPage)}</span>
	<button
		class="btn btn-sm"
		onclick={nextPostPage}
		disabled={postPage * postsPerPage >= renderPosts.posts.length}>Next</button
	>
</div>
