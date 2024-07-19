import fs from 'fs';
import path from 'path';


export type HighlighData = {
  title: string;
  description: string;
  link: string;
}

export async function getScienceHighlightData(): Promise<HighlighData[]> {
  const postsDirectory = path.join(process.cwd(), 'public/static/content/json/science_highlight.json');
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

export type PresentationData = {
  name: string;
  title: string;
  date: string;
  link: string;
}

export async function getPresentationData(): Promise<PresentationData[]> {
  const postsDirectory = path.join(process.cwd(), 'public/static/content/json/presentation.json');

  // Get file names under /posts
  const file = await fs.promises.readFile(postsDirectory, 'utf8')
  
  const data = JSON.parse(file);
  const DataArray = data.map((item: any) => {
    return {
      name: item.name,
      title: item.title,
      date: item.date,
      link: item.link,
    };
  });
  return DataArray;
}

