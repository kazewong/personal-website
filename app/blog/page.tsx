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
      <main className="flex h-screen flex-col items-center justify-start pt-12 sm:px-6 lg:px-8">
        <div className='pb-8'>
          <div className="text-lg lg:text-xl text-justify max-w-screen-prose">
            Here are a bunch of random thoughts I have or materials I like to point people to, that are too informal to be put into a more formal form.
          <br />
          <br />
          Note that while I try to keep the main content, especially the technical detail, as accurate and factual as possible, outside that I will have random mumble jumble flying here and there. Please don't take them too seriously.
          </div>
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
