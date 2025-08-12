type PostResolver = {
	metadata: {
		title: string;
		date: string;
		tags: string[];
	};
};

export const fetchMarkdownPosts = async () => {
	// const allPostFiles = import.meta.glob('/src/lib/assets/blogs/*.md');
	const allPostFiles = import.meta.glob('/src/routes/blog/posts/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as PostResolver;
			const postPath = path.slice(11, 17) + path.slice(23, -3);
			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return allPosts;
};
