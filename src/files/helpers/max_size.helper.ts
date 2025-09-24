import { FilesInterface } from '../interfaces/files.interface';

export function maxSize(file: FilesInterface) {
  const maxSize = Number(process.env.UPLOADS_MAX_SIZE) || 0;
  const { size } = file;
  return !maxSize || Number(size) <= maxSize;
}
