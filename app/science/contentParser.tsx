import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public/static/content/json/science_highlight.json');

export async function getScienceHighlightData(): Promise<{
  [key: string]: any;
}> {
  // Get file names under /posts
  const file = await fs.promises.readFile(postsDirectory, 'utf8')
  
  const data = JSON.parse(file);
  const DataArray = data.map((item: any) => {
    return {
      header: item.header,
      title: item.title,
      description: item.description,
      link: item.link,
    };
  });
  return DataArray;
}