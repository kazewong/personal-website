'use client'
import {PostMetaData} from '@/app/blog/contentParser';
import { Link } from '@nextui-org/react';

export function BlogPostPreview(metadata: PostMetaData){
    console.log(metadata.id)
    return(
          <div className="flex flex-row justify-start py-2 space-x-4">
            <div className="text-left font-semibold">{metadata.date}</div>
            <div className="text-left font-semibold hover:text-blue-800" color="foreground">
              <Link href={`/blog/posts/${encodeURIComponent(metadata.id)}`}>{metadata.title}</Link>
            </div>
          </div>
    )
}