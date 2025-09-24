import { FilesInterface } from '../interfaces/files.interface';

export function decode(file: FilesInterface): FilesInterface {
  const { originalname } = file;
  const buffer = Buffer.from(originalname, 'ascii');
  const decodedString = buffer.toString('utf-8');

  return new FilesInterface({
    buffer: file.buffer,
    originalname: decodedString,
    mimetype: file.mimetype,
    size: file.size,
  });
}
