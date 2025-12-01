export async function GET() {
	const base = 'https://www.kaze-wong.com/'; // Change to your actual domain

	// Main static routes
	const staticRoutes = [
		'/',
		'/blog',
		'/highjump',
		'/food',
		'/jhu_science',
		'/code',
		'/animation',
		'/threejs'
	];

	// Blog posts (manually listed, update as needed)
	const blogPosts = [
		'AIandSimulation',
		'DelaunayTriangluation',
		'GoingFullHighJump',
		'InMemoryOfMike',
		'K8s_devpod',
		'LimitOfAIProgress',
		'MultiCameraSystem',
		'PrediabeticAndGI',
		'dynamic_slice_jax',
		'flowMC',
		'trying_grain',
		'typstGood',
		'draft/SummerHighJumpResearch'
	].map((slug) => `/blog/posts/${slug}`);

	const urls = [...staticRoutes, ...blogPosts];

	const urlset = urls
		.map(
			(url) => `
		<url>
			<loc>${base}${url}</loc>
		</url>
		`
		)
		.join('');

	const xml = `
	<?xml version="1.0" encoding="UTF-8" ?>
	<urlset
		xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xhtml="https://www.w3.org/1999/xhtml"
		xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
		xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
		xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
		xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
	>
		${urlset}
	</urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
