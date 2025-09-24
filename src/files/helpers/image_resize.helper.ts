import sharp from 'sharp';
import { OptionsFilesInterface } from '../interfaces/options.files.interface';
import { getImageMetadata } from './get_image_metadata.helper';
import { imageResizeProcess } from './image_resize_process.helper';

export async function imageResize(file: Buffer): Promise<Buffer> {
  const options: OptionsFilesInterface = {
    width: Number(process.env.UPLOADS_IMAGE_MAX_WIDTH) || 0,
    height: Number(process.env.UPLOADS_IMAGE_MAX_HEIGHT) || 0,
  };

  const { width, height } = await getImageMetadata(file);

  if (options.width && width > height && width > options.width) {
    return await imageResizeProcess(file, {
      width: options.width,
    });
  }

  if (options.height && height > options.height) {
    return await imageResizeProcess(file, {
      height: options.height,
    });
  }

  return await sharp(file).toBuffer();
}
