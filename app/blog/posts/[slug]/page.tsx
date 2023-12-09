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

export default function BlogPost( postData: PostMetaData ){
    return (
        <div>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
            <br />
            {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        </div>
    )
}

export function getSortedPostsIDs(): {params: {id: string}}[] {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(id: string){
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
    id,
    contentHtml,
    ...matterResult.data,
    };

}

export async function generateStaticParams() {
  return getSortedPostsIDs()
}

export async function getPosts(params: PostMetaData) {
    const postData = await getPostData(params.id);
    return postData
  }