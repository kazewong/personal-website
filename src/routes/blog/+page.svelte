 <script lang="ts">
	export let data;
</script>


<div id="Header" class="py-4">
	<div class="flex justify-center">
		<h3 class="w-[420px] md:w-[720px] font-sans text-justify">
			Here are a bunch of random posts that I think it would be useful and/or fun to read. For more academic stuff you find here, note that these are mostly some informal ideas I have, so don't run with this too seriously. The rest of the content includes short tutorials, project updates, and some random opinions I have. Enjoy!
			At the beginning of constructing my personal website, you can find some really long blogs that took me a couple of train rides to finish each one of them. I figured this is pretty unsustainable since they require so much effort that I might as well actually turn them into something more substantial. Instead, I set a rule for myself that each blog post should not be longer than 30 minutes of writing.
 
		</h3>
	</div>
</div>

<!-- Insert keyword filters here -->

<ul>
	{#each data.posts as post}
		<li>
			<div class="flex justify-between">
				<h2 class="py-0 ">
					<a href={post.path} class="py-0">
						{post.meta.title}
					</a>
				</h2>
				<p class="min-w-[100px]">
					{post.meta.date}
				</p>	
			</div>
		</li>
	{/each}
</ul>
