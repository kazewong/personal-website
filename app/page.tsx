import {Image} from "@nextui-org/image"
import { Link } from "@nextui-org/link"

export default function Home() {
  // const allPostsData = getBlog();
  return (
    <main className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold pb-8">
          Hello, I am <span className="text-blue-600">Kaze Wong</span>
        </h1>
      <h2 className="text-4xl font-semibold pb-8">
        I do science, I jump, and I make stuffs.
      </h2>
      <div className="flex-row">
        <Link href="https://github.com/kazewong" className="px-2 dark:invert">
          {
            <Image
            src="static/favicons/Github_logo_trans.png"
            width={40}
            height={40}
            />
          }
        </Link>
        <Link href="https://www.youtube.com/channel/UCt6jkLTx5GBkGQ57HiPaeLg" className="px-2 dark:invert">
          {
            <Image
            src="static/favicons/Youtube_logo_trans.png"
            width={40}
            height={40}
            />
          }
        </Link>
        <Link href="https://twitter.com/physicskaze" className="px-2">
          {
            <Image
            src="static/favicons/Twitter_logo_trans.png"
            width={40}
            height={40}
            />
          }
        </Link>
        <Link href="https://www.linkedin.com/in/kazewkwong/" className="px-2 ">
          {
            <Image
            src="static/favicons/Linkedin_logo_trans.png"
            width={40}
            height={40}
            />
          }
        </Link>
        
      </div>
    </main>
  )
}
