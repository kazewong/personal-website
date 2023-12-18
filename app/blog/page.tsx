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
      <main className="flex min-h-screen flex-col items-center justify-start px-24 py-16">
        <div className='pb-8'>
          <div className="text-2xl text-justify max-w-screen-sm sm:max-w-prose lg:max-w-screen-lg">Here are a bunch of random thoughts I have or materials I like to point people to, that are too informal to be put into a more formal form.</div>

        </div>
        <div>
          <ul>
            {allPostsData.map((post, index) => (
              <div key={index}>
                <BlogPostPreview {...post.data} />
              </div>
            ))}

          </ul>

        </div>
      </main>
    </div>
  )
}
