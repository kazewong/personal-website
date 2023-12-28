import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public/static/content/blog/');

export type PostMetaData = {
    id: string;
    title: string;
    date: string;
    tags: string[];
    shortDescription: string;
}

export function getSortedPostsData(): {id: string, data: PostMetaData}[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const data = matterResult.data as PostMetaData;
    const content = matterResult.content;
    data.id = id;
    // Combine the data with the id
    return {
      id,
      data,
      content
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.data.date > b.data.date) {
      return -1;
    } else {
      return 1;
    }
  });
}