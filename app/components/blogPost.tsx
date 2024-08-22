import {PostMetaData} from '@/app/blog/contentParser';
import { Link } from '@nextui-org/link';



export function BlogPostPreview(metadata: PostMetaData){
    console.log(new Date(metadata.date))
    let options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
    return(
          <div className="flex flex-row justify-start py-2 space-x-4">
            <div className="text-left font-semibold">{new Intl.DateTimeFormat('en-GB', options).format(new Date(metadata.date))}</div>
            <div className="text-left font-semibold hover:text-blue-800" color="foreground">
              <Link href={`/blog/posts/${encodeURIComponent(metadata.id)}`}>{metadata.title}</Link>
            </div>
          </div>
    )
}