import {PostMetaData} from '@/app/blog/contentParser';
import { Link } from '@nextui-org/link';

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}

export function BlogPostPreview(metadata: PostMetaData){
    console.log(new Date(metadata.date))
    return(
          <div className="flex flex-row justify-start py-2 space-x-4">
            <div className="text-left font-semibold">{new Date(metadata.date).toLocaleString('en-GB', options)}</div>
            <div className="text-left font-semibold hover:text-blue-800" color="foreground">
              <Link href={`/blog/posts/${encodeURIComponent(metadata.id)}`}>{metadata.title}</Link>
            </div>
          </div>
    )
}