import sharp from 'sharp';
import { getImageMetadata } from './get_image_metadata.helper';

export async function convertMultipagesToWebp(file: Buffer): Promise<Buffer> {
  const { pages } = await getImageMetadata(file);
  const animated = (pages && pages > 1) || 0 || undefined;
  return await sharp(file, { animated }).webp().toBuffer();
}
