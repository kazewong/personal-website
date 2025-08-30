type PostResolver = {
	metadata: {
		title: string;
		date: string;
		tags: string[];
	};
};

export const fetchMarkdownPosts = async () => {
	// const allPostFiles = import.meta.glob('/src/lib/assets/blogs/*.md');
	const allPostFiles = import.meta.glob("/src/routes/blog/posts/*.md");
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as PostResolver;
			const postPath = path.slice(11, 17) + path.slice(23, -3);
			const capitalizedTags = metadata.tags.map((tag) =>
				tag
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ')
			);
			return {
				meta: {
					...metadata,
					tags: capitalizedTags
				},
				path: postPath
			};
		})
	);

	return allPosts;
};
