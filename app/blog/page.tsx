import Head from 'next/head';
import { getSortedPostsData } from './contentParser';

function getBlog() {
	const allPostsData = getSortedPostsData();
	return allPostsData;
  }

export default function Blog() {
  return (
	<div>
	<Head>
	<title>Blog</title>
  	</Head>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
	</div>
  )
}
