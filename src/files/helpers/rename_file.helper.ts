import { FilesInterface } from '../interfaces/files.interface';
import { v4 } from 'uuid';

export function renameFile(
  file: FilesInterface,
  extension: string | undefined = '',
): FilesInterface {
  if (!extension) {
    const { originalname } = file;
    extension = originalname.split('.').pop();
  }

  const name = v4();

  return new FilesInterface({
    buffer: file.buffer,
    originalname: `${name}.${extension}`,
    mimetype: file.mimetype,
    size: file.size,
  });
}
