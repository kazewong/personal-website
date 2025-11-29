import type { RequestHandler } from '@sveltejs/kit';
import { fetchMarkdownPosts } from '$routes/blog/utils';

const escapeXml = (unsafe: string) =>
	unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;

	const allPosts = await fetchMarkdownPosts();

	// Sort posts by date (newest first)
	const sorted = allPosts.sort(
		(a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
	);

	const itemsXml = sorted
		.map((post) => {
			const title = escapeXml(post.meta.title);
			const link = `${origin}${post.path}`;
			const guid = link;
			const pubDate = new Date(post.meta.date).toUTCString();
			const categories = (post.meta.tags || [])
				.map((t) => `<category>${escapeXml(t)}</category>`)
				.join('');
			// Minimal description based on tags; can be extended to excerpt if available
			const description = escapeXml((post.meta.tags || []).join(', '));

			return `
		<item>
			<title>${title}</title>
			<link>${link}</link>
			<guid isPermaLink="true">${guid}</guid>
			<pubDate>${pubDate}</pubDate>
			<description>${description}</description>
			${categories}
		</item>`;
		})
		.join('');

	const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Kaze Wong - Blog</title>
		<link>${origin}/blog</link>
		<description>Latest posts from Kaze Wong</description>
		<language>en</language>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${itemsXml}
	</channel>
</rss>`.trim();

	return new Response(rssXml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=300' // cache for 5 minutes
		}
	});
};
