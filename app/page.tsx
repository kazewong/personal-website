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
    <main className="flex flex-col items-center h-screen">
        <div className="lg:flex py-16 rounded-[25px] w-3/5">
          <div className="flex justify-center">
            <Image src='/../public/static/images/portrait.jpg' alt="" width={147} height={147} className="rounded-full" priority={true} />
          </div>
            {/* <div className="flex-row">

            </div> */}
            <div className="px-4">
                <div className="text-black text-4xl justify-center flex lg:justify-start">
                  Kaze
                </div>
                <div className="text-black text-xl flex justify-start">
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
