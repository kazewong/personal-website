import { getSortedPostsData } from './blog/contentParser';
import Link from 'next/link'

import Image from 'next/image'

function getBlog() {
  const allPostsData = getSortedPostsData();
  return allPostsData;
}

export default function Home() {
  const allPostsData = getBlog();
  return (
    <main className="flex flex-col items-center h-screen">
        <div className="lg:flex py-16 w-[640px] lg:w-[840px]">
          <div className="flex-col justify-center">
            <div className="justify-center flex">
              <Image src='/../public/static/images/portrait.jpg' alt="" width={147} height={147} className="rounded-full"/>
            </div>
            <div className="justify-center flex-col">
                  <p className="text-black text-3xl text-center">Kaze W. K Wong</p>
                  <p className="text-gray-500 text-base text-center">Flatiron research fellow</p>
                  <p className="text-gray-500 text-base text-center">Flatiron institute</p>
            </div>
          </div>
            {/* <div className="flex-row">

            </div> */}
            <div className="px-4 lg:w-2/3">

                <div className="text-black text-xl flex-row justify-start">
                <p className="text-gray-500 py-3 text-base">
                  I am a research fellow at the Flatiron Institute, mostly spending my time <b>building codes</b> to analyze <b>gravitational-wave</b> data and studying <b>black holes</b>.
                  I also spend a significant amount of time trying to figure out how to use <b>machine-learning</b> techniques to answer science questions in <b>robust and interpretable ways</b>.
                </p>
                <p className="text-gray-500 py-3 text-base">
                Feel free to use whatever materials you find on this site, and I will greatly appreciate it if you can credit me for the material.
                </p>
                <p className="text-gray-500 py-3 text-base">Link to CV: <Link href="https://kazewong.github.io/CV" className='text-cyan-500 underline'>https://kazewong.github.io/CV</Link></p>
                <p className="text-gray-500 py-3 text-base">Publication profile: <Link href="https://inspirehep.net/authors/1789361?ui-citation-summary=true" className='text-cyan-500  underline'>https://inspirehep.net/authors/1789361?ui-citation-summary=true</Link></p>
                </div>
            </div>
        </div>
      {/* <ul className="">
          {allPostsData.map(({ id, data}) => (
            <BlogPostPreview key={id} {...data} />
          ))}
        </ul> */}
    </main>
  )
}
