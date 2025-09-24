import sharp from 'sharp';

export async function convertToWebp(file: Buffer): Promise<Buffer> {
  return await sharp(file).webp().toBuffer();
}
