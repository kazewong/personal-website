<script lang="ts">
	let { data } = $props();
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

<ul>
	{#each data.posts as post}
		<li>
			<div class="flex justify-between">
				<h2 class="py-0">
					<a href={post.path} class="py-0">
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
