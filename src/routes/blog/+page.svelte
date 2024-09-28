<script lang="ts">
	export let data;
</script>


<div id="Header" class="">
    <h3 class="w-[420px] md:w-[720px] font-sans">
        Here are a bunch of random posts that I think it would be useful and/or fun to read. For more academic stuff you find here, note that these are mostly some informal ideas I have, so don't run with this too seriously. The rest of the content includes short tutorials, project updates, and some random opinions I have. Enjoy!
    </h3>
</div>

<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			Published {post.meta.date}
		</li>
	{/each}
</ul>