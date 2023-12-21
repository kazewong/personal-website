import fs from 'fs';
import path from 'path';
import { ImageCardData } from '../components/imageCard';

const postsDirectory = path.join(process.cwd(), 'public/static/content/json/science_highlight.json');

export async function getScienceHighlightData(): Promise<{id: string, data: ImageCardData}[]> {
  // Get file names under /posts
  const file = await fs.promises.readFile(postsDirectory, 'utf8')
  
  const data = JSON.parse(file);
  console.log(data);
  return (data as {id: string, data: ImageCardData}[]);
}