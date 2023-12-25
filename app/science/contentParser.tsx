import fs from 'fs';
import path from 'path';
import { ImageCardData } from '../components/imageCard';

const postsDirectory = path.join(process.cwd(), 'public/static/content/json/science_highlight.json');

export async function getScienceHighlightData(): Promise<ImageCardData[]> {
  // Get file names under /posts
  const file = await fs.promises.readFile(postsDirectory, 'utf8')
  
  const data = JSON.parse(file);
  const imageCardDataArray: ImageCardData[] = data.map((item: any) => {
    return {
      header: item.header,
      title: item.title,
      image_path: item.image_path,
      link: item.link,
    };
  });
  return imageCardDataArray;
}