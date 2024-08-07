import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import {unified} from 'unified'

const postsDirectory = path.join(process.cwd(), 'public/static/content/blog/');

export type PostMetaData = {
    id: string;
    title: string;
    date: string;
    tags: string[];
    shortDescription: string;
}

export default async function BlogPost({params}: {params: {slug: string}}) {
    const postData = await getPostData(params.slug);
    
    return (
        <div className='flex justify-center'>
          <div className="flex-col py-8 px-4 max-w-screen-sm sm:max-w-prose lg:max-w-screen-lg">
              <div className="title">
                {postData.matterResult.data.title}
              </div>
              <div className="text-center pb-4 text-xl">
                {postData.matterResult.data.shortDescription}
              </div>
              <div className="text-center pb-4">
                {postData.matterResult.data.date}

              </div>
              <div className="text-justify"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </div>

        </div>
        
    )
}

function getSortedPostsIDs(): {params: {id: string}}[] {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

async function getPostData(id: string){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const metadata = matterResult.data as PostMetaData;

    // Use remark to convert markdown into HTML string
    const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkMath)
    .use(rehypeFormat)
    .use(rehypeKatex, {output: 'mathml'})
    .use(rehypeStringify)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
    id,
    contentHtml,
    matterResult,
    };
}

export async function generateStaticParams() {
  const result = getSortedPostsIDs();
  return result
}