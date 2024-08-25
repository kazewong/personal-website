<script lang="ts">

    type BlogMetaData = {
        id: string;
        title: string;
        date: string;
        tags: string[];
    }

    let blogs: BlogMetaData[] = getPostData();

    function getPostData(): BlogMetaData[] {
        return [
            {
                id: "1",
                title: "First Post",
                date: "2021-10-01",
                tags: ["first", "post"]
            },
            {
                id: "2",
                title: "Second Post",
                date: "2021-10-02",
                tags: ["second", "post"]
            }]
    }

</script>

<div id="Header" class="">
    <p>
        Here are a bunch of random posts that I think it would be useful and/or fun to read. For more academic stuff you find here, note that these are mostly some informal ideas I have, so don't run with this too seriously. The rest of the content includes short tutorials, project updates, and some random opinions I have. Enjoy!
    </p>
</div>
<div id="Blogs" class="">
    {#each blogs as blog}
        <div class="flex flex-col">
            <h2>{blog.title}</h2>
            <p>{blog.date}</p>
            <p>{blog.tags.join(", ")}</p>
        </div>
    {/each}
</div>
