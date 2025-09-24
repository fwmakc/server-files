import { FilesInterface } from '../interfaces/files.interface';
import { decode } from '../helpers/decode.helper';

export function decodeService(file: FilesInterface): FilesInterface {
  return decode(file);
}
