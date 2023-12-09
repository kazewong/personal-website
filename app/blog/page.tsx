import { Metadata } from 'next'; 
import { getSortedPostsData } from './contentParser';
import { BlogPostPreview } from '../components/blogPost';

export const metadata: Metadata = {
	title: 'Blog',
}

export default function Blog() {

  const allPostsData = getSortedPostsData();

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {allPostsData.map((post, index) => (
          <div key={index}>
            <BlogPostPreview {...post.data} />
          </div>
        ))}
      </main>
    </div>
  )
}
