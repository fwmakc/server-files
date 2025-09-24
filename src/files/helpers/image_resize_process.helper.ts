import sharp from 'sharp';
import { OptionsFilesInterface } from '../interfaces/options.files.interface';

export async function imageResizeProcess(
  file: Buffer,
  options: OptionsFilesInterface,
): Promise<Buffer> {
  return await sharp(file).resize(options).toBuffer();
}
