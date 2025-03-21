export async function load({ params }) {
	const post = await import(`../posts/${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;
	const shortDescription = post.metadata.shortDescription;


	return {
		content,
		title,
		date,
		shortDescription
	};
}
