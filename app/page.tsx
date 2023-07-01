import { getSortedPostsData } from './blog/contentParser';
import { BlogPostPreview } from './components/blogPost';
import { FigureCard } from './components/figureCard'
import Image from 'next/image'

function getBlog() {
  const allPostsData = getSortedPostsData();
  return allPostsData;
}

export default function Home() {
  const allPostsData = getBlog();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-1/1">
        <div className="py-16 rounded-[25px] flex-col place-content-center w-3/5">
            <div className="flex place-content-center">
              <Image src='/../public/static/images/portrait.jpg' alt="" width={147} height={147} className="rounded-full" priority={true} />
            </div>
            <div className="flex-row">

            </div>
            <div className="px-4">
                <div className="text-black text-4xl ">
                  Kaze
                </div>
                <div className="text-black text-">
                  Hi
                </div>
            </div>
        </div>
      <ul className="">
          {allPostsData.map(({ id, data}) => (
            <BlogPostPreview key={id} {...data} />
          ))}
        </ul>
    </main>
  )
}
