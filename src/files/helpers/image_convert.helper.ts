import { FilesInterface } from '../interfaces/files.interface';
import { getImageMetadata } from './get_image_metadata.helper';
import { convertToWebp } from './convert_to_webp.helper';

export async function imageConvert(file: FilesInterface) {
  const { mimetype, originalname } = file;
  const type = mimetype.split('/')[1];

  const arrayname = originalname.split('.');
  arrayname.pop();
  const name = arrayname.join('.');

  let extension = 'svg';
  let mime = type;

  if (type !== 'svg+xml') {
    file.buffer = await convertToWebp(file.buffer);
    extension = 'webp';
    mime = extension;
  }

  const { size } = await getImageMetadata(file.buffer);

  return new FilesInterface({
    buffer: file.buffer,
    originalname: `${name}.${extension}`,
    mimetype: `image/${mime}`,
    size,
  });
}
