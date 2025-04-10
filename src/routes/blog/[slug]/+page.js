export async function load({ params }) {
	const post = await import(`../posts/${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;
	const shortDescription = post.metadata.shortDescription;
	const image_url = post.metadata.image_url;

	return {
		content,
		title,
		date,
		shortDescription,
		image_url
	};
}
