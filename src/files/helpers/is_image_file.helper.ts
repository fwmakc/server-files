import { FilesInterface } from '../interfaces/files.interface';

export function isImageFile(file: FilesInterface) {
  const { mimetype } = file;
  return mimetype.includes('image');
}
