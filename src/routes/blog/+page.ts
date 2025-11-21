export const load = async ({ fetch }) => {
	const response = await fetch(`/blog/api/posts`);
	const posts = await response.json();

	return {
		posts
	};
};
