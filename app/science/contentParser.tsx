import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public/static/content/json/science_highlight.json');

export type HighlighData = {
  title: string;
  description: string;
  link: string;
}

export async function getScienceHighlightData(): Promise<HighlighData[]> {
  // Get file names under /posts
  const file = await fs.promises.readFile(postsDirectory, 'utf8')
  
  const data = JSON.parse(file);
  const DataArray = data.map((item: any) => {
    return {
      title: item.title,
      description: item.description,
      link: item.link,
    };
  });
  return DataArray;
}