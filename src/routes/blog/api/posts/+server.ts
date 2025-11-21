// src/routes/api/posts/+server.js
import { fetchMarkdownPosts } from '$routes/blog/utils';
import { json } from '@sveltejs/kit';

type Post = {
	meta: {
		title: string;
		date: string;
		tags: string[];
	};
	path: string;
};

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();

	const sortedPosts = allPosts.sort((a: Post, b: Post) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return json(sortedPosts);
};
