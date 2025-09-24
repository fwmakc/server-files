import sharp from 'sharp';

export async function getImageMetadata(file: Buffer) {
  return await sharp(file).metadata();
}
