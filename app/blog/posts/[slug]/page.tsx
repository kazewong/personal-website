import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'data/blogs/');

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
          <div className="flex-col py-8 max-w-screen-sm sm:max-w-prose lg:max-w-screen-lg">
              <div className="title">
                {postData.matterResult.data.title}

              </div>
              {postData.matterResult.data.date}
              <br />
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
    const processedContent = await remark()
    .use(html)
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